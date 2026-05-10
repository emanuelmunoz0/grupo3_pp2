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