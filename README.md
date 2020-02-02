# Dockerizar-un-api-con-Node.js

## Construir la imagen 
 Nos vamos dentro del proyecto donde tenemos nuestro dockerfile y ejecutamos el siguiente comando para crear la imagen:  
 
 ``docker build -t <ejemplo>/node-web-app .``
  
## Crear contenedor y ejecutar la imagen  

 Para crear el cotenedor y a la vez ejecutarlo utilizamos el siguiente comenado:  
 
 ``docker run -p 49160:3000 --name node-docker -d <ejemplo>/node-docker``
