FROM node:20-alpine AS builder
WORKDIR /app

# Copiar y configurar permisos correctamente
COPY package*.json ./

# Instala dependencias y da permisos al binario real de `tsc`
RUN npm install --legacy-peer-deps && \
    chmod +x $(readlink -f node_modules/.bin/tsc)

# Copia el resto del código
COPY . .

# Compila la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Si tu build está en 'build' o 'dist', ajusta la ruta
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]