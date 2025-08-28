#!/bin/bash

echo "Starting Vite React + Express.js Development Setup"
echo "=================================================="

# Start Express server in background
echo "Starting Express server on port 5000..."
cd server
npm start &
EXPRESS_PID=$!

# Wait a moment for Express to start
sleep 2

# Start Vite development server
echo "Starting Vite development server on port 5173..."
cd ../client
npm run dev

# Cleanup on exit
trap "kill $EXPRESS_PID 2>/dev/null" EXIT
