import express from 'express';

import detalleOrdenController from '../controllers/detalleOrdenController.js';

const router = express.Router();

router.get('/', detalleOrdenController);
router.get('/:id', detalleOrdenController);

router.post('/', detalleOrdenController);

router.put('/:id', detalleOrdenController);

router.delete('/:id', detalleOrdenController);