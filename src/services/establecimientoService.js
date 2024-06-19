import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/establecimientos', // Base URL del backend para ESTABLECIMIENTO
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener todos los establecimientos
export const getEstablecimientos = async () => {
    try {
        const response = await api.get('/establecimientos');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los establecimientos:', error.message);
        return [];
    }
};

// Obtener un establecimiento por ID
export const getEstablecimientoById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el establecimiento por ID:', error.message);
        return null;
    }
};

// Crear un nuevo establecimiento
export const createEstablecimiento = async (establecimientoData) => {
    try {
        const response = await api.post('/', establecimientoData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el establecimiento:', error.message);
        return null;
    }
};

// Actualizar un establecimiento por ID
export const updateEstablecimiento = async (id, establecimientoData) => {
    try {
        const response = await api.put(`/${id}`, establecimientoData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el establecimiento:', error.message);
        return null;
    }
};

// Eliminar un establecimiento por ID
export const deleteEstablecimiento = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el establecimiento:', error.message);
        return null;
    }
};
