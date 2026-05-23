import express from 'express';
import productosController from '../controllers/productosController.js';

const router = express.Router();

router.get('/productos', productosController.getAll);

router.get('/productos/:id', productosController.getById);

router.post('/productos', productosController.create);

router.put('/productos/:id', productosController.update);

router.delete('/productos/:id', productosController.delete);

export default router;
