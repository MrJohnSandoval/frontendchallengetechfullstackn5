
# Frontend - ChallengeTechFullStackN5 ReactJS

Este es el desarrollo del frontend del challenge N5, desarrollado con ReactJS y usa principalmente código typeScript. Desarrollado por John Sandoval




## API Reference - BackendChallengeTechFullStackN5

#### GetPermissions

```http
  GET http://{host}:8080/api/permiso/getpermissions
```

| Parametetro | Tipo     | Descripción                     |
| :---------- | :------- | :------------------------- |
| `api_key` | `string` | **No solicitada*** |

#### Función:

Retorna todos los registros de la tabla permisos sin paginación.

#### GetPermission

```http
  GET http://{host}:8080/api/permiso/getpermission/${id}
```

| Parametetro | Tipo     | Descripción                     |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id requerido |

#### Función:

Busca un registro por id en la tabla permisos y retorna los datos del registro encontrado, se usa para cargar y mostrar en el frontend los datos que se van a modificar o eliminar, antes de hacerlo.
```json
{
	"id": {1},
	"nombreEmpleado": "Jon",
	"apellidoEmpleado": "Doe",
	"tipoPermiso": 1,
	"fechaPermiso": "2024-02-20T00:00:00"
}
```
#### RequestPermissions

```http
  POST http://{host}:8080/api/permiso/requestpermission
```

| Parametetro | Tipo     | Descripción                     |
| :-------- | :------- | :-------------------------------- |
| `body`      | `JSON` | **Ej:** {"nombreEmpleado": "Jon", "apellidoEmpleado": "Doe", "tipoPermiso": 3, "fechaPermiso": "2024-02-19T00:00:00"}|



#### Función:
Le envia datos al backend, para que los ingrese en la tabla permisos, requiere un esquema de datos de tipo JSON, en el body de la petición.
```json
{			
	"nombreEmpleado": "John",
	"apellidoEmpleado": "Doe",
	"tipoPermiso": 1,
	"fechaPermiso": "2024-02-19T00:00:00"
}
```
#### ModifyPermissions

```http
  PUT http://{host}:8080/api/permiso/modifypermission/{id}
```

| Parametetro | Tipo     | Descripción                     |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id requerido |
| `body`      | `JSON` | **Ej:** {"nombreEmpleado": "Jon", "apellidoEmpleado": "Doe Smith", "tipoPermiso": 3, "fechaPermiso": "2024-02-19T00:00:00"}|



#### Función:
Le envia datos al backend, para actualizarlos en la tabla permisos, requiere un esquema de datos de tipo JSON, en el body de la petición.
```json
{			
    "id": {id},
	"nombreEmpleado": "Jon",
	"apellidoEmpleado": "Doe Smith",
	"tipoPermiso": 3,
	"fechaPermiso": "2024-02-19T00:00:00"
}
```
#### RemovePermissions

```http
  PUT http://{host}:8080/api/permiso/removepermission/{id}
```

| Parametetro | Tipo     | Descripción                     |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id requerido |
| `body`      | `JSON` | **Ej:** {"nombreEmpleado": "Jon", "apellidoEmpleado": "Doe Smith", "tipoPermiso": 3, "fechaPermiso": "2024-02-19T00:00:00"}|



#### Función:
Le envia datos al backend, para actualizarlos en la tabla permisos, requiere un esquema de datos de tipo JSON, en el body de la petición.
```json
{			
    "id": {id},
	"nombreEmpleado": "Jon",
	"apellidoEmpleado": "Doe Smith",
	"tipoPermiso": 3,
	"fechaPermiso": "2024-02-19T00:00:00"
}
```


## Variables de entorno

El frontend usa solo una variable de entorno para comunicarse, la cual se usa para almacenar la URL base del backend, esta variable es necesaria para alinearse con sl servidor en temas de distribución de capas y manejo de CORS.

| Nombre | Tipo     | Descripción                     |
| :---------- | :------- | :------------------------- |
| `BACKEND_SERVER` | `string` | **Ej:** http://{dominio} or {ip}:{port}, http://localhost:8080|



## Características 

A continuación las características provistas por el framework o librería denominada ReactJS, el o la cual aporta solides al desarrollo:

- **Component-based Architecture:** ReactJS es conocido por su enfoque en la creación de aplicaciones a través de componentes reutilizables, lo que facilita la construcción y mantenimiento de interfaces de usuario complejas.

- **Virtual DOM:** ReactJS utiliza un DOM virtual para mejorar el rendimiento de la aplicación al minimizar las actualizaciones en el DOM real, lo que resulta en una experiencia de usuario más fluida.

- **JSX (JavaScript XML):** ReactJS utiliza JSX, una extensión de JavaScript que permite escribir código HTML dentro de JavaScript, lo que facilita la creación de componentes y la visualización de datos.

- **Unidirectional Data Flow:** ReactJS sigue el principio de unidireccionalidad en el flujo de datos, lo que significa que los datos fluyen en una sola dirección a través de la jerarquía de componentes, lo que facilita el seguimiento de los cambios y la depuración de la aplicación.

- **State Management:** ReactJS ofrece su propio sistema de gestión de estado a través del "estado local" de los componentes y el "estado global" a través de bibliotecas como Redux o el contexto de React, lo que permite una gestión eficiente del estado de la aplicación.

- **React Router:** React Router es una biblioteca que permite la navegación declarativa y basada en componentes en aplicaciones React, lo que facilita la creación de rutas y la gestión de la navegación dentro de la aplicación.

- **Reusable Components:** ReactJS fomenta la creación de componentes reutilizables que pueden ser fácilmente compartidos y compuestos para construir interfaces de usuario complejas.

- **React Hooks:** Introducidos en React 16.8, los hooks son funciones que permiten usar el estado y otras características de React sin escribir clases, lo que simplifica el código y mejora la legibilidad.

- **Ecosistema de Bibliotecas:** ReactJS cuenta con un amplio ecosistema de bibliotecas y herramientas complementarias que facilitan el desarrollo de aplicaciones, como React Router para la navegación, Redux para la gestión del estado, Axios para realizar solicitudes HTTP, etc.

- **Comunidad Activa:** ReactJS cuenta con una gran comunidad de desarrolladores que contribuyen constantemente con nuevas bibliotecas, tutoriales y soluciones a través de foros, blogs y repositorios de código, lo que facilita el aprendizaje y la resolución de problemas.

## Dependencies

A continuación el listado de pependencias utilizadas en el proyecto:

- [@emotion/react](https://www.npmjs.com/package/@emotion/react): ^11.11.3
- [@emotion/styled](https://www.npmjs.com/package/@emotion/styled): ^11.11.0
- [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material): ^5.15.10
- [@mui/material](https://www.npmjs.com/package/@mui/material): ^5.15.10
- [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom): ^5.17.0
- [@testing-library/react](https://www.npmjs.com/package/@testing-library/react): ^13.4.0
- [@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event): ^13.5.0
- [axios](https://www.npmjs.com/package/axios): ^1.6.7
- [cors](https://www.npmjs.com/package/cors): ^2.8.5
- [js-cookie](https://www.npmjs.com/package/js-cookie): ^3.0.5
- [react](https://www.npmjs.com/package/react): ^18.2.0
- [react-cookies](https://www.npmjs.com/package/react-cookies): ^0.1.1
- [react-dom](https://www.npmjs.com/package/react-dom): ^18.2.0
- [react-router-dom](https://www.npmjs.com/package/react-router-dom): ^6.22.1
- [react-scripts](https://www.npmjs.com/package/react-scripts): ^5.0.1
- [toastr](https://www.npmjs.com/package/toastr): ^2.1.4
- [web-vitals](https://www.npmjs.com/package/web-vitals): ^2.1.4

## Compilación
Para compilar este proyecto use.

```bash
  npm start
```
## Despliegue

Para desplegar este proyecto use, en tiempo de desarrollo.

```bash
  npm run deploy
```
o puedes optar por la imagen de docker, para desplegar el contenedor con el frontent, ten en cuenta que la solución completa tiene (frontend, backend, base de datos MS-SQLServer, Kafka con Zookeeper y Elasticsearch con Kibana), por lo anterior instalar solamente el frontend, no te permite ejecutar completamente el proyecto.

```bash
docker pull johndoval/proyecton5-frontendserver
```
Por otro cuando vaya a instalar la solución completa, revise el proyecto que tiene todos los contenedores de la solución.

https://github.com/MrJohnSandoval/ProyectoN5-JohnSandoval

**Nota:** recuerde que este es un ejercicio, como desafio de ingreso a un empleo.
## Autor
John Sandoval
- [@MrJohnSandoval](https://www.github.com/MrJohnSandoval)

## Reconocimientos

 - [Construcción profesional de documentación tipo README](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [READMEs asombrosos](https://github.com/matiassingers/awesome-readme)
 - [Como escribir un buen README](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
