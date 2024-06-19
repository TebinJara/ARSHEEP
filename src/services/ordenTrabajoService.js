import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/ot', // Base URL del backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener todas las órdenes de trabajo
export const getOrdenesTrabajo = async () => {
    try {
        const response = await api.get('/ordenestrabajo');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las órdenes de trabajo:', error.message);
        return [];
    }
};

// Obtener una orden de trabajo por ID
export const getOrdenTrabajoById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la orden de trabajo por ID:', error.message);
        return null;
    }
};

// Crear una nueva orden de trabajo
export const createOrdenTrabajo = async (ordenTrabajoData) => {
    try {
        const response = await api.post('/ordenestrabajo', ordenTrabajoData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la orden de trabajo:', error.message);
        return null;
    }
};

// Actualizar una orden de trabajo por ID
export const updateOrdenTrabajo = async (id, ordenTrabajoData) => {
    try {
        const response = await api.put(`/${id}`, ordenTrabajoData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la orden de trabajo:', error.message);
        return null;
    }
};

// Eliminar una orden de trabajo por ID
export const deleteOrdenTrabajo = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la orden de trabajo:', error.message);
        return null;
    }
};
