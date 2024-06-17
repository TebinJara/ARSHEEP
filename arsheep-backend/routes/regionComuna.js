import express from 'express';
import { getRegiones, getRegionById, createRegion, updateRegion, deleteRegion, getComunas, getComunaById, getComunasByRegion, createComuna, updateComuna, deleteComuna } from '../controllers/regionComuna.js';

const router = express.Router();

// Rutas para regiones
router.get('/regiones', getRegiones);  // Obtener todas las regiones
router.get('/regiones/:id', getRegionById);  // Obtener una región por ID
router.post('/regiones', createRegion);  // Crear una nueva región
router.put('/regiones/:id', updateRegion);  // Actualizar una región por ID
router.delete('/regiones/:id', deleteRegion);  // Eliminar una región por ID

// Rutas para comunas
router.get('/comunas', getComunas);  // Obtener todas las comunas
router.get('/comunas/:id', getComunaById);  // Obtener una comuna por ID
router.get('/comunasregion/:id', getComunasByRegion);  // Obtener todas las comunas por ID de región
router.post('/comunas', createComuna);  // Crear una nueva comuna
router.put('/comunas/:id', updateComuna);  // Actualizar una comuna por ID
router.delete('/comunas/:id', deleteComuna);  // Eliminar una comuna por ID

export default router;
