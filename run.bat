@echo off
echo ========================================
echo  Electronics Store Application
echo ========================================
echo.

echo Installing dependencies...
call npm run setup

echo.
echo Starting application...
echo Backend will be available at: http://localhost:8090
echo Frontend will be available at: http://localhost:3000
echo.

call npm start