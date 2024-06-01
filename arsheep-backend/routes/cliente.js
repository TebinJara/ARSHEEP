import express from 'express';
import multer from 'multer';
import { getClientes, getClienteById, createCliente, updateCliente, deleteCliente,getTipoClienteById } from '../controllers/cliente.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/', upload.single('imagen_cliente'), createCliente);
router.put('/:id', upload.single('imagen_cliente'), updateCliente);
router.delete('/:id', deleteCliente);
router.get('/:idTipoCliente', getTipoClienteById);

export default router;