import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/empresas', // Base URL del backend para EMPRESA
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener todas las empresas
export const getEmpresas = async () => {
    try {
        const response = await api.get('/empresas');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las empresas:', error.message);
        return [];
    }
};

// Obtener una empresa por ID
export const getEmpresaById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la empresa por ID:', error.message);
        return null;
    }
};

// Crear una nueva empresa
export const createEmpresa = async (empresaData) => {
    try {
        const response = await api.post('/', empresaData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la empresa:', error.message);
        return null;
    }
};

// Actualizar una empresa por ID
export const updateEmpresa = async (id, empresaData) => {
    try {
        const response = await api.put(`/${id}`, empresaData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la empresa:', error.message);
        return null;
    }
};

// Eliminar una empresa por ID
export const deleteEmpresa = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la empresa:', error.message);
        return null;
    }
};
