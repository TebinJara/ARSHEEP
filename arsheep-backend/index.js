// Este archivo es el punto de entrada para una aplicación de Node.js que utiliza Express.js. 
// Configura un servidor básico que escucha en el puerto 3001 y utiliza middlewares para 
// manejar CORS y JSON. También define dos conjuntos de rutas: una para usuarios y otra para clientes.

// Importación del módulo Express
import express from 'express';
// Importación del módulo CORS para permitir solicitudes de diferentes dominios
import cors from 'cors';
// Importación de las rutas de usuarios desde un archivo separado
import usuarioRoutes from './routes/usuario.js';
// Importación de las rutas de clientes desde un archivo separado
import clienteRoutes from './routes/cliente.js';

// Inicialización de la aplicación Express
const app = express();
// Definición del puerto en el que el servidor escuchará
const puerto = 3001;

// Uso del middleware CORS para permitir solicitudes de diferentes dominios
app.use(cors());
// Uso del middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Definición de las rutas para usuarios, prefijadas con '/api/usuarios'
app.use('/api/usuarios', usuarioRoutes);
// Definición de las rutas para clientes, prefijadas con '/api/clientes'
app.use('/api/clientes', clienteRoutes);

// Inicio del servidor y escucha en el puerto definido
app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});