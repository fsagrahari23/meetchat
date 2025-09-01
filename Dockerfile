# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json files
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies for server
RUN cd server && npm ci --only=production

# Install dependencies for client
RUN cd client && npm ci

# Copy all source files
COPY . .

# Build the React client
RUN cd client && npm run build

# Expose ports
EXPOSE 5000 5001

# Start the server
CMD ["node", "server/index.js"]
