import { agregarItemCarrito } from "../controllers/itemCarritoController.js";

export class Carrito {
  constructor(id_carrito, usuario) {
    this.id_carrito = id_carrito;
    this.usuario = usuario;
    this.ItemCarrito = [];
  }

  agregarProducto(id_producto, cantidad, id_item) {
    return agregarItemCarrito(this, id_producto, cantidad, id_item);
  }
}
