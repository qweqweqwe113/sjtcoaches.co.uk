# Albion Coach Project Launcher
# PowerShell script to start the development server

# Set window title and colors
$Host.UI.RawUI.WindowTitle = "Albion Coach - Project Launcher"
$Host.UI.RawUI.BackgroundColor = "Black"
$Host.UI.RawUI.ForegroundColor = "Green"
Clear-Host

# ASCII Art Banner
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ALBION COACH - PROJECT LAUNCHER" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "[INFO] Project Directory: $scriptPath" -ForegroundColor Gray
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "[SETUP] Installing dependencies..." -ForegroundColor Yellow
    Write-Host "This may take a few minutes on first run..." -ForegroundColor Gray
    Write-Host ""
    npm install
    Write-Host ""
    Write-Host "[SUCCESS] Dependencies installed!" -ForegroundColor Green
    Write-Host ""
}

# Display server information
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SERVER INFORMATION" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Frontend:  " -NoNewline -ForegroundColor White
Write-Host "http://localhost:8080" -ForegroundColor Green
Write-Host "  Admin:     " -NoNewline -ForegroundColor White
Write-Host "http://localhost:8080/admin" -ForegroundColor Green
Write-Host ""
Write-Host "  Default Admin Credentials:" -ForegroundColor Yellow
Write-Host "    Email:    admin@albioncoach.co.uk" -ForegroundColor Gray
Write-Host "    Password: ChangeMe123!" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "[INFO] Starting development server..." -ForegroundColor Yellow
Write-Host "[INFO] Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

# Wait a moment for user to read
Start-Sleep -Seconds 2

# Start the development server
try {
    # Open browser after 5 seconds
    Start-Job -ScriptBlock {
        Start-Sleep -Seconds 5
        Start-Process "http://localhost:8080"
    } | Out-Null
    
    # Start the dev server
    npm run dev
}
catch {
    Write-Host ""
    Write-Host "[ERROR] Failed to start server: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# If we get here, the server was stopped
Write-Host ""
Write-Host "[INFO] Server stopped." -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
