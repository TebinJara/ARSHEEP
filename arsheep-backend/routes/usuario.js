// routes/usuario.js
import express from 'express';
import { obtenerUsuarios, agregarUsuario } from '../controllers/usuario.js';

const router = express.Router();

router.get('/', obtenerUsuarios);
router.post('/', agregarUsuario);

export default router;