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