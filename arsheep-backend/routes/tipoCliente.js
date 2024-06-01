import express from 'express';
import { getTipoClienteById } from '../controllers/tipoCliente.js';

const router = express.Router();

router.get('/:id', getTipoClienteById);

export default router;