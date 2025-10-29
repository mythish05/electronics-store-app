@echo off
echo ========================================
echo  Electronics Store Application
echo ========================================
echo.
echo Starting Backend on port 8090...
echo Starting Frontend on port 3000...
echo.
echo Open VS Code and run these commands in separate terminals:
echo.
echo Terminal 1 (Backend):
echo   cd app_backend\springapp
echo   mvn spring-boot:run
echo.
echo Terminal 2 (Frontend):
echo   cd app_frontend  
echo   npm start
echo.
echo Or use the PowerShell scripts:
echo   .\start-backend.ps1
echo   .\start-frontend.ps1
echo.
pause