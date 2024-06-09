import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api', // Asegúrate de que esta sea la URL correcta
    headers: {
        'Content-Type': 'application/json'
    }
});

export const obtenerUsuario = async () => {
    try {
        const response = await apiClient.get('/usuarios');
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        return []; // Retorna un array vacío en caso de error
    }
};

