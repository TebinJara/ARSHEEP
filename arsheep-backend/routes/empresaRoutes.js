import express from 'express';
import { createEmpresa, getEmpresas, getEmpresaById, updateEmpresa, deleteEmpresa } from '../controllers/empresaController.js';

const router = express.Router();

// Rutas para las operaciones CRUD de EMPRESA
router.post('/empresas', createEmpresa);  // Crear una nueva empresa
router.get('/empresas', getEmpresas);  // Obtener todas las empresas
router.get('/empresas/:id', getEmpresaById);  // Obtener una empresa por ID
router.put('/empresas/:id', updateEmpresa);  // Actualizar una empresa por ID
router.delete('/empresas/:id', deleteEmpresa);  // Eliminar una empresa por ID

export default router;
