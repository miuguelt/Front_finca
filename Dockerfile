# Etapa 1: Construcción de la aplicación
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps && \
    ls -l node_modules/.bin/tsc && \
    chmod +x node_modules/.bin/tsc

COPY . .
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Si tu build está en 'build' o 'dist', ajusta la ruta
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]