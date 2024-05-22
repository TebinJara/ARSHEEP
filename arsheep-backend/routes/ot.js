import express from 'express';
import { createOrdenTrabajo } from '../controllers/ordenTrabajoController.js';

const router = express.Router();

router.post('/', createOrdenTrabajo);

export default router;
