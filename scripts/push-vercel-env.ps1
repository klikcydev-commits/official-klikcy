$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$vars = [ordered]@{
  SITE_URL = "https://www.klikcy.com"
  NEXT_PUBLIC_SITE_URL = "https://www.klikcy.com"
  SMTP_HOST = "smtp.hostinger.com"
  SMTP_PORT = "465"
  SMTP_USER = "build@klikcy.com"
  SMTP_PASS = "WassimMarwan@22"
  CONTACT_EMAIL = "build@klikcy.com"
  NEXT_PUBLIC_CONTACT_EMAIL = "build@klikcy.com"
}

$projectRoot = (Get-Location).Path
$project = Get-Content ".vercel\project.json" | ConvertFrom-Json
$auth = Get-Content "$env:APPDATA\com.vercel.cli\Data\auth.json" | ConvertFrom-Json
$previewApiUri = "https://api.vercel.com/v10/projects/$($project.projectId)/env?teamId=$($project.orgId)&upsert=true"

function Invoke-VercelEnvAdd {
  param(
    [string[]]$CliArgs,
    [int]$TimeoutSec = 30
  )

  $job = Start-Job -ScriptBlock {
    param($Root, $CliArgs)
    Set-Location $Root
    & vercel @CliArgs 2>&1
  } -ArgumentList $projectRoot, $CliArgs

  if (-not (Wait-Job $job -Timeout $TimeoutSec)) {
    Stop-Job $job -Force
    Remove-Job $job -Force
    throw "vercel env add timed out after ${TimeoutSec}s"
  }

  $output = (Receive-Job $job) -join "`n"
  Remove-Job $job -Force

  if ($output -match "action_required|Error:|error:") {
    throw "vercel env add failed:`n$output"
  }
}

function Add-PreviewEnvVar {
  param(
    [string]$Name,
    [string]$Value
  )

  $type = if ($Name -eq "SMTP_PASS") { "sensitive" } else { "encrypted" }
  $body = @{
    key = $Name
    value = $Value
    type = $type
    target = @("preview")
  } | ConvertTo-Json

  Invoke-RestMethod -Method Post -Uri $previewApiUri `
    -Headers @{ Authorization = "Bearer $($auth.token)" } `
    -ContentType "application/json" `
    -Body $body | Out-Null
}

foreach ($target in @("production", "development")) {
  Write-Host "== $target =="
  foreach ($name in $vars.Keys) {
    $vercelArgs = @("env", "add", $name, $target, "--value", $vars[$name], "--yes", "--force")
    if ($name -eq "SMTP_PASS" -and $target -eq "production") {
      $vercelArgs += "--sensitive"
    }

    Invoke-VercelEnvAdd -CliArgs $vercelArgs
    Write-Host "  $name ok"
  }
}

Write-Host "== preview =="
Write-Host "  (via Vercel API - CLI preview target hangs in non-interactive mode)"
foreach ($name in $vars.Keys) {
  Add-PreviewEnvVar -Name $name -Value $vars[$name]
  Write-Host "  $name ok"
}

Write-Host "Done."
