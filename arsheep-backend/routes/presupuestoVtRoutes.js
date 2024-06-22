// presupuestoVtRoutes.js
import express from 'express';
import { createPresupuestoVt, getPresupuestosVt, getPresupuestoVtById, updatePresupuestoVt, deletePresupuestoVt, getPresupuestoVtByIdVt } from '../controllers/presupuestoVtController.js';

const router = express.Router();

router.post('/', createPresupuestoVt);
router.get('/', getPresupuestosVt);
router.get('/:id', getPresupuestoVtById);
router.put('/:id', updatePresupuestoVt);
router.delete('/:id', deletePresupuestoVt);
router.get('/vt/:id_vt', getPresupuestoVtByIdVt); 
export default router;