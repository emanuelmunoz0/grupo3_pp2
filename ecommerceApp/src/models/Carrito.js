import { agregarItemCarrito } from "../controllers/itemCarritoController.js";

export class Carrito {
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
          // `✔️  El item ${producto.nombre} se agregó ${cantidad} vez/veces`,
        );
      } else {
        console.log(`❌ Stock insuficiente del producto ${producto.nombre}`);
      }
    } else {
      console.log(`No existe el producto`);
    }
  }
}

const lista_carritos = [];

function crearCarrito(id_carrito, id_usuario) {
  const usuario = id_usuario; //buscarUsuario(id_usuario);
  if (usuario) {
    const carrito = new Carrito(id_carrito, usuario);
    lista_carritos[carrito.id_carrito] = carrito;
    return carrito;
  } else {
    console.log(`Se produjo un error`);
  }
}

// 
