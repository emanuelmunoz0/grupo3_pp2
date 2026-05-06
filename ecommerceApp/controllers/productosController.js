function agregarProducto(id_producto, cantidad, id_item) {
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

import productosDb from '../database/products_db.js';

const productsController = {
  getAll(req, res) {
    // RECORRIDO COMPLETO DE GET /api/productos:
    // 1. server.js recibe la petición y la manda al router.
    // 2. src/routes/products.js llama a controller.getAll.
    // 3. El controller busca los datos en el store.
    // 4. Finalmente responde con JSON.
    //
    // Archivo siguiente para mirar en clase:
    // ../data/store.js
    res.json(productosDb);
  },

  getById(req, res) {
    // req.params guarda los parámetros que vienen desde la URL.
    // Si la URL es /api/productos/2, entonces req.params.id vale "2".
    const id = Number(req.params.id);    
    const product = productosDb.find(producto => producto.id_producto === idProducto);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    return res.json(product);
  },

  create(req, res) {
    // req.body trae los datos enviados por el cliente en formato JSON.
    const { name, price, stock } = req.body;

    // Tomamos el próximo ID disponible y luego lo incrementamos.
    const id = store.nextIds.products++;

    // Usamos la clase Product para construir un objeto consistente.
    const product = new Product({ id, name, price, stock });

    // Guardamos el nuevo producto en el store en memoria.
    store.products.push(product);
    return res.status(201).json(product);
  },

  update(req, res) {
    const id = Number(req.params.id);
    const product = store.products.find(item => item.id === id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Solo actualizamos los campos que efectivamente llegaron.
    // Esto evita pisar datos por error.
    const { name, price, stock } = req.body;
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;

    return res.json(product);
  },

  remove(req, res) {
    const id = Number(req.params.id);
    const index = store.products.findIndex(item => item.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // splice(index, 1) elimina un elemento del array.
    store.products.splice(index, 1);

    // 204 significa: "salió bien, pero no tengo contenido para devolver".
    return res.status(204).end();
  }
};
 
export default productsController;