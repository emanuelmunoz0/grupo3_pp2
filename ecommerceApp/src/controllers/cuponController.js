import express from 'express';
import carritoDb from '../database/carrito_db.js';

const router = express.Router();

router.get('/carrito', (req, res) => { 
    res.json(carritoDb); // Respondemos con la lista de carritos en formato JSON
});

router.post('/carrito', (req, res) => { 
    const carritoNuevo = req.body; // Obtenemos el nuevo carrito.
    carritoDb.push(carritoNuevo); // Agregamos el nuevo carrito a la base de datos en memoria
    console.log('Carrito:', carritoNuevo); 
    res.json(carritoDb); 
});

router.put('/carrito/:id',(req,res) => {
    const id_carrito = parseInt(req.params.id);
    const carritoActualizado = req.body; // Obtenemos el carrito actualizado enviado
    const carrito= carritoDb.find(carrito => carrito.id_carrito === idcarrito);
    if (carrito) {
       carrito.nombre = carritoActualizado.usuario ?? carrito.usuario;
       carrito.usuario = carritoActualizado.descuento ?? cupon.precio;
       console.log('Carrito actualizado:', carrito);
        res.json(carrito);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

router.delete('carrito/id:',(req,res) => {
    const id_carrito = parseInt(req.params.id);
    const carrito= carritoDb.find(carrito => carrito.id_carrito === idcarrito);
    if (carrito) {
         carritoDb.splice(carritoDb.indexOf(carrito), 1);
    console.log('Carrito eliminado exitosamente:', carrito);
        res.json(carrito);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});


export default router;
