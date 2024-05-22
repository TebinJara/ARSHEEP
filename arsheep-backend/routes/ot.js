import express from 'express';
import { createOrdenTrabajo } from '../controllers/ordenTrabajoController.js';

const router = express.Router();

router.post('/orden-trabajo', createOrdenTrabajo);

export default router;