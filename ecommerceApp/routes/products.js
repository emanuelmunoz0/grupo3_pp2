import express from 'express';

import productosController from '../controllers/productosController.js';

const router = express.Router();

router.get('/productos', productosController.getAll);

router.get('/productos/:id', productosController.getById);

router.post('/productos', (req, res) => { 
    const productoNuevo = req.body; // Obtenemos el nuevo producto enviado desde el cliente
    productosDb.push(productoNuevo); // Agregamos el nuevo producto a la base de datos en memoria
    console.log('Producto recibido:', productoNuevo); 
    res.json(productosDb); 
});

router.put('/productos/:id', (req, res) => {
    const idProducto = parseInt(req.params.id);
    const productoActualizado = req.body; // Obtenemos el producto actualizado enviado desde el cliente
    const producto = productosDb.find(producto => producto.id_producto === idProducto);
    if (producto) {
       producto.nombre = productoActualizado.nombre ?? producto.nombre;
       producto.precio = productoActualizado.precio ?? producto.precio;
       producto.stock = productoActualizado.stock ?? producto.stock;
       producto.img = productoActualizado.img ?? producto.img;
       producto.descuento = productoActualizado.descuento ?? producto.descuento;
        console.log('Producto actualizado:', producto);
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.delete('/productos/:id', (req, res) => {
    const idProducto = parseInt(req.params.id);
    const producto = productosDb.find(producto => producto.id_producto === idProducto);
    if (producto) {
        productosDb.splice(productosDb.indexOf(producto), 1);
        console.log(productosDb);
        res.json({ message: 'Producto eliminado exitosamente' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

export default router;

