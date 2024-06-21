import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/enviar-correo', // Base URL del backend
    headers: {
        'Content-Type': 'application/json'
    }
});


export const sendMailOTasignation = async (correo) => {
    try {
        const response = await api.post('/', correo);
        return response.data;
    } catch (error) {
        console.error('Error al enviar correo:', error.message);
        return null;
    }
};