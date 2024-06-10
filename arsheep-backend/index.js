import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usuarioRoutes from './routes/usuario.js';
import clienteRoutes from './routes/cliente.js';
import tipoClienteRoutes from './routes/tipoCliente.js';
import otRoutes from './routes/ot.js';
import empleadoRouter from './routes/empleadoroute.js';
import regionComunaRoutes from './routes/regionComuna.js';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const puerto = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.use('/api/empleados', empleadoRouter);
app.get('/api/empleados', empleadoRouter);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/tipoCliente', tipoClienteRoutes);
app.use('/api/orden_trabajo', otRoutes);
app.use('/api', regionComunaRoutes);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});

//pa que le aparezca a la eve