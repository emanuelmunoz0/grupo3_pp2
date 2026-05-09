import express from 'express';

import ordenCompraController from '../controllers/ordenCompraController.js';

const router = express.Router();

router.get('/', ordenCompraController);
router.get('/:id', ordenCompraController);

router.post('/', ordenCompraController);

router.put('/:id', ordenCompraController);

router.delete('/:id', ordenCompraController);