# VS Code Terminal Instructions

## Method 1: Using VS Code Tasks (Recommended)
1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select "Start Backend" first
4. Wait for backend to start (you'll see "Started SpringappApplication")
5. Open new terminal and run "Start Frontend" task

## Method 2: Using PowerShell Scripts
Open two terminals in VS Code:

**Terminal 1 (Backend):**
```powershell
.\start-backend.ps1
```

**Terminal 2 (Frontend):**
```powershell
.\start-frontend.ps1
```

## Method 3: Manual Commands
**Terminal 1 (Backend):**
```cmd
cd app_backend\springapp
mvn spring-boot:run
```

**Terminal 2 (Frontend):**
```cmd
cd app_frontend
npm start
```

## Application URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:8090
- H2 Database Console: http://localhost:8090/h2-console

## Troubleshooting
- Make sure ports 3000 and 8090 are free
- If MySQL connection fails, H2 database will be used automatically
- Wait for backend to fully start before starting frontend