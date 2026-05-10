export class Usuario {
  constructor(id_usuario, nombre, email, password, es_corporativo) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.es_corporativo = es_corporativo;
    this.OrdenCompra = [];
  }
}