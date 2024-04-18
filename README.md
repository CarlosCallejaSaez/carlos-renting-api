# Documentación de la API CarlosRenting

Bienvenido a CarlosRenting. Esta API proporciona endpoints para la gestión de una flota de coches de renting.

## Documentación Swagger
Accede a la documentación de la API en `/api-docs`

## Uso de Morgan para el Registro de Logs

En este proyecto, se usa Morgan como middleware para registrar logs de las solicitudes HTTP en un archivo de registro. Esto garantiza que los logs generados por las solicitudes HTTP sean registrados en el archivo `access.log` en la carpeta `logs` del proyecto.

## Pruebas Unitarias con Mocha

Este proyecto incluye pruebas unitarias escritas utilizando Mocha, un popular marco de pruebas para Node.js. Las pruebas unitarias son una parte fundamental del proceso de desarrollo, ya que nos permiten verificar el funcionamiento correcto de cada componente de nuestra aplicación de forma aislada. Utilizamos Mocha junto con Chai y Chai-HTTP para escribir y ejecutar nuestras pruebas, asegurándonos de que nuestra aplicación funcione como se espera en diferentes escenarios. Para ejecutar las pruebas, simplemente ejecute el comando `npm test` en la terminal y Mocha se encargará de ejecutar todas las pruebas definidas en el directorio de pruebas.

## Página de Error 404 Personalizada Español/Inglés

Este proyecto incluye una página de error 404 personalizada para mejorar la experiencia del usuario cuando intenta acceder a una ruta que no existe en el servidor.

## Integración de Helmet para seguridad adicional

Agrega varias medidas de seguridad automáticas. Helmet configura encabezados HTTP relacionados con la seguridad, como la Política de Seguridad de Contenido (CSP), que ayuda a mitigar riesgos de Cross-Site Scripting (XSS) y otros ataques comunes. 

## Límite de Peticiones

Para garantizar la estabilidad y disponibilidad de la API, se ha un establecido un límite de peticiones utilizando el middleware `express-rate-limit` en Node.js. Este límite está configurado para permitir un máximo de 100 peticiones por hora por cliente. Esta medida permite controlar el tráfico entrante y prevenir sobrecargas en el servidor.



## Endpoints

### Coches (Cars)

- **GET /cars**: Obtiene todos los coches. Se puede filtrar por marca y/o año utilizando los parámetros de consulta `brand` y `year`.
  - Ejemplo de filtro por marca: `/cars?brand=Toyota`
  - Ejemplo de filtro por año: `/cars?year=2020`
  - Ejemplo de filtro combinado: `/cars?brand=Toyota&year=2020`
- **GET /cars/:id**: Obtiene un coche por su ID.
- **POST /cars**: Crea un nuevo coche.
- **PUT /cars/:id**: Actualiza un coche existente.
- **DELETE /cars/:id**: Elimina un coche.
-  **GET /cars/available**: Obtiene solo los coches disponibles.

### Reservas (Reservations)

- **GET /reservations**: Obtiene todas las reservas.
- **GET /reservations/:id**: Obtiene una reserva por su ID.
- **POST /reservations**: Crea una nueva reserva.
- **PUT /reservations/:id**: Actualiza una reserva existente.
- **DELETE /reservations/:id**: Elimina una reserva.

### Usuarios (Users)

- **GET /users**: Obtiene la lista de usuarios.
- **GET /users/:id**: Obtiene un usuario por su ID.
- **POST /users**: Crea un nuevo usuario.
- **PUT /users/:id**: Actualiza un usuario existente.
- **DELETE /users/:id**: Elimina un usuario.
- **POST /users/login**: Login usuario.

### Comentarios (Comments)

- **GET /comments**: Obtiene todos los comentarios, ordenados por fecha de creación descendente.
- **GET /comments/:id**: Obtiene un comentario por su ID.
- **POST /comments**: Crea un nuevo comentario.
- **PUT /comments/:id**: Actualiza un comentario existente.
- **DELETE /comments/:id**: Elimina un comentario.
# Rutas Protegidas

Las siguientes rutas requieren autenticación mediante un token JWT válido:

- **GET /:id**
  - Descripción: Obtiene un usuario por su ID.
  - Protección: Requiere un token JWT válido.

- **PUT /:id**
  - Descripción: Actualiza un usuario existente por su ID.
  - Protección: Requiere un token JWT válido.

- **DELETE /:id**
  - Descripción: Elimina un usuario por su ID.
  - Protección: Requiere un token JWT válido.

---

## Cómo obtener un token JWT válido

Para obtener un token JWT válido y acceder a las rutas protegidas, primero debes iniciar sesión utilizando la siguiente ruta:

- **POST /login**
  - Descripción: Inicia sesión con nombre de usuario y contraseña.
  - Parámetros de entrada: `username` (nombre de usuario) y `password` (contraseña).
  - Respuesta exitosa: Devuelve un token JWT válido que se debe incluir en las solicitudes a las rutas protegidas en el encabezado de autorización.

---

Recuerda incluir el token JWT en el encabezado de autorización de las solicitudes a las rutas protegidas de la siguiente manera:

Authorization: Bearer <token_jwt>

Donde `<token_jwt>` es el token JWT válido obtenido al iniciar sesión.

# ENV

ACCESS_TOKEN_SECRET=

MONGODB=

PORT= 