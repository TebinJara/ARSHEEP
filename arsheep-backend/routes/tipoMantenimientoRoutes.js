// tipoMantenimientoRoutes.js
import express from 'express';
import { createTipoMantenimiento, getTiposMantenimiento, getTipoMantenimientoById, updateTipoMantenimiento, deleteTipoMantenimiento } from '../controllers/tipoMantenimientoController.js';

const router = express.Router();

router.post('/', createTipoMantenimiento);
router.get('/', getTiposMantenimiento);
router.get('/:id', getTipoMantenimientoById);
router.put('/:id', updateTipoMantenimiento);
router.delete('/:id', deleteTipoMantenimiento);

export default router;

