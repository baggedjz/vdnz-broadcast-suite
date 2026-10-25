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
  "migration.sql",
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
Write-Host "Updating staging D1 only..."
npx --yes wrangler d1 execute vdnz-pro-championship-staging --remote --file ".\migration.sql"
if ($LASTEXITCODE -ne 0) { throw "Core staging migration failed" }
npx --yes wrangler d1 execute vdnz-pro-championship-staging --remote --file ".\pro-migration.sql"
if ($LASTEXITCODE -ne 0) { throw "Pro Championship migration failed" }
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
