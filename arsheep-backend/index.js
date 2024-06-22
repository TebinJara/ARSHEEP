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
import imgRouter from './routes/img.js';
import emailRouter from './email/emailEndpoint.js'; 
import dotenv from 'dotenv';
import usersEmployeesRoutes from './routes/usersEmployeesRoutes.js';
import ordenTrabajo from './routes/ordenTrabajo.js';
import visitaTecnicaRoutes from './routes/visitaTecnicaRoutes.js';
import empresaRoutes from './routes/empresaRoutes.js'; 
import establecimientoRoutes from './routes/establecimientoRoutes.js';
import tipoMantenimientoRoutes from './routes/tipoMantenimientoRoutes.js';
import presupuestoVtRoutes from './routes/presupuestoVtRoutes.js';

dotenv.config();

const app = express();
const puerto = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Rutas públicas
app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadoRouter);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/tipoCliente', tipoClienteRoutes);
app.use('/api/orden_trabajo', otRoutes);
app.use('/api/ot', ordenTrabajo);
app.use('/api/regionComuna', regionComunaRoutes);
app.use('/api/img', imgRouter);
app.use('/api/usersEmployees', usersEmployeesRoutes);
app.use('/api/visitastecnicas', visitaTecnicaRoutes);
app.use('/api/empresas', empresaRoutes);
app.use('/api/establecimientos', establecimientoRoutes);
app.use('/api/tipomantenimientos', tipoMantenimientoRoutes);
app.use('/api/presupuestosvt', presupuestoVtRoutes);
app.use(emailRouter);




app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
