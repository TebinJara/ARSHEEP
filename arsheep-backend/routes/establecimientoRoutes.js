import express from 'express';
import { 
    createEstablecimiento, 
    getEstablecimientos, 
    getEstablecimientoById, 
    updateEstablecimiento, 
    deleteEstablecimiento 
} from '../controllers/establecimientoController.js';

const router = express.Router();

// Rutas para las operaciones CRUD de ESTABLECIMIENTO
router.post('/establecimientos', createEstablecimiento);  // Crear un nuevo establecimiento
router.get('/establecimientos', getEstablecimientos);  // Obtener todos los establecimientos
router.get('/establecimientos/:id', getEstablecimientoById);  // Obtener un establecimiento por ID
router.put('/establecimientos/:id', updateEstablecimiento);  // Actualizar un establecimiento por ID
router.delete('/establecimientos/:id', deleteEstablecimiento);  // Eliminar un establecimiento por ID

export default router;
