@echo off
title Albion Coach - Starting Project
color 0A

echo.
echo ========================================
echo   ALBION COACH - PROJECT LAUNCHER
echo ========================================
echo.
echo Starting development server...
echo.
echo Frontend will be available at:
echo   http://localhost:8080
echo.
echo Admin panel:
echo   http://localhost:8080/admin
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] Installing dependencies...
    echo.
    call npm install
    echo.
)

REM Start the development server
echo [INFO] Starting Vite dev server...
echo.
call npm run dev

pause
