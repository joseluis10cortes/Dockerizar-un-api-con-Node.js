# **PROYECTO TRIANAWEATHER**
 
Este proyecto ha sido creado por el grupo GonzaloAndCompany, está compuesto por Esperanza Macarena Escacena, Gonzalo Punta Pérez, José Luis Díez y Lucas Amado Santos.

La aplicación se basa en la creación de varias estaciones meteorológicas en el barrio de Triana.
 
Antes de probarlo se debe tener claro que existen tres modelos:
- Station: Estación meteorológica
- User: usuario
- Weather: datos que queremos conocer de las estaciones meteorológicas (lluvia, precipitaciones, humedad, etc).
 
 
## **Inserción de datos**
---------------------------
Antes de nada lo primero es cargar algunos datos de prueba. Para debe descomentar **require('./data');**. Una vez  ejecute el proyecto por primera vez vuelva a comentarlo para evitar datos duplicados.
 
Para poner el proyecto en ejecución puede ejecutar el comando **npm start** aunque se recomienda el uso de **npm run watch**.
 
 
 
## **Endpoints**

 
### **1. Gestión de usuarios**
---------------------------
 
#### 1.1 Sign up (POST)
Si un usuario quiere registrarse debe acceder a la ruta http://localhost:3000/api/register
 
Ejemplo:
 
```json
{
    "fullname" : "Admin puntual",
    "username" : "admin.puntual@salesianos.edu",
    "password" : "Bosco-10",
    "email" : "super@gmail.com",
    "rol" : "ADMIN"
}
```
 
En caso de no poner ningún rol por defecto se asignará el rol USER.
 
#### 1.2 Sign in (POST)
Si un usuario quiere registrarse debe acceder a la ruta http://localhost:3000/api/login
 
Para poder loguearse con el usuario creado en el apartado anterior es necesario introducir lo datos username y password.
 
```json
{
    "username" : "admin.puntual@salesianos.edu",
    "password" : "Bosco-10",
}
```
 
Esta petición devolverá el username y un token con el que se podrán hacer diversas peticiones en función del rol del usuario.
 
#### 1.3 Listar usuarios (GET)
Si un administrador desea listar todos los usuarios debe acceder a la ruta http://localhost:3000/api/users
 
 
 
### **2. Gestión de estaciones meteorológicas**
--------------------------------------------------
 
#### 2.1 Listar estaciones (GET)
 
Lo primero que hay que tener en cuenta que para hacer esta petición hay que tener un rol de MANAGER o superior.
 
Para poder tener todas las estaciones hay que ir a la ruta http://localhost:3000/api/stations
 
 
#### 2.2 Buscar una estación por su id (GET)
Esta petición tan solo la pueden hacer lo usuarios con rol MANAGER o superior.
 
Esta petición devolverá todos los datos de una estación y para poder ejecutarla hay que ir a la ruta http://localhost:3000/api/stations/:id
 
Ejemplo:
```json
http://localhost:3000/api/stations/5dfbd608c6e5eb21805728c5
```

#### 2.3 Crear una estación (POST)
Esta petición tan solo la pueden hacer lo usuarios con rol MANAGER o superior.
 
Si se desea crear nuevos datos meteorológicos hay que ir a la ruta http://localhost:3000/api/stations
 
Ejemplo:
    
```json
{
    "latitud" : "13.51852",
    "longitud": "-8.14573",
    "nombre" : "Estación Salesianos Triana",
    "registro" :"5dfbec52ba4f2023e09b21f3",
    "mantenimiento" :"5dfbec52ba4f2023e09b21f5"
}
```

#### 2.4 Editar estación (PUT)
Esta petición tan solo la pueden hacer lo usuarios con rol MANAGER o superior.
 
Para borrar una estación hay que usar la ruta http://localhost:3000/api/stations/:id
 
Ejemplo:
    
```json
http://localhost:3000/api/stations/5dfbd608c6e5eb21805728c5
```

Además debemos pasarle los nuevos datos de la estación

```json
{
    "latitud" : "-11.51352",
    "longitud": "8.14573",
    "nombre" : "Estación modificada",
    "registro" : "5dfbec52ba4f2023e09b21f5",
    "mantenimiento" :"5dfbec52ba4f2023e09b21f3"
}
```



#### 2.5 Borrar estación (DELETE)
Esta petición tan solo la pueden hacer lo usuarios con rol MANAGER o superior.
 
Para borrar una estación hay que usar la ruta http://localhost:3000/api/stations/:id
 
Ejemplo:
```json
    http://localhost:3000/api/stations/5dfbd608c6e5eb21805728c5
```


### **3. Gestión de datos meteorológicos**
--------------------------------------------------
 
#### 3.1 Crear datos meteorológicos (POST)
Esta petición tan solo la pueden hacer lo usuarios con rol MANAGER o superior.
 
Si se desea crear nuevos datos meteorológicos hay que ir a la ruta http://localhost:3000/api/weather
 
Para poder garantizar su correcto uso se adjuntan unos datos de prueba:

```json    
{
    "station" : "5dfbd608c6e5eb21805728c6",
    "lluvia" : 120,
    "velocidad" : 27.3,
    "direccion_viento" : 13.7,
    "temp_ambiente" : 23,
    "temp_suelo" : -5,
    "humedad" : 5.6,
    "calidad_aire" : 49,
    "presion" : 30.13
}
```
 
### 3.2 Buscar los datos meteorológicos por su id (GET)
Esta petición podrán hacerlo aquellos usuarios con un rol USER o superior.
 
Si se quieren obtener unos datos meteorológicos concretos se debe usar la ruta http://localhost:3000/api/weather/:id
 
Ejemplo:
```json
    http://localhost:3000/api/weather/5dfbb33e651daa4bf0b5f62d
```
 
 
### 3.3 Buscar los datos meteorológicos de una estación (GET)
Esta petición podrán hacerlo aquellos usuarios con un rol USER o superior.
 
Si se quieren obtener los datos meteorológicos de una estación concreta se debe usar la ruta http://localhost:3000/api/stations/:id/weather/
 
Ejemplo:
```json    
    http://localhost:3000/api/stations/5dfbd608c6e5eb21805728c6/weather/
``` 
 
### 3.4 Buscar los datos meteorológicos de hoy (GET)
Esta petición podrán hacerlo aquellos usuarios con un rol USER o superior.
 
Sirve para mostrar todos los datos meteorológicos para el día de hoy.

Para poder usarlo hay que acceder a la ruta http://localhost:3000/api/weather/today
 
 
### 3.5 Buscar los datos meteorológicos de una estación entre dos fechas (GET)
Esta petición podrán hacerlo aquellos usuarios con un rol USER o superior.
 
Sirve para poder buscar los datos meteorológicos de una estación entre las fechas dadas.
 
Para usarlo se debe ir a la ruta http://localhost:3000/api/stations/:id/weather/from/:from/to/:to
 
Ejemplo:
```json
    http://localhost:3000/api/stations/5dfbd608c6e5eb21805728c6/weather/from/17-12-2019/to/05-10-2020
```
 
### 3.6 Buscar los todos los datos meteorológicos entre dos fechas (GET)
Esta petición podrán hacerlo aquellos usuarios con un rol USER o superior.
 
Sirve para poder buscar los datos meteorológicos de las estaciones entre dos fechas dadas.
 
Para usarlo se debe ir a la ruta http://localhost:3000/api/weather/from/:from/to/:to
 
Ejemplo:
```json
    http://localhost:3000/api/weather/from/17-12-2019/to/05-10-2020
```
 
 
 
### **4. Apartado de ampliación**
----------------------------------
Esta petición podrán hacerlo aquellos usuarios con un rol USER o superior.
 
Sirve para poder obtener un resumen de hoy con los datos meteorológicos de una estación meteorológica.
 
Para poder usarlo se debe ir a la ruta http://localhost:3000/api/stations/:id/summary/today
 
Ejemplo:
```json
    http://localhost:3000/api/stations/5dfbd608c6e5eb21805728c6/summary/today
```