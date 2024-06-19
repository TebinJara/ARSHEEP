import express from 'express';
import multer from 'multer';
import { createCliente, getClientes, getClienteById, updateCliente, deleteCliente, getTiposClientes, uploadImage } from '../controllers/clienteController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/clientes', createCliente);  // Crear un nuevo cliente
router.get('/clientes', getClientes);  // Obtener todos los clientes con relaciones
router.get('/tiposclientes', getTiposClientes);  // Obtener todos los clientes con relaciones
router.get('/clientes/:id', getClienteById);  // Obtener un cliente por ID con relaciones
router.put('/clientes/:id', updateCliente);  // Actualizar un cliente por ID
router.delete('/clientes/:id', deleteCliente);  // Eliminar un cliente por ID
router.post('/uploadImage', upload.single('image'), uploadImage);

export default router;
