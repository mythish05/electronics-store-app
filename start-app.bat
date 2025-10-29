@echo off
echo Starting Electronics Store Application...
echo.

echo Starting Backend (Spring Boot)...
start "Backend" cmd /k "cd app_backend\springapp && mvn spring-boot:run"

echo Waiting for backend to initialize...
timeout /t 10 /nobreak > nul

echo Starting Frontend (React)...
start "Frontend" cmd /k "cd app_frontend && npm start"

echo.
echo Both applications are starting...
echo Backend will be available at: http://localhost:8090
echo Frontend will be available at: http://localhost:3000
echo.
pause