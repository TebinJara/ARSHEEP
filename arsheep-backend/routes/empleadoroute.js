import express from 'express';
import { getEmpleados } from '../controllers/empleadoController.js';

const router = express.Router();

router.get('/', getEmpleados);

export default router;