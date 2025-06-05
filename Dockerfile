# Etapa 1: Construcción de la aplicación React + Vite
FROM node:20-alpine AS builder 
WORKDIR /app
COPY package.json package-lock.json ./ 
RUN npm install 
COPY . .
RUN npm run build

# Etapa 2: Servir la aplicación estática con Nginx
FROM nginx:alpine 
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración crucial para SPA: manejo de rutas
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Headers para evitar caché (opcional pero recomendado)
COPY headers.conf /etc/nginx/conf.d/headers.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]