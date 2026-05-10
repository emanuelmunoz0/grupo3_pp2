import productosDb from '../database/products_db.js';
import { Producto } from '../models/Producto.js';

const productsController = {
  getAll(req, res) {
    res.json(productosDb);
  },

  getById(req, res) {
    const id = Number(req.params.id);    
    const product = productosDb.find(producto => producto.id_producto === idProducto);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    return res.json(product);
  },

  create(req, res) {
    const { id, nombre, precio, stock, imagen } = req.body;
    const product = new Producto({ id: productosDb.length + 1, nombre, precio, stock, imagen });
    productosDb.push(product);
    return res.status(201).json(product);
  },

  update(req, res) {
    const id = Number(req.params.id);
    const product = productosDb.find(item => item.id === id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const { nombre, precio, stock, imagen } = req.body;
    if (nombre !== undefined) product.nombre = nombre;
    if (precio !== undefined) product.precio = precio;
    if (stock !== undefined) product.stock = stock;
    if (imagen !== undefined) product.imagen = imagen;

    return res.json(product);
  },

  remove(req, res) {
    const id = Number(req.params.id);
    const index = productosDb.findIndex(item => item.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    productosDb.splice(index, 1);

    return res.status(204).end();
  }
};

// function hayStockProducto(id_producto, cantidad) {
//   const producto = buscarProducto(id_producto);
//   return producto && producto.stock >= cantidad;
// }

// function restarStockProducto(id_producto, cantidad) {
//   lista_productos[id_producto].stock -= cantidad;
// }

// function agregarProducto(id_producto, cantidad, id_item) {
//     const producto = buscarProducto(id_producto);
//     if (producto) {
//       if (hayStockProducto(id_producto, cantidad)) {
//         this.ItemCarrito.push(
//           new ItemCarrito(this.id_carrito, id_item, producto, cantidad),
//         );
//         restarStockProducto(id_producto, cantidad);
//         console.log(
//           // `✔️  El item ${producto.nombre} se agregó ${cantidad} vez/veces`,
//         );
//       } else {
//         console.log(`❌ Stock insuficiente del producto ${producto.nombre}`);
//       }
//     } else {
//       console.log(`No existe el producto`);
//     }
//   }
 
export default productsController;