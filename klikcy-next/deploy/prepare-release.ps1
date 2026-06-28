# Build klikcy-next and assemble a VPS upload folder on Windows.
# Usage: .\deploy\prepare-release.ps1

$ErrorActionPreference = "Stop"
$Next = Split-Path $PSScriptRoot -Parent
$Root = Split-Path $Next -Parent
$Release = Join-Path $Root "release-vps"

Write-Host "Building klikcy-next with production env..." -ForegroundColor Cyan
Push-Location $Next

$env:NEXT_PUBLIC_SITE_URL = "https://www.klikcy.com"
$env:NEXT_PUBLIC_CONTACT_EMAIL = "build@klikcy.com"
$env:NEXT_PUBLIC_CONTACT_API_URL = ""
$env:NEXT_PUBLIC_GTM_ID = "GTM-PF4N2DXK"

npm run sitemap:build
npm run build
npm run htaccess:generate

Pop-Location

Write-Host "Assembling $Release ..." -ForegroundColor Cyan
if (Test-Path $Release) { Remove-Item $Release -Recurse -Force }
New-Item -ItemType Directory -Path $Release | Out-Null

Copy-Item -Recurse (Join-Path $Next "out") (Join-Path $Release "out")
New-Item -ItemType Directory -Path (Join-Path $Release "server") | Out-Null
Copy-Item (Join-Path $Root "server\index.mjs") (Join-Path $Release "server\index.mjs")
Copy-Item -Recurse (Join-Path $Next "deploy") (Join-Path $Release "deploy")
Copy-Item (Join-Path $Next ".env.example") (Join-Path $Release ".env.example")

$EnvSource = Join-Path $Root ".env"
if (Test-Path $EnvSource) {
  $serverEnv = Get-Content $EnvSource | Where-Object {
    $_ -match '^(SITE_URL|CONTACT_API_PORT|SMTP_|CONTACT_EMAIL)='
  }
  $serverEnv | Set-Content (Join-Path $Release ".env") -Encoding UTF8
  Write-Host "Copied server .env from repo root (secrets not printed)." -ForegroundColor Green
}
$Tarball = Join-Path $Root "release-vps.tar.gz"
Write-Host "Creating $Tarball ..." -ForegroundColor Cyan
if (Test-Path $Tarball) { Remove-Item $Tarball -Force }
Push-Location $Release
tar -czf $Tarball .
Pop-Location

Write-Host "Release ready: $Release" -ForegroundColor Green
Write-Host "Tarball: $Tarball"
Write-Host "Deploy: cd klikcy-next && npm run release:deploy"
