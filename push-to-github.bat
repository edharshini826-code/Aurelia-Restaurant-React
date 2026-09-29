@echo off
echo ============================================================
echo   Pushing Task 2 Code to GitHub
echo   Repository: https://github.com/edharshini826-code/Aurelia-Restaurant-React
echo ============================================================
echo.

cd /d "%~dp0"

echo Ensuring remote is set...
git remote set-url origin https://github.com/edharshini826-code/Aurelia-Restaurant-React.git

echo.
echo Pushing code to main branch...
echo (If prompted, please complete the GitHub sign-in in your browser)
echo.

git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo ============================================================
    echo   SUCCESS: Code pushed successfully!
    echo   View your repository at:
    echo   https://github.com/edharshini826-code/Aurelia-Restaurant-React
    echo ============================================================
) else (
    echo ============================================================
    echo   NOTE: If you haven't created the repository on GitHub yet:
    echo   1. Open: https://github.com/new
    echo   2. Repository name: Aurelia-Restaurant-React
    echo   3. Click "Create repository"
    echo   4. Re-run this file!
    echo ============================================================
)

echo.
pause
