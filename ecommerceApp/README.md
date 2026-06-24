# EcommerceApp

EcommerceApp es una aplicación full stack con frontend estático y backend en Node.js, Express, Sequelize y SQLite.
El backend expone un API REST, manejando productos, categorías, usuarios, órdenes, detalles de órdenes, carritos y cupones.

## Resumen rápido

- Frontend: `frontend/`
- Backend: `backend/`
- Servidor local: `http://localhost:3000`
- Base de datos: SQLite
- Autenticación: JWT

## Características principales

- Login con JWT y roles `admin` / `client`.
- Catálogo público de productos con filtro por categoría.
- Panel de administración en `admin.html`.
- Edición de productos y categorías desde el panel admin.
- Visibilidad de categorías y productos.
- Seed inicial con usuarios, categorías y productos de ejemplo.

## Estructura del proyecto

```text
ecommerceApp/
  backend/
    package.json
    server.js
    src/
      config/
      controllers/
      middlewares/
      models/
      routes/
      utils/
  frontend/
    admin.html
    index.html
    login.html
    css/
    js/
```

## Requisitos

- Node.js 18 o superior recomendado
- npm

## Instalación

Instalar dependencias desde la carpeta `backend/`:

```bash
cd backend
npm install
```

## Variables de entorno

Crear un archivo `.env` dentro de `backend/`:

```env
DB_DIALECT=sqlite
DB_STORAGE=./ecommerce.sqlite
JWT_SECRET=clave_local_para_desarrollo
```

Notas:

- `DB_DIALECT` debe quedar en `sqlite`.
- `DB_STORAGE` apunta al archivo SQLite.
- `JWT_SECRET` firma los tokens JWT.

## Ejecución

Levantar el backend desde `backend/`:

```bash
npm start
```

El servidor usa `node --watch server.js`, por lo que reinicia automáticamente al detectar cambios.

Una vez iniciado, el frontend se sirve desde:

- `http://localhost:3000`

## Credenciales de prueba

El seed inicial crea al menos un administrador y un usuario cliente:

### Administrador

- Email: `admin@gmail.com`
- Password: `123456`

### Cliente

- Email: `cliente@gmail.com`
- Password: `123456`

## Comportamiento del sistema

- La base de datos se inicializa y carga datos de ejemplo si es necesario.
- El frontend público carga solo categorías visibles.
- El catálogo público oculta productos con `visible: false`.
- El filtro por categoría utiliza `id_categoria`.
- El panel admin muestra y permite editar datos cuando se tiene token admin.

## Frontend

### `index.html`

- Catálogo público de productos.
- Filtro por categoría.
- Carrito de compras.
- Acceso a panel admin si el usuario es administrador.

### `admin.html`

- Panel de administración para productos y categorías.
- Filtros avanzados de productos.
- Creación y actualización de categorías.

### `login.html`

- Formulario de inicio de sesión.

## API principal

### Autenticación

- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Respuesta: token JWT y datos del usuario.

### Usuarios

- `POST /api/register`
- `GET /api/usuarios/:id`
- `PUT /api/usuarios/:id`
- `DELETE /api/usuarios/:id`

### Productos

- `GET /api/productos`
- `GET /api/productos/:id`
- `GET /api/admin/productos` (admin)
- `POST /api/productos` (admin)
- `PUT /api/productos/:id` (admin)
- `DELETE /api/productos/:id` (admin)

Filtro público por categoría:

- `GET /api/productos?id_categoria=<id>`

### Categorías

- `GET /api/categorias`
- `GET /api/categorias/:id`
- `POST /api/categorias` (admin)
- `PUT /api/categorias/:id` (admin)
- `DELETE /api/categorias/:id` (admin)

### Órdenes

- `GET /api/ordenes`
- `GET /api/ordenes/:id`
- `POST /api/ordenes`
- `PUT /api/ordenes/:id`
- `DELETE /api/ordenes/:id`

### Detalle de órdenes

- `GET /api/detalles`
- `GET /api/detalles/:id`
- `POST /api/detalles`
- `PUT /api/detalles/:id`
- `DELETE /api/detalles/:id`

### Carrito

- `GET /api/carrito`
- `GET /api/carrito/:id`
- `POST /api/carrito`
- `PUT /api/carrito/:id`
- `DELETE /api/carrito/:id`

### Cupones

- `GET /api/cupon`
- `GET /api/cupon/:id`
- `POST /api/cupon`
- `PUT /api/cupon/:id`
- `DELETE /api/cupon/:id`

### Checkout

- `POST /api/checkout`
  - Método de ejemplo que recibe el carrito y devuelve un mensaje de confirmación.

## Modelos relevantes

- `Producto`: nombre, precio, stock, descuento, porcentajeDescuento, visible, image, id_categoria, validoDesde, validoHasta
- `Categoria`: id_categoria, nombre, visible
- `Usuario`: nombre, email, password, es_corporativo, role, orden_compra
- `OrdenCompra`: id_orden, usuario_id, cupon_id, total, fecha_compra, estado_compra
- `DetalleOrden`: id_detalle, id_orden, producto_id, cantidad, precio_unitario
- `Carrito`: id_carrito, usuario
- `Cupon`: id_cupon, nombre, descuento, fecha_vencimiento, activo
- `Envio`: estado, fecha

### Usuario

- `nombre`
- `email`
- `password`
- `es_corporativo`
- `role`

### Categoria

- `id_categoria`
- `nombre`
- `visible`

### Producto

- `id`
- `nombre`
- `precio`
- `stock`
- `descuento`
- `porcentajeDescuento`
- `visible`
- `image`
- `id_categoria`
- `validoDesde`
- `validoHasta`

## Relaciones

- Un `Usuario` tiene muchas `OrdenCompra`.
- Una `OrdenCompra` tiene muchos `DetalleOrden`.
- Un `Producto` tiene muchos `DetalleOrden`.
- Una `Categoria` tiene muchos `Producto`.
- Un `Producto` pertenece a una `Categoria`.

## Desarrollo

- El proyecto usa ES Modules.
- No hay una suite de tests automatizados lista para ejecutar.
- El backend sirve el frontend estatico desde Express.

## Estado actual

El sistema esta preparado para:

- levantar la base SQLite automaticamente,
- crear datos semilla,
- autenticar usuarios,
- mostrar catalogo y carrito,
- filtrar productos por categoria,
- administrar productos y categorias desde un panel dedicado,
- y ocultar categorias completas sin borrar sus productos.
