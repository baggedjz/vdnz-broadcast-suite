# Safety rollback: withdraw the unapproved VDNZ custom Pro Championship judging.
# No D1 changes; never touches Pro Development.
$ErrorActionPreference = "Stop"
$Folder = Join-Path $HOME "Desktop\VDNZ-Pro-Staging"
if (-not (Test-Path (Join-Path $Folder "wrangler.jsonc"))) { throw "Existing staging folder missing" }
Set-Location $Folder
$Source = "https://raw.githubusercontent.com/baggedjz/vdnz-broadcast-suite/cloudflare-driver-portal-staging-2026/cloudflare-driver-portal"
$Files = @(
  "index.js",
  "hub-pages.js",
  "wrangler.jsonc",
  "public/hub/index.html",
  "public/hub/hub.js",
  "public/hub/hub.css"
)
foreach ($File in $Files) {
  $Target = Join-Path $Folder $File
  New-Item -ItemType Directory -Path (Split-Path $Target) -Force | Out-Null
  Write-Host "Downloading $File"
  Invoke-WebRequest -UseBasicParsing -Uri "$Source/$File" -OutFile $Target
}
node --check ".\index.js"
if ($LASTEXITCODE -ne 0) { throw "Worker failed source check - not deployed" }
node --check ".\hub-pages.js"
if ($LASTEXITCODE -ne 0) { throw "Main Hub failed source check - not deployed" }
node --check ".\public\hub\hub.js"
if ($LASTEXITCODE -ne 0) { throw "Main Hub JS failed source check - not deployed" }
$Conf = Get-Content ".\wrangler.jsonc" -Raw
$Code = Get-Content ".\index.js" -Raw
if (-not $Conf.Contains('"name": "vdnz-pro-championship-staging"') -or
    -not $Conf.Contains('"run_worker_first": true') -or
    -not $Code.Contains("Unapproved Pro judging API disabled")) {
  throw "Safety check failed - wrong worker or unapproved judging routes not disabled"
}
Write-Host "Deploying staging-only withdrawal. No SQL migrations or data deletion."
npx --yes wrangler deploy --config ".\wrangler.jsonc"
if ($LASTEXITCODE -ne 0) { throw "Staging deployment failed" }
$Root = "https://vdnz-pro-championship-staging.dylwhare.workers.dev"
$HubStatus = curl.exe -sS -o NUL -w "%{http_code}" "$Root/hub/"
$ProStatus = curl.exe -sS -o NUL -w "%{http_code}" "$Root/pro/?view=judge"
Write-Host "Hub HTTP: $HubStatus (expect 200)"
Write-Host "Unapproved scoring HTTP: $ProStatus (expect 503)"
if ($HubStatus -ne "200" -or $ProStatus -ne "503") {
  throw "Cloudflare route verification failed; check the Worker deploy output above"
}
Write-Host "PASS: Main Hub active. Unapproved judging disabled. Existing Driver Portal and all D1 data preserved."
