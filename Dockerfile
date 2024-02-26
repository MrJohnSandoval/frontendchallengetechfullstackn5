# Uso la imagen oficial de node como base
FROM node:18

# Establecezco el directorio de trabajo en /app
WORKDIR /app

# Copio el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalo las dependencias
RUN npm install

# Copio el resto de los archivos del proyecto al directorio de trabajo actual en el contenedor
COPY . .

# Compilo la aplicación React para producción
RUN npm run build

# Establecezco la variable de entorno para indicar que la aplicación se está ejecutando en un entorno de producción
ENV NODE_ENV=production

# Expongo el puerto 3000 para que la aplicación sea accesible desde fuera del contenedor
EXPOSE 3000

# Ejecuto la aplicación
CMD ["npm", "start"]
