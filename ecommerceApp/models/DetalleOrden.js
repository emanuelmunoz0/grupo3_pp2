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