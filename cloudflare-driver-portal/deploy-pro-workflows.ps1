# VDNZ Pro Championship staging migration & staff-page deploy.
# ONLY the staging Worker/D1 named vdnz-pro-championship-staging are touched.
$ErrorActionPreference = "Stop"
$Folder = Join-Path $HOME "Desktop\VDNZ-Pro-Staging"
$Config = Join-Path $Folder "wrangler.jsonc"
if (-not (Test-Path $Config)) { throw "Staging Worker configuration not found; nothing changed." }
Set-Location $Folder
if (-not ((Get-Content $Config -Raw).Contains("vdnz-pro-championship-staging"))) {
  throw "Wrong Worker configuration. Refusing to deploy."
}
$Source = "https://raw.githubusercontent.com/baggedjz/vdnz-broadcast-suite/cloudflare-driver-portal-staging-2026/cloudflare-driver-portal"
$Files = @(
  "index.js",
  "hub-pages.js",
  "pro-api.js",
  "pro-workflows.js",
  "pro-pages.js",
  "hub-extension.sql",
  "pro-migration.sql",
  "public/hub/index.html",
  "public/hub/login.html",
  "public/hub/login.js",
  "public/hub/hub.js",
  "public/hub/hub.css",
  "public/pro/index.html",
  "public/pro/pro.css",
  "public/pro/pro.js",
  "public/pro/crew-workflows.js",
  "public/sw.js"
)
foreach ($File in $Files) {
  $Dest = Join-Path $Folder $File
  New-Item -ItemType Directory -Path (Split-Path $Dest) -Force | Out-Null
  Write-Host "Getting $File"
  Invoke-WebRequest -UseBasicParsing -Uri "$Source/$File" -OutFile $Dest
}
foreach ($File in @("index.js","hub-pages.js","pro-pages.js","pro-api.js","pro-workflows.js","public/pro/pro.js","public/pro/crew-workflows.js")) {
  node --check $File
  if ($LASTEXITCODE -ne 0) { throw "JavaScript validation failed: $File" }
}
$Worker = Get-Content "index.js" -Raw
$Hub = Get-Content "hub-pages.js" -Raw
$Pro = Get-Content "pro-pages.js" -Raw
if (-not $Worker.Contains('proApi(req,env,u,path)') -or
    -not $Hub.Contains("/pro/commentary") -or
    -not $Pro.Contains("protests-list") -or
    -not $Pro.Contains("interview-form")) {
  throw "Missing Pro Championship workflow files. No deployment made."
}
# The Driver Portal is already installed. NEVER rerun migration.sql here.
# It contains a legacy portal_assets index and is not a reliable incremental upgrade.
Write-Host "Checking existing staging D1 tables (read-only)..."
$SchemaQuery = "SELECT (SELECT COUNT(*) FROM portal_users) AS drivers, (SELECT COUNT(*) FROM portal_messages) AS requests, (SELECT COUNT(*) FROM portal_invites) AS invites, (SELECT COUNT(*) FROM portal_notifications) AS alerts, (SELECT COUNT(*) FROM portal_sessions) AS sessions;"
npx --yes wrangler d1 execute vdnz-pro-championship-staging --remote --command $SchemaQuery
if ($LASTEXITCODE -ne 0) {
  throw "Existing staging Driver Portal tables could not be verified. Exact Wrangler error is shown above. No schema or Worker changes made."
}
Write-Host "Adding ONLY missing Main Hub extension tables, without changing existing driver data..."
npx --yes wrangler d1 execute vdnz-pro-championship-staging --remote --file ".\hub-extension.sql"
if ($LASTEXITCODE -ne 0) {
  throw "Additive Main Hub extension migration failed. Exact Wrangler error is shown above. No Worker changes made."
}
Write-Host "Adding ONLY new Pro Championship judging and interview-workflow tables..."
npx --yes wrangler d1 execute vdnz-pro-championship-staging --remote --file ".\pro-migration.sql"
if ($LASTEXITCODE -ne 0) {
  throw "Additive Pro Championship migration failed. Exact Wrangler error is shown above. No Worker changes made."
}
Write-Host "Deploying the updated staging Worker..."
npx --yes wrangler deploy --config ".\wrangler.jsonc"
if ($LASTEXITCODE -ne 0) { throw "Cloudflare staging deployment failed" }

$Root = "https://vdnz-pro-championship-staging.dylwhare.workers.dev"
foreach ($Check in @(
  @{ Path = "/pro/commentary"; Text = "interview-form" },
  @{ Path = "/pro/judge?role=judge1"; Text = "protests-list" },
  @{ Path = "/pro/control/qualifying"; Text = "event-form" },
  @{ Path = "/hub/"; Text = "Main Hub Login" }
)) {
  $Url = $Root + $Check.Path
  $Response = Invoke-WebRequest -UseBasicParsing -Uri $Url -MaximumRedirection 2
  if ($Response.StatusCode -ne 200 -or -not $Response.Content.Contains($Check.Text)) {
    throw "Deployment responded unexpectedly at $Url. See the output above."
  }
  Write-Host ("PASS: " + $Check.Path)
}
Write-Host ""
Write-Host "VDNZ PRO CHAMPIONSHIP STAGING - DEPLOYMENT VERIFIED"
Write-Host "$Root/hub/#broadcast"
Write-Host "$Root/pro/commentary"
Write-Host "$Root/pro/judge?role=judge1"
Write-Host "$Root/pro/control/settings"
