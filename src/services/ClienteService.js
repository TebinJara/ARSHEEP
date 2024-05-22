import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api', // 
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener todos los clientes
export const obtenerClientes = async () => {
    try {
        const response = await apiClient.get('/clientes');
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al obtener los clientes:', error.message);
        return []; // Retorna un array vacío en caso de error
    }
};

// Obtener un cliente por ID
export const obtenerClientePorId = async (id) => {
    try {
        const response = await apiClient.get(`/clientes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el cliente por ID:', error.message);
        return null;
    }
};

// Crear un nuevo cliente
export const crearCliente = async (cliente) => {
    try {
        const response = await apiClient.post('/clientes', cliente);
        return response.data;
    } catch (error) {
        console.error('Error al crear un cliente:', error.message);
        return null;
    }
};

// Actualizar un cliente
export const actualizarCliente = async (id, cliente) => {
    try {
        const response = await apiClient.put(`/clientes/${id}`, cliente);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el cliente:', error.message);
        return null;
    }
};

// Eliminar un cliente
export const eliminarCliente = async (id) => {
    try {
        const response = await apiClient.delete(`/clientes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el cliente:', error.message);
        return null;
    }
};