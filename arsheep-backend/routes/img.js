import express from 'express';
import { subirImagen } from '../controllers/imgController.js';

const router = express.Router();

router.post('/subir', subirImagen);

export default router;