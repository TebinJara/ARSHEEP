// tipoMantenimientoService.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/tipomantenimientos', // Base URL del backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener todos los tipos de mantenimiento
export const getTiposMantenimiento = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los tipos de mantenimiento:', error.message);
        return [];
    }
};

// Obtener un tipo de mantenimiento por ID
export const getTipoMantenimientoById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el tipo de mantenimiento por ID:', error.message);
        return null;
    }
};

// Crear un nuevo tipo de mantenimiento
export const createTipoMantenimiento = async (tipoMantenimientoData) => {
    try {
        const response = await api.post('/', tipoMantenimientoData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el tipo de mantenimiento:', error.message);
        return null;
    }
};

// Actualizar un tipo de mantenimiento por ID
export const updateTipoMantenimiento = async (id, tipoMantenimientoData) => {
    try {
        const response = await api.put(`/${id}`, tipoMantenimientoData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el tipo de mantenimiento:', error.message);
        return null;
    }
};

// Eliminar un tipo de mantenimiento por ID
export const deleteTipoMantenimiento = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el tipo de mantenimiento:', error.message);
        return null;
    }
};
