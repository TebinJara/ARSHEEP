import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api', // Asegúrate de que esta sea la URL correcta
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener un cliente por ID
export const obtenerTipoClientePorId = async (id) => {
    try {
        const response = await apiClient.get(`/tipoCliente/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el cliente por ID:', error.message);
        return null;
    }
};