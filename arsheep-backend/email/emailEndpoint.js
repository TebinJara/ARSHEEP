import express from 'express';
import enviarCorreo from './email.js';
import cors from 'cors';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/enviar-correo', (req, res) => {
    const { destinatario, asunto, texto } = req.body;

    console.log('Solicitud recibida para enviar correo a:', destinatario);

    if (!destinatario || !asunto || !texto) {
        console.error('Faltan parámetros en la solicitud');
        return res.status(400).send('Faltan parámetros en la solicitud');
    }

    enviarCorreo(destinatario, asunto, texto);

    res.status(200).send('Correo enviado');
});

export default router;
