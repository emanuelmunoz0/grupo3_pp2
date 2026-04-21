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

const lista_usuarios = {};

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
  if (id_usuario in lista_usuarios) {
    return lista_usuarios[id_usuario];
  } else {
    return false;
  }
}

/**
 * Verifica credenciales y, si son correctas, guarda el usuario en la sesión activa.
 * Retorna true si el login fue exitoso, false si no.
 */
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

// ─────────────────────────────────────────────────────────────
//  SESIÓN  (estado interno — no depende de ningún módulo externo)
// ─────────────────────────────────────────────────────────────

const sesion = { usuario_id: null };

function cerrarSesion() {
  sesion.usuario_id = null;
}

function estaLogueado() {
  return sesion.usuario_id !== null;
}

// ─────────────────────────────────────────────────────────────
//  CUPONES
// ─────────────────────────────────────────────────────────────

class Cupon {
  constructor(id_cupon, nombre, descuento, fecha_vencimiento, activo) {
    this.id_cupon = id_cupon;
    this.nombre = nombre;
    this.descuento = descuento / 100;
    this.fecha_vencimiento = new Date(fecha_vencimiento);
    this.activo = activo;
  }
}

const lista_cupones = {};

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
  if (cupon_id in lista_cupones) {
    return lista_cupones[cupon_id].descuento;
  }
}

// ─────────────────────────────────────────────────────────────
//  PRODUCTOS
// ─────────────────────────────────────────────────────────────

class Producto {
  constructor(id_producto, nombre, precio, stock) {
    this.id_producto = id_producto;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }
}

const lista_productos = {};

function crearProducto(objetoProducto) {
  lista_productos[objetoProducto.id_producto] = objetoProducto;
  console.log(`📦 El producto ${objetoProducto.nombre} ha sido creado`);
}

function buscarProducto(id_producto) {
  if (id_producto in lista_productos) {
    return lista_productos[id_producto];
  } else {
    return false;
  }
}

function hayStockProducto(id_producto, cantidad) {
  const producto = buscarProducto(id_producto);
  return producto && producto.stock >= cantidad;
}

function restarStockProducto(id_producto, cantidad) {
  lista_productos[id_producto].stock -= cantidad;
}

// ─────────────────────────────────────────────────────────────
//  CARRITO
// ─────────────────────────────────────────────────────────────

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

const lista_carritos = {};

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

// ─────────────────────────────────────────────────────────────
//  ORDEN DE COMPRA
// ─────────────────────────────────────────────────────────────

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

// Contador interno — no se exporta, es detalle de implementación
let _ordenCounter = 1;
function _generarIdOrden() {
  return _ordenCounter++;
}

// ─────────────────────────────────────────────────────────────
//  ENVÍO Y PAGO
// ─────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────
//  CHECKOUT — pasos individuales del diagrama
// ─────────────────────────────────────────────────────────────

/**
 * Paso 1 — Verificar stock de todos los ítems del carrito.
 */
function verificarStockCarrito(id_carrito) {
  const carrito = lista_carritos[id_carrito];
  if (!carrito) {
    console.log(`❌ Carrito ${id_carrito} no encontrado`);
    return false;
  }

  for (const item of carrito.ItemCarrito) {
    if (!buscarProducto(item.producto_id.id_producto)) {
      console.log(
        `❌ El producto ${item.producto_id.nombre} ya no está disponible`,
      );
      return false;
    }
  }
  console.log(`✔️  Stock verificado correctamente`);
  return true;
}

/**
 * Paso 2 — Verificar que haya un usuario logueado en la sesión activa.
 */
function verificarSesion() {
  if (!estaLogueado()) {
    console.log(`❌ El usuario no está logueado. Redirigiendo al login...`);
    return false;
  }
  console.log(`✔️  Usuario logueado: ID ${sesion.usuario_id}`);
  return true;
}

/**
 * Paso 3 — Registrar los datos de envío y devolver el objeto Envio.
 */
function ingresarDatosEnvio(datosEnvio) {
  const envio = new Envio(
    Date.now(),
    null,
    "Pendiente",
    new Date().toISOString(),
  );
  console.log(`🚚 Datos de envío registrados:`);
  console.log(`   Dirección : ${datosEnvio.direccion}`);
  console.log(`   Ciudad    : ${datosEnvio.ciudad}`);
  console.log(`   Provincia : ${datosEnvio.provincia}`);
  console.log(`   CP        : ${datosEnvio.codigo_postal}`);
  return envio;
}

function generarOrden(id_carrito, cupon_id) {
  const carrito = lista_carritos[id_carrito];
  const id_orden = _generarIdOrden();
  const orden = new OrdenCompra(id_orden, new Date().toISOString());
  orden.usuario_id = sesion.usuario_id;
  orden.cupon_id = cupon_id;

  let detalleCounter = 1;
  for (const item of carrito.ItemCarrito) {
    const detalle = new DetalleOrden(
      id_orden,
      detalleCounter++,
      item.cantidad,
      item.producto_id.precio,
    );
    detalle.producto_id = item.producto_id;
    orden.agregarDetalle(detalle);
  }

  const subtotal = orden.DetalleOrden.reduce(
    (acc, d) => acc + d.subtotalDetalleOrden(),
    0,
  );
  console.log(
    `   Subtotal (sin descuentos): $${subtotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`,
  );

  if (es_corporativoUsuario(sesion.usuario_id)) {
    console.log(`✔️  El usuario ES CORPORATIVO → se aplica 10% de descuento`);
  } else if (cupon_id && validarCupon(cupon_id)) {
    console.log(
      `✔️  Cupón válido → se aplica ${descuentoCupon(cupon_id) * 100}% de descuento`,
    );
  } else {
    console.log(`   Sin descuento aplicable`);
  }

  const total = orden.calcularTotal();
  console.log(
    `💰 Total final: $${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`,
  );

  orden.estado_compra = "Generada";
  buscarUsuario(sesion.usuario_id).OrdenCompra.push(orden);

  console.log(`📋 Orden de compra generada:`);
  console.log(`   ID Orden  : ${orden.id_orden}`);
  console.log(`   Usuario   : ${buscarUsuario(sesion.usuario_id).nombre}`);
  console.log(`   Fecha     : ${new Date().toLocaleDateString("es-AR")}`);
  console.log(`   Estado    : ${orden.estado_compra}`);
  console.log(`   Items     : ${orden.DetalleOrden.length}`);
  console.log(
    `   Total     : $${orden.total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`,
  );

  return orden;
}

/**
 * Paso 6 — Mostrar el método de pago seleccionado.
 */
function seleccionarMetodoPago(metodoPago) {
  console.log(`💳 Método de pago seleccionado: ${metodoPago}`);
  return metodoPago;
}

function procesarPago(orden, metodoPago, pagoAprobado = true) {
  const pago = new Pago(
    Date.now() + 1,
    orden.id_orden,
    "Pendiente",
    metodoPago,
    new Date().toISOString(),
  );

  if (pagoAprobado) {
    pago.estado_pago = "Aprobado";
    orden.estado_compra = "Pagada";
    console.log(`✔️  Pago aprobado correctamente`);
  } else {
    pago.estado_pago = "Rechazado";
    console.log(`❌ El pago fue rechazado`);
  }
  return pago;
}

function emitirTicket(orden, pago, envio) {
  const usuario = buscarUsuario(orden.usuario_id);
  const subtotal = orden.DetalleOrden.reduce(
    (acc, d) => acc + d.subtotalDetalleOrden(),
    0,
  );
  const SEP_DOBLE = "═".repeat(52);
  const SEP_SIMPLE = "─".repeat(52);

  console.log(`\n${SEP_DOBLE}`);
  console.log(`         🧾  TICKET DE COMPRA  🧾`);
  console.log(SEP_DOBLE);
  console.log(` Orden N°      : ${orden.id_orden}`);
  console.log(` Fecha         : ${new Date().toLocaleDateString("es-AR")}`);
  console.log(` Cliente       : ${usuario.nombre}`);
  console.log(SEP_SIMPLE);
  console.log(` PRODUCTOS:`);
  for (const d of orden.DetalleOrden) {
    const nombre = d.producto_id.nombre.substring(0, 30).padEnd(30);
    const monto = (d.precio_unitario * d.cantidad).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
    });
    console.log(`  • ${nombre}  x${d.cantidad}  $${monto}`);
  }
  console.log(SEP_SIMPLE);
  console.log(
    ` Subtotal      : $${subtotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`,
  );
  if (es_corporativoUsuario(orden.usuario_id)) {
    console.log(` Descuento     : -10% (Corporativo)`);
  } else if (orden.cupon_id && validarCupon(orden.cupon_id)) {
    const pct = descuentoCupon(orden.cupon_id) * 100;
    console.log(
      ` Descuento     : -${pct}% (Cupón ${lista_cupones[orden.cupon_id].nombre})`,
    );
  }
  console.log(
    ` TOTAL         : $${orden.total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`,
  );
  console.log(` Método pago   : ${pago.metodo_pago}`);
  console.log(` Estado pago   : ${pago.estado_pago}`);
  console.log(` Estado envío  : ${envio.estado_envio}`);
  console.log(`${SEP_DOBLE}\n`);
}

function enviarMailConfirmacion(orden) {
  const usuario = buscarUsuario(orden.usuario_id);
  console.log(`📧 Mail de confirmación enviado a: ${usuario.email}`);
  console.log(`   Asunto : ¡Tu compra #${orden.id_orden} fue confirmada!`);
  console.log(
    `   Mensaje: Hola ${usuario.nombre.split(" ")[0]}, tu pago fue aprobado y tu pedido está en preparación.`,
  );
}

function simularCompra(
  id_carrito,
  cupon_id,
  datosEnvio,
  metodoPago,
  pagoAprobado = true,
) {
  const carrito = lista_carritos[id_carrito];
  if (!carrito) {
    console.log(`❌ El carrito ${id_carrito} no existe`);
    return;
  }

  console.info(
    `\n🟠 INICIANDO CHECKOUT — Carrito #${id_carrito} de ${carrito.usuario.nombre}`,
  );

  console.info(`\n🟠 VERIFICANDO STOCK DE LOS ÍTEMS DEL CARRITO`);
  if (!verificarStockCarrito(id_carrito)) return;

  console.info(`\n🟠 VERIFICANDO SI EL USUARIO ESTÁ LOGUEADO`);
  if (!verificarSesion()) return;

  console.info(`\n🟠 INGRESANDO DATOS DE ENVÍO`);
  const envio = ingresarDatosEnvio(datosEnvio);

  console.info(`\n🟠 CALCULANDO TOTAL DE COMPRA`);
  console.info(`\n🟠 VERIFICANDO DESCUENTOS`);
  const orden = generarOrden(id_carrito, cupon_id);
  envio.orden_id = orden.id_orden;

  console.info(`\n🟠 SELECCIONANDO MÉTODO DE PAGO`);
  seleccionarMetodoPago(metodoPago);

  console.info(`\n🟠 GENERANDO ORDEN DE COMPRA`);
  console.log(
    `   Orden #${orden.id_orden} registrada con estado: ${orden.estado_compra}`,
  );

  console.info(`\n🟠 PROCESANDO PAGO`);
  const pago = procesarPago(orden, metodoPago, pagoAprobado);

  if (pago.estado_pago === "Aprobado") {
    envio.estado_envio = "En preparación";

    console.info(`\n🟠 EMITIENDO TICKET`);
    emitirTicket(orden, pago, envio);

    console.info(`🟠 ENVIANDO MAIL DE CONFIRMACIÓN`);
    enviarMailConfirmacion(orden);
  } else {
    const reintentar = false;
    if (reintentar) {
      console.log(`🔄 El usuario elige reintentar el pago...`);
    } else {
      orden.estado_compra = "Cancelada";
      console.log(
        `🚫 Compra cancelada. Orden #${orden.id_orden} marcada como cancelada.`,
      );
    }
  }
}

export {
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
  estaLogueado,

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

  // Checkout — pasos individuales
  verificarStockCarrito,
  verificarSesion,
  ingresarDatosEnvio,
  generarOrden,
  seleccionarMetodoPago,
  procesarPago,
  emitirTicket,
  enviarMailConfirmacion,

  // Flujo completo
  simularCompra,
};
