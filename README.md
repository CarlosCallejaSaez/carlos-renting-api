# Documentación de la API CarlosRenting

Bienvenido a CarlosRenting. Esta API proporciona endpoints para la gestión de una flota de coches de renting.

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