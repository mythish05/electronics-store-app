@echo off
echo Starting Electronics Store Application...
echo.

echo [1/2] Starting Backend (Spring Boot)...
cd app_backend\springapp
start "Backend Server" cmd /k "mvn spring-boot:run"
cd ..\..

echo [2/2] Waiting 15 seconds for backend to start...
timeout /t 15 /nobreak > nul

echo Starting Frontend (React)...
cd app_frontend
npm start