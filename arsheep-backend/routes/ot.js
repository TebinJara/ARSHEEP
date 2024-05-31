import express from 'express';
import multer from 'multer';
import { handleInsertarOrdenTrabajo } from '../controllers/ordenTrabajoController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/api/ordenTrabajo', upload.fields([
    { name: 'imagen_1', maxCount: 1 },
    { name: 'imagen_2', maxCount: 1 },
    { name: 'imagen_3', maxCount: 1 },
    { name: 'imagen_4', maxCount: 1 }
]), handleInsertarOrdenTrabajo);

export default router;
//cambio para funcion backend