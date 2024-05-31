import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api', // Asegúrate de que esta sea la URL correcta
    headers: {
        'Content-Type': 'application/json'
    }
});

// Insertar orden de trabajo
export const insertarOrdenTrabajo = async (ordenTrabajo) => {
    try {
        const response = await apiClient.post('/orden_trabajo', ordenTrabajo);
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al insertar la orden de trabajo:', error.message);
        throw error; // Lanza el error para que el componente que llama pueda manejarlo
    }
};

export const obtenerClientes = async () => {
    try {
        const response = await apiClient.get('/clientes');
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al obtener los clientes:', error.message);
        return []; // Retorna un array vacío en caso de error
    }
};

export const obtenerEmpleados = async () => {
    try {
        const response = await apiClient.get('/empleados');
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al obtener los clientes:', error.message);
        return []; // Retorna un array vacío en caso de error
    }
};
// Subir imagen
export const subirImagen = async (file, folder = 'img1') => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await apiClient.post(`/subirImagen/${folder}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al subir la imagen:', error.message);
        throw error; // Lanza el error para que el componente que llama pueda manejarlo
    }
};