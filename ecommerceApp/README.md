# EcommerceApp

EcommerceApp es una aplicacion full stack con frontend estatico y backend en Node.js, Express, Sequelize y SQLite.
Incluye autenticacion con JWT, catalogo publico, panel de administracion, gestion de productos y categorias, y carga automatica de datos iniciales.

## Resumen rapido

- Frontend: `frontend/`
- Backend: `backend/`
- Servidor local: `http://localhost:3000`
- Base de datos: SQLite
- Autenticacion: JWT

## Caracteristicas principales

- Login de usuarios con rol `admin` o `client`.
- Catalogo publico de productos con paginacion.
- Filtro de productos por categoria desde el frontend.
- Panel de administracion separado en `admin.html`.
- Edicion en tabla de productos y categorias.
- Filtro avanzado de publicaciones en el panel admin.
- Posibilidad de ocultar una categoria completa y ocultar automaticamente sus productos en el catalogo publico.
- Seed inicial con usuarios, categorias y productos de ejemplo.

## Estructura del proyecto

```text
ecommerceApp/
  backend/
    server.js
    package.json
    src/
      config/
      controllers/
      middlewares/
      models/
      routes/
      utils/
  frontend/
    index.html
    admin.html
    login.html
    css/
    js/
```

## Requisitos

- Node.js 18 o superior recomendado
- npm

## Instalacion

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

- `DB_DIALECT` debe quedar en `sqlite` para este proyecto.
- `DB_STORAGE` apunta al archivo SQLite.
- `JWT_SECRET` es recomendable para firmar tokens de forma consistente.

## Ejecucion

Levantar el backend desde `backend/`:

```bash
npm start
```

El script usa `node --watch server.js`, por lo que reinicia el servidor al detectar cambios.

Una vez levantado, el frontend queda disponible en:

- `http://localhost:3000`

## Credenciales de prueba

El seed inicial crea dos usuarios listos para usar:

### Administrador

- Email: `admin@gmail.com`
- Password: `123456`

### Cliente

- Email: `cliente@gmail.com`
- Password: `123456`

## Comportamiento del sistema

- Si no hay productos en la base, el sistema ejecuta el seed automaticamente.
- El frontend publico muestra solo categorias visibles.
- Si una categoria se oculta desde el panel admin, sus productos dejan de aparecer en el catalogo publico hasta que se vuelvan a mover manualmente a otra categoria o se reactive la categoria.
- El panel admin puede ver y editar todas las categorias cuando envia su token de autenticacion.

## Frontend

### `index.html`

- Catalogo de productos.
- Boton de filtro por categoria.
- Boton de carrito.
- Boton de acceso al panel admin si el usuario tiene rol administrador.

### `admin.html`

- Selector entre publicaciones y categorias.
- Edicion de productos en tabla.
- Edicion de categorias en tabla.
- Cambio de visibilidad de categorias.
- Filtros avanzados para publicaciones.

## API principal

### Autenticacion

- `POST /api/auth/login`

### Productos

- `GET /api/productos`
- `GET /api/productos/:id`
- `GET /api/admin/productos`
- `POST /api/productos`
- `PUT /api/productos/:id`
- `DELETE /api/productos/:id`

Filtro publico por categoria:

- `GET /api/productos?id_categoria=1`

### Categorias

- `GET /api/categorias`
- `GET /api/categorias/:id`
- `POST /api/categorias`
- `PUT /api/categorias/:id`
- `DELETE /api/categorias/:id`

### Usuarios

- `POST /api/register`
- `GET /api/usuarios/:id`
- `PUT /api/usuarios/:id`
- `DELETE /api/usuarios/:id`

### Ordenes

- `GET /api/ordenes/`
- `GET /api/ordenes/:id`
- `POST /api/ordenes/`
- `PUT /api/ordenes/:id`
- `DELETE /api/ordenes/:id`

### Detalle de ordenes

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

## Modelos relevantes

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
