// presupuestoVtService.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/presupuestosvt', // Base URL del backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener todos los presupuestos VT
export const getPresupuestosVt = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los presupuestos VT:', error.message);
        return [];
    }
};

// Obtener un presupuesto VT por ID
export const getPresupuestoVtById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el presupuesto VT por ID:', error.message);
        return null;
    }
};

// Crear un nuevo presupuesto VT
export const createPresupuestoVt = async (presupuestoVtData) => {
    try {
        const response = await api.post('/', presupuestoVtData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el presupuesto VT:', error.message);
        return null;
    }
};

// Actualizar un presupuesto VT por ID
export const updatePresupuestoVt = async (id, presupuestoVtData) => {
    try {
        const response = await api.put(`/${id}`, presupuestoVtData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el presupuesto VT:', error.message);
        return null;
    }
};

// Eliminar un presupuesto VT por ID
export const deletePresupuestoVt = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el presupuesto VT:', error.message);
        return null;
    }
};

// Obtener un presupuesto VT por ID
export const getPresupuestoVtByIdVt = async (id) => {
    try {
        const response = await api.get(`/vt/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el presupuestos VT por ID de VT:', error.message);
        return null;
    }
};