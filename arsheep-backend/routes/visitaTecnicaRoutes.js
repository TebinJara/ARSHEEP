import express from 'express';
import multer from 'multer';
import { createVisitaTecnica, getVisitasTecnicas, getVisitaTecnicaById, updateVisitaTecnica, deleteVisitaTecnica, uploadPdf } from '../controllers/visitaTecnicaController.js';

const router = express.Router();

// Configurar multer para manejar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', createVisitaTecnica);
router.get('/', getVisitasTecnicas);
router.get('/:id', getVisitaTecnicaById);
router.put('/:id', updateVisitaTecnica);
router.delete('/:id', deleteVisitaTecnica);

// Usar multer para manejar la subida de archivos en la ruta uploadPdf
router.post('/uploadPdf', upload.single('file'), uploadPdf);

export default router;