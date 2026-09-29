@echo off
title Aurelia Restaurant - Task 2 ReactJS Application
echo ============================================================
echo      Aurelia Restaurant - ReactJS Interactive Application
echo         Task 2 - Full Stack Web Development (React 18)
echo ============================================================
echo.
cd /d "%~dp0"

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not added to PATH.
    echo Please install Node.js from https://nodejs.org/ and try again.
    pause
    exit /b
)

:: If node_modules is missing, automatically install dependencies
if not exist "node_modules\" (
    echo [SETUP] First time setup detected. Installing dependencies...
    echo Running "npm install", please wait a moment...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] npm install encountered an error.
        pause
        exit /b
    )
    echo.
    echo [SETUP] Dependencies installed successfully!
    echo.
)

echo Starting Vite Development Server...
echo The app will be available at: http://localhost:5173/
echo Press Ctrl+C in this window anytime to stop the server.
echo.
call npm run dev
pause
