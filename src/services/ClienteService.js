import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/clientes', // Base URL del backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener todos los clientes con relaciones
export const getClientes = async () => {
    try {
        const response = await api.get('/clientes');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los clientes:', error.message);
        return [];
    }
};

// Obtener todos los tipos declientes con relaciones
export const getTiposClientes = async () => {
    try {
        const response = await api.get('/tiposclientes');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los tipos de clientes:', error.message);
        return [];
    }
};

// Obtener un cliente por ID con relaciones
export const getClienteById = async (id) => {
    try {
        const response = await api.get(`/clientes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el cliente por ID:', error.message);
        return null;
    }
};

// Crear un nuevo cliente
export const createCliente = async (clienteData) => {
    try {
        const response = await api.post('/clientes', clienteData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el cliente:', error.message);
        return null;
    }
};

// Actualizar un cliente por ID
export const updateCliente = async (id, clienteData) => {
    try {
        const response = await api.put(`/clientes/${id}`, clienteData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el cliente:', error.message);
        return null;
    }
};

// Eliminar un cliente por ID
export const deleteCliente = async (id) => {
    try {
        const response = await api.delete(`/clientes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el cliente:', error.message);
        return null;
    }
};

export const subirImgenCliente = async (formData) => {
    try {
        const response = await api.post('/uploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al subir la imagen del cliente:', error.message);
        return null; // Retorna null en caso de error
    }
};