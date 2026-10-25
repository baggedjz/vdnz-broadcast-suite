# VDNZ Main Hub staged deployment. Cloudflare-only, Pro Championship-only.
# Loads the exact GitHub branch, updates ONLY vdnz-pro-championship-staging.
$ErrorActionPreference = "Stop"
$Folder = Join-Path $HOME "Desktop\VDNZ-Pro-Staging"
if (-not (Test-Path (Join-Path $Folder "wrangler.jsonc"))) {
  throw "VDNZ-Pro-Staging folder or wrangler.jsonc missing. No deployment made."
}
Set-Location $Folder
$Source = "https://raw.githubusercontent.com/baggedjz/vdnz-broadcast-suite/cloudflare-driver-portal-staging-2026/cloudflare-driver-portal"
$Files = @(
  "index.js",
  "hub-pages.js",
  "migration.sql",
  "public/hub/index.html",
  "public/hub/hub.js",
  "public/hub/hub.css",
  "public/sw.js"
)
foreach ($File in $Files) {
  $Dest = Join-Path $Folder $File
  New-Item -ItemType Directory -Path (Split-Path $Dest) -Force | Out-Null
  Write-Host "Updating $File"
  Invoke-WebRequest -UseBasicParsing -Uri "$Source/$File" -OutFile $Dest
}
node --check ".\index.js"
if ($LASTEXITCODE -ne 0) { throw "Worker JavaScript failed syntax check" }
node --check ".\hub-pages.js"
if ($LASTEXITCODE -ne 0) { throw "Bundled Hub HTML failed syntax check" }
node --check ".\public\hub\hub.js"
if ($LASTEXITCODE -ne 0) { throw "Hub JavaScript failed syntax check" }
node --check ".\public\sw.js"
if ($LASTEXITCODE -ne 0) { throw "Service Worker JavaScript failed syntax check" }
$Hub = Get-Content ".\hub-pages.js" -Raw
if (-not $Hub.Contains("MAIN HUB SIDEBAR v2") -or
    $Hub.Contains("broadcastbusinesssuite.com") -or
    $Hub.Contains('id=\"tab-crew\"')) {
  throw "Hub source verification failed. No deployment made."
}
Write-Host "Validated sidebar v2 and removed BBS. Running additive D1 staging migration..."
npx --yes wrangler d1 execute vdnz-pro-championship-staging --remote --file ".\migration.sql"
if ($LASTEXITCODE -ne 0) { throw "Staging D1 migration failed; no Worker deployment." }
Write-Host "Deploying ONLY vdnz-pro-championship-staging..."
npx --yes wrangler deploy --config ".\wrangler.jsonc"
if ($LASTEXITCODE -ne 0) { throw "Staging deployment failed" }
Write-Host "Checking new Main Hub login route..."
$Check = Invoke-WebRequest -UseBasicParsing -Uri "https://vdnz-pro-championship-staging.dylwhare.workers.dev/hub/" -MaximumRedirection 3
if ($Check.StatusCode -ne 200 -or
    -not $Check.Content.Contains("Main Hub Login")) {
  throw "DEPLOYED but login route did not pass. Please copy this error."
}
Write-Host "PASS: Main Hub responds directly with its OWN officials login."
Write-Host "Main Hub: https://vdnz-pro-championship-staging.dylwhare.workers.dev/hub/"
Write-Host "After signing in, the sidebar footer must show: MAIN HUB SIDEBAR v2"
