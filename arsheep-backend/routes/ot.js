import express from 'express';
import { insertarOrdenTrabajo, obtenerOT, obtenerOTPorId} from '../controllers/ordenTrabajoController.js';

const router = express.Router();

router.post('/', insertarOrdenTrabajo);
router.get('/', obtenerOT);
router.get('/:id_ot', obtenerOTPorId);

export default router;