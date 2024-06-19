import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/visitastecnicas', // Base URL del backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener todas las visitas técnicas
export const getVisitasTecnicas = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las visitas técnicas:', error.message);
        return [];
    }
};

// Obtener una visita técnica por ID
export const getVisitaTecnicaById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la visita técnica por ID:', error.message);
        return null;
    }
};

// Crear una nueva visita técnica
export const createVisitaTecnica = async (visitaTecnicaData) => {
    try {
        const response = await api.post('/', visitaTecnicaData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la visita técnica:', error.message);
        return null;
    }
};

// Actualizar una visita técnica por ID
export const updateVisitaTecnica = async (id, visitaTecnicaData) => {
    try {
        const response = await api.put(`/${id}`, visitaTecnicaData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la visita técnica:', error.message);
        return null;
    }
};

// Eliminar una visita técnica por ID
export const deleteVisitaTecnica = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la visita técnica:', error.message);
        return null;
    }
};
