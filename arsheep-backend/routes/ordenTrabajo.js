import express from 'express';
import {
    createOrdenTrabajo,
    getOrdenesTrabajo,
    getOrdenTrabajoById,
    updateOrdenTrabajo,
    deleteOrdenTrabajo,
    getOrdenTrabajoByIdvt
} from '../controllers/OTController.js';

const router = express.Router();

router.post('/ordenestrabajo', createOrdenTrabajo);  // Crear una nueva orden de trabajo
router.get('/ordenestrabajo', getOrdenesTrabajo);  // Obtener todas las órdenes de trabajo
router.get('/ordenestrabajo/:id', getOrdenTrabajoById);  // Obtener una orden de trabajo por ID
router.put('/ordenestrabajo/:id', updateOrdenTrabajo);  // Actualizar una orden de trabajo por ID
router.delete('/ordenestrabajo/:id', deleteOrdenTrabajo);  // Eliminar una orden de trabajo por ID
router.get('/ordenestrabajo/vt/:id', getOrdenTrabajoByIdvt);

export default router;