@echo off
echo Setting up development environment...
echo.

echo Installing Frontend Dependencies...
cd app_frontend
call npm install
cd ..

echo.
echo Installing Backend Dependencies...
cd app_backend\springapp
call mvn clean install -DskipTests
cd ..\..

echo.
echo Setup complete! Run start-app.bat to start both applications.
pause