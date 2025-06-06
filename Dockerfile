# FASE 1: Construir el frontend con Vite
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # Genera la carpeta dist/

# FASE 2: Copiar archivos estáticos a un volumen compartido
FROM alpine:3.18
WORKDIR /var/www/html
COPY --from=build-stage /app/dist .