class Envio {
  constructor(id_envio, orden_id, estado_envio, fecha_envio) {
    this.id_envio = id_envio;
    this.orden_id = orden_id;
    this.estado_envio = estado_envio;
    this.fecha_envio = new Date(fecha_envio);
  }
}