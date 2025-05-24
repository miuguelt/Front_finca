FROM node:20-alpine AS builder

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar dependencias y compilar como root
RUN npm install --legacy-peer-deps && \
    npm install -g typescript && \
    npx tsc -b && \
    npx vite build

# Copiar el resto de los archivos
COPY . .

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Si tu build está en 'build' o 'dist', ajusta la ruta
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]