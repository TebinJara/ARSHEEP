// index.js
import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuario.js';
import clienteRoutes from './routes/cliente.js';
import otRouter from './routes/ot.js';
import empleadoRouter from './routes/empleadoroute.js';
import regionComunaRoutes from './routes/regionComuna.js';
import bodyParser from 'body-parser'; 



const app = express();
const puerto = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/api/empleados', empleadoRouter);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/orden_trabajo', otRouter);
app.use('/api', regionComunaRoutes); 

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});