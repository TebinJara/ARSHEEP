// index.js
import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuario.js';
import clienteRoutes from './routes/cliente.js';


const app = express();
const puerto = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clientes', clienteRoutes);

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});