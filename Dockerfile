FROM node:20-alpine AS builder

WORKDIR /app

# Copiar configuraciones
COPY package*.json tsconfig.json ./

# Instalar dependencias del proyecto
RUN npm install 
ARG VITE_API_URL_ARG
ENV VITE_API_URL=$VITE_API_URL_ARG
# Copiar código fuente
COPY . .

# Compilar y construir la aplicación
RUN npx tsc -b && npx vite build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Si tu build está en 'build' o 'dist', ajusta la ruta
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]