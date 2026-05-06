

function simularCompra(
  id_carrito,
  cupon_id,
  datosEnvio,
  metodoPago,
  pagoAprobado = null,
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
  let pago = procesarPago(orden, metodoPago, pagoAprobado);

  if (pago.estado_pago === "Aprobado") {
    envio.estado_envio = "En preparación";
    console.info(`\n🟠 EMITIENDO TICKET`);
    emitirTicket(orden, pago, envio);
    console.info(`🟠 ENVIANDO MAIL DE CONFIRMACIÓN`);
    enviarMailConfirmacion(orden);
  } else {
    orden.estado_compra = "Cancelada";
    console.log(`❌ El pago fue rechazado.`);
    console.log(
      `🚫 Compra cancelada. Orden #${orden.id_orden} marcada como cancelada.`,
    );
    console.log("¿Desea reintentar el pago? (s/n)");
    console.log("Redirigiendo a seleccionar método de pago...");
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