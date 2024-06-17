import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/regionComuna', // Asegúrate de que esta sea la URL correcta
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener todas las regiones
export const getRegiones = async () => {
    try {
        const response = await api.get('/regiones');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las regiones:', error.message);
        return [];
    }
};

// Obtener una región por ID
export const getRegionById = async (id) => {
    try {
        const response = await api.get(`/regiones/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la región por ID:', error.message);
        return null;
    }
};

// Crear una nueva región
export const createRegion = async (desc_region) => {
    try {
        const response = await api.post('/regiones', { desc_region });
        return response.data;
    } catch (error) {
        console.error('Error al crear la región:', error.message);
        return null;
    }
};

// Actualizar una región por ID
export const updateRegion = async (id, desc_region) => {
    try {
        const response = await api.put(`/regiones/${id}`, { desc_region });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la región:', error.message);
        return null;
    }
};

// Eliminar una región por ID
export const deleteRegion = async (id) => {
    try {
        const response = await api.delete(`/regiones/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la región:', error.message);
        return null;
    }
};

// Obtener todas las comunas
export const getComunas = async () => {
    try {
        const response = await api.get('/comunas');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las comunas:', error.message);
        return [];
    }
};

// Obtener una comuna por ID
export const getComunaById = async (id) => {
    try {
        const response = await api.get(`/comunas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la comuna por ID:', error.message);
        return null;
    }
};

// Obtener todas las comunas por ID de región
export const getComunasByRegion = async (id_region) => {
    try {
        const response = await api.get(`/comunasregion/${id_region}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las comunas por ID de región:', error.message);
        return [];
    }
};

// Crear una nueva comuna
export const createComuna = async (desc_comuna, id_region) => {
    try {
        const response = await api.post('/comunas', { desc_comuna, id_region });
        return response.data;
    } catch (error) {
        console.error('Error al crear la comuna:', error.message);
        return null;
    }
};

// Actualizar una comuna por ID
export const updateComuna = async (id, desc_comuna, id_region) => {
    try {
        const response = await api.put(`/comunas/${id}`, { desc_comuna, id_region });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la comuna:', error.message);
        return null;
    }
};

// Eliminar una comuna por ID
export const deleteComuna = async (id) => {
    try {
        const response = await api.delete(`/comunas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la comuna:', error.message);
        return null;
    }
};
