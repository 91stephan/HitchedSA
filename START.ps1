Set-Location "$PSScriptRoot\client"

Write-Host ""
Write-Host "  ====================================" -ForegroundColor Magenta
Write-Host "    HitchedSA Wedding Planner" -ForegroundColor Magenta
Write-Host "  ====================================" -ForegroundColor Magenta
Write-Host ""

$nodeVersion = node --version 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "  ERROR: Node.js not found. Install from https://nodejs.org" -ForegroundColor Red
  Read-Host "Press Enter to exit"
  exit 1
}

Write-Host "  Node.js $nodeVersion found" -ForegroundColor Green
Write-Host ""

if (!(Test-Path "node_modules")) {
  Write-Host "  Installing dependencies (first time only)..." -ForegroundColor Yellow
  npm install
  Write-Host ""
}

Write-Host "  Starting HitchedSA at http://localhost:5173" -ForegroundColor Cyan
Write-Host "  Keep this window open while using the app." -ForegroundColor Gray
Write-Host ""

npm run dev