@echo off
echo Starting Vite React + Express.js Development Setup
echo ==================================================

REM Start Express server in a new window
echo Starting Express server on port 5000...
start "Express Server" cmd /k "cd server && npm start"

REM Wait a moment for Express to start
timeout /t 3 /nobreak >nul

REM Start Vite development server
echo Starting Vite development server on port 5173...
cd client
npm run dev
