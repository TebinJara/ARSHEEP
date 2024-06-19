import express from 'express';
import multer from 'multer';
import { createEmpleado, getEmpleados, getEmpleadoById, updateEmpleado, deleteEmpleado } from '../controllers/empleadoController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/empleados', createEmpleado);  // Crear un nuevo empleado
router.get('/empleados', getEmpleados);  // Obtener todos los empleados
router.get('/empleados/:id', getEmpleadoById);  // Obtener un empleado por ID
router.put('/empleados/:id', updateEmpleado);  // Actualizar un empleado por ID
router.delete('/empleados/:id', deleteEmpleado);  // Eliminar un empleado por ID

export default router;