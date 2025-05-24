FROM node:20-alpine AS builder

# Crear y asignar permisos al directorio de trabajo
RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app
USER node

# Copiar archivos de configuración e instalar dependencias
COPY --chown=node:node package*.json ./
RUN npm install --legacy-peer-deps

# Copiar el resto del código fuente
COPY --chown=node:node . .

# Compilar el proyecto
RUN npx tsc -b && npx vite build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Si tu build está en 'build' o 'dist', ajusta la ruta
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]