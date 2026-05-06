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