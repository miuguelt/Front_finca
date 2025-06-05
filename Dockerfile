# Etapa 1: Construcción de la aplicación React + Vite
FROM node:20-alpine AS builder 
WORKDIR /app
COPY package.json package-lock.json ./ 
RUN npm install 
COPY . . 

# Compila la aplicación Vite. Esto generará los archivos estáticos en la carpeta 'dist'.
RUN npm run build

# Etapa 2: Servir la aplicación estática con Nginx
FROM nginx:alpine 
WORKDIR /usr/share/nginx/html 

# Copia los archivos estáticos compilados desde la etapa 'builder'
COPY --from=builder /app/dist .

# Expone el puerto 80, que es donde Nginx escuchará dentro del contenedor
EXPOSE 80

# Comando para iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]