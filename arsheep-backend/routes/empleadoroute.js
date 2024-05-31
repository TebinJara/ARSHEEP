import express from 'express';
import { getEmpleados } from '../controllers/empleadoController.js';

const router = express.Router();

router.get('/api/empleados', getEmpleados);

export default router;