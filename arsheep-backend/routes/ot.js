import express from 'express';
import multer from 'multer';
import { insertarOrdenTrabajo} from '../controllers/ordenTrabajoController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// router.post('/', upload.fields([
//     { name: 'imagen_1', maxCount: 1 },
//     { name: 'imagen_2', maxCount: 1 },
//     { name: 'imagen_3', maxCount: 1 },
//     { name: 'imagen_4', maxCount: 1 }
// ]), handleInsertarOrdenTrabajo);
router.post('/', insertarOrdenTrabajo);
export default router;
//cambio para funcion backend