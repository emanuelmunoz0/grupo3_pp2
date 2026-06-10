# EcommerceApp

Aplicación e-commerce full stack con frontend estático y backend en Node.js + Express + Sequelize + SQLite.

El sistema incluye autenticación con JWT, gestión básica de entidades de negocio, carga automática de datos iniciales y filtrado dinámico de productos por categoría.

## Descripción general

La aplicación está dividida en dos partes:

- `frontend/`: interfaz web estática servida por Express.
- `backend/`: API REST, autenticación, modelos y acceso a datos.

Cuando el servidor inicia:

1. Carga variables de entorno.
2. Inicializa Sequelize.
3. Sincroniza los modelos con la base de datos.
4. Asegura columnas heredadas en `Producto` y `Usuario`.
5. Ejecuta un seed inicial si todavía no hay productos cargados.
6. Expone el frontend y las rutas de la API en `http://localhost:3000`.

## Stack tecnológico

- Node.js
- Express 5
- Sequelize 6
- SQLite 3
- JSON Web Token con implementación propia sobre `crypto`
- `bcryptjs` para hash de contraseñas
- Bootstrap 5 en el frontend

## Estructura del proyecto

```text
ecommerceApp/
  backend/
    database/
    src/
      config/
      controllers/
      middlewares/
      models/
      routes/
      utils/
    package.json
    server.js
  frontend/
    css/
    js/
    index.html
```

## Funcionalidades principales

- Inicio de sesión de usuarios.
- Gestión de productos con altas, bajas, modificaciones y consulta.
- Filtrado dinámico del catálogo por categoría.
- Gestión de categorías.
- Gestión de usuarios.
- Gestión de carrito, cupones, órdenes de compra y detalle de órdenes.
- Seed automático con usuarios y productos de ejemplo.
- Restricción de acciones administrativas mediante token JWT.

## Categorías actuales

El seed inicial crea dos categorías:

- `Calefacción`
- `Cocina`

Los productos se vinculan con su categoría usando el campo `id_categoria`.

## Requisitos

- Node.js 18 o superior recomendado.
- npm.

## Instalación

Desde la carpeta del backend:

```bash
cd backend
npm install
```

## Variables de entorno

El backend usa variables de entorno para la base de datos. Crear un archivo `.env` dentro de `backend/` con un contenido similar a este:

```env
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
JWT_SECRET=clave_local_para_desarrollo
```

Notas:

- `DB_DIALECT` debe ser compatible con Sequelize. En este proyecto se usa `sqlite`.
- `DB_STORAGE` indica la ruta del archivo SQLite.
- `JWT_SECRET` es opcional, pero recomendado.
- Si `JWT_SECRET` no existe, el sistema usa un valor por defecto definido en código.

## Ejecución

Desde `backend/`:

```bash
npm start
```

El script configurado es:

```json
"start": "node --watch server.js"
```

La aplicación queda disponible en:

- `http://localhost:3000`

## Seed inicial

En el primer arranque, si no existen productos, el sistema carga automáticamente:

- Un usuario administrador.
- Un usuario cliente.
- Dos categorías.
- Cinco productos de ejemplo.

### Credenciales de prueba

Administrador:

- Email: `admin@example.com`
- Password: `123456`

Cliente:

- Email: `cliente@example.com`
- Password: `123456`

## Autenticación y autorización

### Login

Ruta:

- `POST /api/auth/login`

Body esperado:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

Respuesta exitosa:

```json
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": 1,
    "nombre": "Admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Uso del token

Las rutas protegidas esperan el header:

```http
Authorization: Bearer <token>
```

### Restricciones actuales

- Crear producto: solo admin.
- Actualizar producto: solo admin.
- Eliminar producto: solo admin.

## Catálogo y filtro por categoría

El frontend carga el catálogo consumiendo la API de productos.

Comportamiento actual:

- Carga todas las categorías desde `GET /api/categorias`.
- Carga productos desde `GET /api/productos`.
- Si el usuario selecciona una categoría, envía `GET /api/productos?id_categoria=<id>`.
- Si no hay coincidencias, muestra un mensaje en el catálogo.

Esto hace que el filtrado dependa de los datos reales de la base y no de valores hardcodeados en el frontend.

## Endpoints principales

### Autenticación

- `POST /api/auth/login`

### Productos

- `GET /api/productos`
- `GET /api/productos/:id`
- `POST /api/productos`
- `PUT /api/productos/:id`
- `DELETE /api/productos/:id`

Filtro soportado:

- `GET /api/productos?id_categoria=1`

### Usuarios

- `POST /api/register`
- `GET /api/usuarios/:id`
- `PUT /api/usuarios/:id`
- `DELETE /api/usuarios/:id`

### Categorías

- `GET /api/categorias`
- `GET /api/categorias/:id`
- `POST /api/categorias`
- `PUT /api/categorias/:id`
- `DELETE /api/categorias/:id`

### Órdenes de compra

- `GET /api/ordenes/`
- `GET /api/ordenes/:id`
- `POST /api/ordenes/`
- `PUT /api/ordenes/:id`
- `DELETE /api/ordenes/:id`

### Detalle de órdenes

- `GET /api/detalles/`
- `GET /api/detalles/:id`
- `POST /api/detalles/`
- `PUT /api/detalles/:id`
- `DELETE /api/detalles/:id`

### Carrito

- `GET /api/carrito/`
- `GET /api/carrito/:id`
- `POST /api/carrito/`
- `PUT /api/carrito/:id`
- `DELETE /api/carrito/:id`

### Cupones

- `GET /api/cupon/`
- `GET /api/cupon/:id`
- `POST /api/cupon/`
- `PUT /api/cupon/:id`
- `DELETE /api/cupon/:id`

### Checkout

- `POST /api/checkout`

Actualmente esta ruta recibe el carrito enviado por el frontend y responde con un mensaje de confirmación.

## Modelos relevantes

### Usuario

- `nombre`
- `email`
- `password`
- `es_corporativo`
- `role`
- `orden_compra`

La contraseña se guarda hasheada antes de persistir el usuario.

### Categoria

- `id_categoria`
- `nombre`

### Producto

- `id` o identificador generado por Sequelize
- `nombre`
- `precio`
- `stock`
- `image`
- `id_categoria`
- `validoDesde`
- `validoHasta`

## Relaciones de datos

- Un `Usuario` tiene muchas `OrdenCompra`.
- Una `OrdenCompra` tiene muchos `DetalleOrden`.
- Un `Producto` tiene muchos `DetalleOrden`.
- Una `Categoria` tiene muchos `Producto`.
- Un `Producto` pertenece a una `Categoria`.

## Frontend

La interfaz está en `frontend/` y se sirve desde Express como archivos estáticos.

Pantallas y bloques actuales:

- Login.
- Estado de sesión.
- Catálogo de productos.
- Selector de categoría.
- Botón de recarga.
- Botón de carrito.
- Panel admin visual, aún en desarrollo.

Comportamiento visible:

- Si no hay sesión, se muestra el login.
- Si el login es exitoso, se renderiza el catálogo.
- Si el usuario es admin, aparece el botón de panel admin.
- El botón de logout limpia `localStorage`.

## Observaciones actuales

- El frontend y el backend están integrados en un solo servidor Express.
- No hay una suite de tests automatizados implementada.
- El script `test` actual no ejecuta pruebas reales.
- La ruta del frontend se expone desde `express.static("../frontend")`.
- El proyecto usa ES Modules (`"type": "module"`).

## Posibles mejoras

- Agregar un `package.json` en la raíz para simplificar el arranque del proyecto completo.
- Incorporar tests para controllers, modelos y middleware.
- Documentar ejemplos completos de request y response para cada endpoint.
- Completar el flujo funcional del carrito y checkout en frontend.
- Proteger más rutas con autenticación y roles.
- Agregar validaciones de payload más estrictas.

## Estado actual del sistema

El sistema está preparado para:

- levantar una base SQLite automáticamente,
- crear usuarios y productos semilla,
- autenticar usuarios,
- mostrar el catálogo,
- filtrar productos por categoría de forma dinámica,
- y administrar productos desde rutas protegidas.
