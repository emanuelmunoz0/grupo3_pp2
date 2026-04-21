import {
  // Usuarios
  Usuario,
  lista_usuarios,
  registrarUsuario,
  es_corporativoUsuario,
  buscarUsuario,
  loguearUsuario,

  // Sesión
  sesion,
  cerrarSesion,

  // Órdenes
  OrdenCompra,
  DetalleOrden,

  // Envío y pago
  Envio,
  Pago,

  // Cupones
  Cupon,
  lista_cupones,
  crearCupon,
  validarCupon,
  descuentoCupon,

  // Productos
  Producto,
  lista_productos,
  crearProducto,
  buscarProducto,
  hayStockProducto,
  restarStockProducto,

  // Carrito
  ItemCarrito,
  Carrito,
  lista_carritos,
  crearCarrito,

  // Flujo completo
  simularCompra,
} from "./tp3_pp2.js";

console.info(`🟠 CREAMOS A DOS USUARIOS, UNO CORPORATIVO Y OTRO NORMAL`);
registrarUsuario(
  new Usuario(1, "Maria Pia Buono", "pia@gmail.com", "password", true),
);
registrarUsuario(
  new Usuario(
    2,
    "Ludmila Sánchez Rufanacht",
    "ludmila@gmail.com",
    "password",
    false,
  ),
);

console.info(`\n🟠 CREAMOS EL CUPÓN PARA LOS USUARIOS NORMALES`);
crearCupon(new Cupon(1, "CUPON", 5, "2026/10/12", true));

console.info(`\n🟠 CREAMOS 5 PRODUCTOS`);
crearProducto(
  new Producto(1, "Cafetera Nescafé 230v Blanca Genio S Blanco", 179.999, 5),
);
crearProducto(
  new Producto(
    2,
    "Ventilador Retractil De Techo 4 aspas Color Blanco",
    113.149,
    50,
  ),
);
crearProducto(
  new Producto(
    3,
    "Perfume Liquid Brun French Avenue 100ml Edp Arabe",
    82.081,
    100,
  ),
);
crearProducto(
  new Producto(4, "Samsung Galaxy A16 4g 128gb 4 Gb Ram Negro", 257.699, 150),
);
crearProducto(
  new Producto(5, "Colchón KL-Eterna Känn Livet 2 Plazas", 308.999, 200),
);

console.info(`\n🟠 BUSCAMOS UN PRODUCTO`);
console.table(buscarProducto(4));

console.info(`\n🟠 CREAMOS LOS CARRITOS`);
crearCarrito(1, 2); // Carrito de Ludmila
crearCarrito(2, 1); // Carrito de Maria Pia

// ═══════════════════════════════════════════════════════════════
//  COMPRA 1 — USUARIO CORPORATIVO (Maria Pia, carrito #2)
//  Regla de negocio: descuento 10% por ser corporativo
// ═══════════════════════════════════════════════════════════════

console.info(`\n${"▓".repeat(60)}`);
console.info(`  SIMULACIÓN DE COMPRA 1 — USUARIO CORPORATIVO (Maria Pia)`);
console.info(`${"▓".repeat(60)}`);

console.info(`\n🟠 USUARIO BUSCA PRODUCTOS`);
console.log(`🔍 Maria Pia busca: "Samsung Galaxy"`);
console.table(buscarProducto(4));

console.info(`\n🟠 AGREGA PRODUCTOS AL CARRITO`);
lista_carritos[2].agregarProducto(4 /*Samsung Galaxy*/, 1, 1);
lista_carritos[2].agregarProducto(5 /*Colchón*/, 1, 2);

console.info(`\n🟠 VAMOS AL CARRITO`);
console.log(lista_carritos[2]);

console.info(`\n🟠 HACEMOS LOGIN`);
loguearUsuario("pia@gmail.com", "password");

simularCompra(
  2, // id_carrito
  null, // sin cupón (aplica descuento corporativo)
  {
    direccion: "Av. Corrientes 1234",
    ciudad: "Buenos Aires",
    provincia: "Buenos Aires",
    codigo_postal: "C1043",
  },
  "Tarjeta de crédito",
);

// ═══════════════════════════════════════════════════════════════
//  COMPRA 2 — USUARIO NORMAL CON CUPÓN (Ludmila, carrito #1)
//  Regla de negocio: descuento 5% por cupón "CUPON"
// ═══════════════════════════════════════════════════════════════

cerrarSesion(); // limpia la sesión antes de la siguiente compra

console.info(`\n${"▓".repeat(60)}`);
console.info(`  SIMULACIÓN DE COMPRA 2 — USUARIO NORMAL CON CUPÓN (Ludmila)`);
console.info(`${"▓".repeat(60)}`);

console.info(`\n🟠 USUARIO BUSCA PRODUCTOS`);
console.log(`🔍 Ludmila busca: "Cafetera"`);
console.table(buscarProducto(1));

console.info(`\n🟠 AGREGA PRODUCTOS AL CARRITO`);
lista_carritos[1].agregarProducto(1 /*Cafetera*/, 2, 1);
lista_carritos[1].agregarProducto(3 /*Perfume*/, 1, 2);

console.info(`\n🟠 VAMOS AL CARRITO`);
console.log(lista_carritos[1]);

console.info(`\n🟠 HACEMOS LOGIN`);
loguearUsuario("ludmila@gmail.com", "password");

simularCompra(
  1, // id_carrito
  1, // cupon_id (aplica descuento 5%)
  {
    direccion: "Mitre 567",
    ciudad: "Córdoba",
    provincia: "Córdoba",
    codigo_postal: "X5000",
  },
  "Transferencia bancaria",
);
