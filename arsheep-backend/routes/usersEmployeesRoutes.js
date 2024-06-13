import express from 'express';
import multer from 'multer';
import { getUsuariosEmpleados, updateEstadoUsuario,uploadImage, getUsuarioEmpleadoPorId } from '../controllers/usersEmployeesController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getUsuariosEmpleados);
router.get('/getUsuarioEmpleadoPorId/:id_usuario', getUsuarioEmpleadoPorId);
router.put('/cambiarEstadoUsuario', updateEstadoUsuario);
router.post('/uploadImage', upload.single('image'), uploadImage);

export default router;
