// visitaTecnicaRoutes.js
import express from 'express';
import { createVisitaTecnica, getVisitasTecnicas, getVisitaTecnicaById, updateVisitaTecnica, deleteVisitaTecnica } from '../controllers/visitaTecnicaController.js';

const router = express.Router();

router.post('/', createVisitaTecnica);
router.get('/', getVisitasTecnicas);
router.get('/:id', getVisitaTecnicaById);
router.put('/:id', updateVisitaTecnica);
router.delete('/:id', deleteVisitaTecnica);

export default router;
