# Documentacion para la instalacion y ejecucion del aplicativo
## Clonar el repositorio

git clone https://github.com/Ethan7FJ/ApiPrueba.git
### `npm install`

Despues de que se termine el proceso del `git clone`, ingresa a la carpeta desde tu editor de code ejemplo: VSCode.\
Una vez dentro del proyecto abres la termianl, y ejecutas `npm install`, esto con el fin de instalar todas las dependencias del proyecto.

### `composer install`

Este proyecto esta con Laravel||Backend y React||Frontend, por lo cual se nesceita haber descargado previamente el composer.\ 
Por si no lo tiene instalado: https://getcomposer.org/download/, si ya lo tienes instalado sigue estos pasos:\
Abre la terminal y ejecuta `composer install`, para instalar las dependencias.\
Luego de que se termine el proceso de composer, en tu terminal ingresa a la carpeta backend asi `cd backend`.\
Y vuelve a ejecutar el comando `composer install`, esto se hace para que el backend tenga sus dependencias instaladas para las peticiones que se realizan en el frontend.

### `npm start`

Una vez se tengan las dependencias `npm` y `composer` instaladas, en la tarminal (Asegurate que estas en la raiz del proyecto) ejecutas `npm start` para iniciar el servidor React.

### `php artisan serve`

**Note: Asegurate de tener php y composer instalados!**

Una vez iniciado el servidor de React, se necesita iniciar el seridor del backend, para que la api de peticiones Reac, pueda conectarse.\
En una nueva terminal ingresas a la carpeta backend `cd backend` y ejecutas `php artisan serve` esto iniciara tu servidor backend para que reciba las peticiones del front.\

**Note: Para la conexion de la base de datos, es importante que dentro de la carpeta backend crees el archivo .env para configurar la base da tados y demas conexiones.
Dentro de esta carpeta encontraras un .env.example para que te guies en la creacion del .env!**

### `Base de datos`

Dentro de la carpeta en la raiz del proyecto encontraras el script de la base de datos `ScriptDATABASE.txt`, que utiliza la aplicaion web.

### `By`

Johan Esteven Ruiz Fetecua || Desarrollador Junior.
