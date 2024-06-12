import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api', // Asegúrate de que esta sea la URL correcta
    headers: {
        'Content-Type': 'application/json'
    }
});

export const obtenerUsuariosEmpleados = async () => {
    try {
        const response = await apiClient.get('/usersEmployees');
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al obtener los usuarios del tipo empelado:', error.message);
        return []; // Retorna un array vacío en caso de error
    }
};

export const obtenerUsuarioEmpleadoPorID = async (id_usuario) => {
    try {
        const response = await apiClient.get(`/usersEmployees/getUsuarioEmpleadoPorId/${id_usuario}`);
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al obtener el usuario por ID:', error.message);
        return null; // Retorna null en caso de error
    }
};

export const cambiarEstadoUsuario = async (id_usuario, nuevo_estado) => {
    try {
        const response = await apiClient.put('usersEmployees/cambiarEstadoUsuario', {
            id_usuario,
            nuevo_estado
        });
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al cambiar el estado del usuario:', error.message);
        return null; // Retorna null en caso de error
    }
};


export const subirImagenUsuarioEmpleado = async (formData) => {
    try {
        const response = await apiClient.post('usersEmployees/uploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al subir la imagen del usuario:', error.message);
        return null; // Retorna null en caso de error
    }
};