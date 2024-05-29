import express from 'express';
import { createOrdenTrabajo } from '../controllers/ordenTrabajoController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/api/ordenTrabajo', upload.single('imagen_1'), createOrdenTrabajo);

export default router;
