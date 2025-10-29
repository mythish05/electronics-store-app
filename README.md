# Electronics Store Application

This application consists of a React frontend and Spring Boot backend.

## Quick Start

1. **Setup (First time only):**
   ```
   setup-dev.bat
   ```

2. **Start Application:**
   ```
   start-app.bat
   ```

## Manual Setup

### Prerequisites
- Node.js (v14 or higher)
- Java 17
- Maven
- MySQL (optional, H2 database is configured as fallback)

### Backend Setup
```bash
cd app_backend/springapp
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd app_frontend
npm install
npm start
```

## Application URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:8090
- Backend React (if needed): http://localhost:8081

## Common Issues

1. **Port conflicts**: Make sure ports 3000, 8090, and 8081 are available
2. **Database connection**: Update MySQL credentials in `application.properties` if needed
3. **CORS errors**: Frontend and backend CORS are configured for localhost development

## Project Structure
```
├── app_frontend/          # React frontend (port 3000)
├── app_backend/
│   ├── springapp/         # Spring Boot backend (port 8090)
│   └── reactapp/          # Additional React app (port 8081)
├── start-app.bat          # Start both applications
└── setup-dev.bat          # Setup development environment
```