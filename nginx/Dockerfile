# Build stage for React client
FROM node:22 AS build-stage

WORKDIR /app

COPY ./client/package*.json ./
RUN npm install

COPY ./client/ .
RUN npm run build

# Production stage
FROM nginx:1.23.3-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
