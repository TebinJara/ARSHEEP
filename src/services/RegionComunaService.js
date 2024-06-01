import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Asegúrate de que esta sea la URL correcta
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener todas las regiones
export const obtenerRegiones = async () => {
    try {
        const response = await api.get('/regiones');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las regiones:', error.message);
        return [];
    }
};

// Obtener comunas por ID de región
export const obtenerComunasPorRegion = async (id_region) => {
    try {
        const response = await api.get(`/regiones/${id_region}/comunas`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las comunas:', error.message);
        return [];
    }
};

// Obtener una región por ID
export const obtenerRegionPorId = async (id) => {
    try {
        const response = await api.get(`/regiones/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la región por ID:', error.message);
        return null;
    }
};

// Obtener una comuna por ID
export const obtenerComunaPorId = async (id) => {
    try {
        const response = await api.get(`/comunas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la comuna por ID:', error.message);
        return null;
    }
};