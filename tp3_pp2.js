// ═══════════════════════════════════════════════════════════════
//  1. ENTIDADES (CLASES)
// ═══════════════════════════════════════════════════════════════

class Usuario {
  constructor(id_usuario, nombre, email, password, es_corporativo) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.es_corporativo = es_corporativo;
    this.OrdenCompra = [];
  }
}

class Cupon {
  constructor(id_cupon, nombre, descuento, fecha_vencimiento, activo) {
    this.id_cupon = id_cupon;
    this.nombre = nombre;
    this.descuento = descuento / 100;
    this.fecha_vencimiento = new Date(fecha_vencimiento);
    this.activo = activo;
  }
}

class Producto {
  constructor(id_producto, nombre, precio, stock) {
    this.id_producto = id_producto;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }
}

class ItemCarrito {
  constructor(id_carrito, id_item, objeto_producto, cantidad) {
    this.id_carrito = id_carrito;
    this.id_item = id_item;
    this.producto_id = objeto_producto;
    this.cantidad = cantidad;
  }
}

class Carrito {
  constructor(id_carrito, usuario) {
    this.id_carrito = id_carrito;
    this.usuario = usuario;
    this.ItemCarrito = [];
  }

  agregarProducto(id_producto, cantidad, id_item) {
    const producto = buscarProducto(id_producto);
    if (producto) {
      if (hayStockProducto(id_producto, cantidad)) {
        this.ItemCarrito.push(
          new ItemCarrito(this.id_carrito, id_item, producto, cantidad),
        );
        restarStockProducto(id_producto, cantidad);
        console.log(
          `✔️  El item ${producto.nombre} se agregó ${cantidad} vez/veces`,
        );
      } else {
        console.log(`❌ Stock insuficiente del producto ${producto.nombre}`);
      }
    } else {
      console.log(`No existe el producto`);
    }
  }
}

class OrdenCompra {
  constructor(id_orden, fecha_compra) {
    this.id_orden = id_orden;
    this.usuario_id = null;
    this.cupon_id = null;
    this.total = 0;
    this.fecha_compra = new Date(fecha_compra);
    this.estado_compra = "Pendiente";
    this.DetalleOrden = [];
  }

  agregarDetalle(detalle) {
    this.DetalleOrden.push(detalle);
  }

  calcularTotal() {
    const subTotal = this.DetalleOrden.reduce(
      (acc, det) => acc + det.subtotalDetalleOrden(),
      0,
    );

    let porcentajeDescuento = 0;
    if (es_corporativoUsuario(this.usuario_id)) {
      porcentajeDescuento = 10;
    } else if (validarCupon(this.cupon_id)) {
      porcentajeDescuento = descuentoCupon(this.cupon_id) * 100;
    }

    const descuentoMonto = subTotal * (porcentajeDescuento / 100);
    return (this.total = subTotal - descuentoMonto);
  }
}

class DetalleOrden {
  constructor(id_orden, id_detalle, cantidad, precio_unitario) {
    this.id_orden = id_orden;
    this.id_detalle = id_detalle;
    this.producto_id = null;
    this.cantidad = cantidad;
    this.precio_unitario = precio_unitario;
  }

  subtotalDetalleOrden() {
    return this.cantidad * this.precio_unitario;
  }
}

class Envio {
  constructor(id_envio, orden_id, estado_envio, fecha_envio) {
    this.id_envio = id_envio;
    this.orden_id = orden_id;
    this.estado_envio = estado_envio;
    this.fecha_envio = new Date(fecha_envio);
  }
}

class Pago {
  constructor(id_pago, orden_id, estado_pago, metodo_pago, fecha_pago) {
    this.id_pago = id_pago;
    this.orden_id = orden_id;
    this.estado_pago = estado_pago;
    this.metodo_pago = metodo_pago;
    this.fecha_pago = new Date(fecha_pago);
  }
}

// ═══════════════════════════════════════════════════════════════
//  2. BASE DE DATOS EN MEMORIA / ESTADO GLOBAL
// ═══════════════════════════════════════════════════════════════

const lista_usuarios = {};
const lista_cupones = {};
const lista_productos = {};
const lista_carritos = {};
const sesion = { usuario_id: null };

let _ordenCounter = 1;
function _generarIdOrden() {
  return _ordenCounter++;
}

// ═══════════════════════════════════════════════════════════════
//  3. USUARIOS
// ═══════════════════════════════════════════════════════════════

function registrarUsuario(objetoUsuario) {
  lista_usuarios[objetoUsuario.id_usuario] = objetoUsuario;
  if (objetoUsuario.es_corporativo) {
    console.log(
      `🧍${objetoUsuario.nombre} ha sido registrado/a correctamente como usuario corporativo`,
    );
  } else {
    console.log(`🧍${objetoUsuario.nombre} ha sido registrado/a correctamente`);
  }
}

function es_corporativoUsuario(usuario_id) {
  return lista_usuarios[usuario_id]?.es_corporativo || false;
}

function buscarUsuario(id_usuario) {
  return lista_usuarios[id_usuario] || false;
}

function loguearUsuario(email, password) {
  for (let id in lista_usuarios) {
    const u = lista_usuarios[id];
    if (u.email === email && u.password === password) {
      sesion.usuario_id = u.id_usuario;
      console.log(`✔️  El usuario se logueó correctamente`);
      return true;
    }
  }
  console.log(`❌ Error al loguearse`);
  return false;
}

function cerrarSesion() {
  sesion.usuario_id = null;
}

function estaLogueado() {
  return sesion.usuario_id !== null;
}

// ═══════════════════════════════════════════════════════════════
//  4. CUPONES
// ═══════════════════════════════════════════════════════════════

function crearCupon(objetoCupon) {
  lista_cupones[objetoCupon.id_cupon] = objetoCupon;
  console.log(`✔️  Se creó el cupón con nombre ${objetoCupon.nombre}`);
}

function validarCupon(cupon_id) {
  const hoy = new Date();
  if (cupon_id in lista_cupones) {
    if (lista_cupones[cupon_id].fecha_vencimiento < hoy) {
      lista_cupones[cupon_id].activo = false;
    }
    return lista_cupones[cupon_id].activo;
  }
  return false;
}

function descuentoCupon(cupon_id) {
  return lista_cupones[cupon_id]?.descuento;
}

// ═══════════════════════════════════════════════════════════════
//  5. PRODUCTOS
// ═══════════════════════════════════════════════════════════════

function crearProducto(objetoProducto) {
  lista_productos[objetoProducto.id_producto] = objetoProducto;
  console.log(`📦 El producto ${objetoProducto.nombre} ha sido creado`);
}

function buscarProducto(id_producto) {
  return lista_productos[id_producto] || false;
}

function hayStockProducto(id_producto, cantidad) {
  const producto = buscarProducto(id_producto);
  return producto && producto.stock >= cantidad;
}

function restarStockProducto(id_producto, cantidad) {
  lista_productos[id_producto].stock -= cantidad;
}

// ═══════════════════════════════════════════════════════════════
//  6. CARRITO
// ═══════════════════════════════════════════════════════════════

function crearCarrito(id_carrito, id_usuario) {
  const usuario = buscarUsuario(id_usuario);
  if (usuario) {
    const carrito = new Carrito(id_carrito, usuario);
    lista_carritos[carrito.id_carrito] = carrito;
    console.log(`🛒 El carrito de ${usuario.nombre} se creó correctamente`);
  } else {
    console.log(`Se produjo un error`);
  }
}

// ═══════════════════════════════════════════════════════════════
//  7. CHECKOUT
// ═══════════════════════════════════════════════════════════════

function verificarStockCarrito(id_carrito) {
  const carrito = lista_carritos[id_carrito];
  if (!carrito) return false;

  for (const item of carrito.ItemCarrito) {
    if (!buscarProducto(item.producto_id.id_producto)) {
      return false;
    }
  }
  return true;
}

function verificarSesion() {
  return estaLogueado();
}

function ingresarDatosEnvio(datosEnvio) {
  return new Envio(
    Date.now(),
    null,
    "Pendiente",
    new Date().toISOString(),
  );
}

function generarOrden(id_carrito, cupon_id) {
  const carrito = lista_carritos[id_carrito];
  const orden = new OrdenCompra(_generarIdOrden(), new Date().toISOString());

  orden.usuario_id = sesion.usuario_id;
  orden.cupon_id = cupon_id;

  let detalleCounter = 1;

  for (const item of carrito.ItemCarrito) {
    const detalle = new DetalleOrden(
      orden.id_orden,
      detalleCounter++,
      item.cantidad,
      item.producto_id.precio,
    );
    detalle.producto_id = item.producto_id;
    orden.agregarDetalle(detalle);
  }

  orden.calcularTotal();
  return orden;
}

function seleccionarMetodoPago(metodoPago) {
  return metodoPago;
}

function procesarPago(orden, metodoPago, pagoAprobado = true) {
  const pago = new Pago(
    Date.now(),
    orden.id_orden,
    "Pendiente",
    metodoPago,
    new Date().toISOString(),
  );

  if (pagoAprobado) {
    pago.estado_pago = "Aprobado";
    orden.estado_compra = "Pagada";
  } else {
    pago.estado_pago = "Rechazado";
  }

  return pago;
}

function emitirTicket(orden, pago, envio) {
  console.log("TICKET GENERADO");
}

function enviarMailConfirmacion(orden) {
  console.log("MAIL ENVIADO");
}

function simularCompra(
  id_carrito,
  cupon_id,
  datosEnvio,
  metodoPago,
  pagoAprobado = null,
) {
  const carrito = lista_carritos[id_carrito];
  if (!carrito) return;

  if (!verificarStockCarrito(id_carrito)) return;
  if (!verificarSesion()) return;

  const envio = ingresarDatosEnvio(datosEnvio);
  const orden = generarOrden(id_carrito, cupon_id);

  seleccionarMetodoPago(metodoPago);
  const pago = procesarPago(orden, metodoPago, pagoAprobado);

  if (pago.estado_pago === "Aprobado") {
    emitirTicket(orden, pago, envio);
    enviarMailConfirmacion(orden);
  } else {
    orden.estado_compra = "Cancelada";
  }
}

// ═══════════════════════════════════════════════════════════════
//  8. ÓRDENES PARA PROBAR EL SISTEMA
// ═══════════════════════════════════════════════════════════════

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
  true, // pagoAprobado (aprobado)
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
  false, // pagoAprobado (rechazado)
);