# EcommerceApp

Aplicación full-stack de comercio electrónico construida con Node.js, Express, Sequelize y SQLite. Incluye autenticación JWT, gestión de productos, carrito de compras, órdenes y panel administrativo.

## ✨ Características Principales

- **Autenticación JWT** - Segura con roles (admin/cliente)
- **Catálogo de Productos** - Búsqueda, filtrado por categorías y visualización
- **Carrito de Compras** - Agregar, modificar y gestionar items
- **Órdenes de Compra** - Historial completo con estados
- **Cupones de Descuento** - Validación y aplicación automática
- **Panel Administrativo** - Gestión completa de productos, categorías, órdenes y cupones
- **Base de Datos Relacional** - SQLite con 10 modelos bien definidos
- **API REST** - Endpoints organizados y documentados

## 🛠️ Stack Tecnológico

| Aspecto | Tecnología |
|---------|-----------|
| **Backend** | Node.js 18+, Express 5.x, Sequelize 6.x |
| **Base de Datos** | SQLite3 |
| **Frontend** | HTML5, CSS3, JavaScript Vanilla |
| **Autenticación** | JWT (JSON Web Token) |
| **Seguridad** | bcryptjs para hash de contraseñas |

## 📋 Requisitos Previos

- Node.js 18 o superior
- npm 9 o superior
- Git para clonar el repositorio

Verifica la instalación:
```bash
node --version    # v18.x.x o superior
npm --version     # 9.x.x o superior
```

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <url-repositorio>
cd ecommerceApp
```

### 2. Instalar dependencias
```bash
cd backend
npm install
```

### 3. Configurar variables de entorno

Crear archivo `backend/.env`:
```env
DB_DIALECT=sqlite
DB_STORAGE=./ecommerce.sqlite
JWT_SECRET=clave_local_para_desarrollo
```

### 4. Ejecutar el servidor
```bash
npm start
```

Acceder a la aplicación en: `http://localhost:3000`

## 📂 Estructura del Proyecto

```
ecommerceApp/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuración de Sequelize
│   │   ├── controllers/     # Lógica de negocio (12 archivos)
│   │   ├── middlewares/     # Autenticación y autorización
│   │   ├── models/          # Modelos Sequelize (10 tablas)
│   │   ├── routes/          # Endpoints de API (9 rutas)
│   │   └── utils/           # JWT y hash de contraseñas
│   ├── server.js            # Punto de entrada
│   └── package.json
│
├── frontend/
│   ├── index.html           # Catálogo de productos
│   ├── login.html           # Autenticación
│   ├── register.html        # Registro de usuarios
│   ├── profile.html         # Perfil y órdenes del usuario
│   ├── admin.html           # Panel de administración
│   ├── css/                 # Estilos
│   └── js/                  # Lógica del cliente
│
└── README.md
```

## 🎯 Funcionalidades

### Para Usuarios
- Registro e inicio de sesión con JWT
- Explorar catálogo con búsqueda y filtros
- Gestionar carrito personal (agregar, editar, eliminar)
- Realizar compras con aplicación de cupones
- Ver historial de órdenes y detalles

### Para Administradores
- Crear, editar y eliminar productos
- Gestionar categorías
- Ver todas las órdenes y cambiar estado
- Crear y validar cupones de descuento

## 🔐 Autenticación y Roles

La aplicación usa JWT para autenticación stateless:

**Rol: Cliente**
- Acceso a catálogo y búsqueda
- Carrito personal
- Realizar compras
- Ver su perfil y órdenes

**Rol: Admin**
- Todos los permisos de cliente
- Panel administrativo
- Gestión completa de productos y categorías
- Administración de órdenes y cupones

**Token JWT incluye**:
- ID y email del usuario
- Nombre y rol
- Fecha de expiración (7 días)

## 🗄️ Base de Datos

**Motor**: SQLite3 (embebido, sin configuración adicional)

**Tablas principales**:
- `Usuarios` - Cuentas con roles (admin/client)
- `Productos` - Catálogo con precio y stock
- `Categorias` - Organización de productos
- `Carritos` - Carrito personal por usuario
- `ItemCarritos` - Items dentro del carrito
- `OrdenCompras` - Órdenes finalizadas
- `DetalleOrdenes` - Detalles de cada orden
- `Cupones` - Códigos de descuento con validez
- `Pagos` - Registros de pagos
- `Envios` - Estado y seguimiento de envíos

**Relaciones automáticas**: Sequelize maneja todas las foreign keys y relaciones entre tablas.

## 📡 API REST

La API utiliza endpoints REST con prefijo `/api/`:

- `/api/auth/login` - Autenticación
- `/api/register` - Registro de usuarios
- `/api/productos` - Catálogo de productos
- `/api/categorias` - Gestión de categorías
- `/api/carrito` - Operaciones del carrito
- `/api/ordenes` - Compras y órdenes
- `/api/cupon` - Cupones de descuento
- `/api/usuarios` - Gestión de usuarios
- `/api/envio` - Envíos y pagos

Todos los endpoints que requieren autenticación necesitan:
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

## 🧪 Credenciales de Prueba

Al ejecutar por primera vez, se cargan automáticamente:

**Admin**:
- Email: `admin@ecommerce.com`
- Contraseña: `admin123`

**Cliente**:
- Email: `cliente@example.com`
- Contraseña: `cliente123`

## 📝 Scripts Disponibles

```bash
npm start        # Ejecutar servidor con auto-reload (node --watch)
npm test         # Ejecutar tests (no configurado aún)
```

## 🎨 Convenciones del Código

- **Idioma**: Español (variables, funciones, nombres de rutas)
- **Patrón de proyecto**: MVC (Models-Views-Controllers)
- **Modules**: ES6 modules (`import`/`export`)
- **Estilos de código**: Consistentes con convenciones de Node.js

## ⚠️ Estado del Proyecto

- ✅ Funcionalidades principales completadas
- ✅ Autenticación y autorización implementadas
- ✅ Base de datos estructurada y relaciones definidas
- ✅ API REST completa
- ⚠️ En fase de desarrollo y pruebas

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Realiza cambios y commits descriptivos
4. Push a tu fork (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia **MIT**.

---

**Versión**: 1.0.0  
**Última actualización**: Junio 2024  
**Lenguaje del código**: Español