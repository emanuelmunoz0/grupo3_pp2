import express from 'express';
import ordenCompraController from '../controllers/ordenCompraController.js';

const router = express.Router();

// GET all
router.get('/', ordenCompraController.getAll);

// GET by ID
router.get('/:id', ordenCompraController.getById);

// CREATE
router.post('/', ordenCompraController.create);

// UPDATE
router.put('/:id', ordenCompraController.update);

// DELETE
router.delete('/:id', ordenCompraController.delete);

export default router;