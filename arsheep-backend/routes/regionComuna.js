import express from 'express';
import { getRegiones, getComunasByRegion, getComunaById, getRegionById } from '../controllers/regionComuna.js';

const router = express.Router();

router.get('/regiones', getRegiones);  // Obtener todas las regiones
router.get('/regiones/:id', getRegionById);  // Obtener una región por ID
router.get('/regiones/:id/comunas', getComunasByRegion);  // Obtener todas las comunas por ID de región
router.get('/comunas/:id', getComunaById);  // Obtener una comuna por ID

export default router;
