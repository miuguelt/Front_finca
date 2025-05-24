FROM node:20-alpine

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración con los permisos adecuados
COPY --chown=node:node package*.json ./

# Cambiar al usuario 'node'
USER node

# Instalar dependencias
RUN npm install --legacy-peer-deps

# Copiar el resto de los archivos
COPY --chown=node:node . .

# Compilar y construir la aplicación
RUN npx tsc -b && npx vite build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Si tu build está en 'build' o 'dist', ajusta la ruta
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]