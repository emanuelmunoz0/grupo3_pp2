import express from 'express';
const router = express.Router();
import {categoriaController} from '../controllers/categoriaController.js';

router.get('/', categoriaController.getCategorias);
router.get('/:id', categoriaController.getCategoriaById);
router.post('/', categoriaController.createCategoria);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);  

export default router;
