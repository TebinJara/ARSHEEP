import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/empleados', // Base URL del backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener todos los empleados
export const getEmpleados = async () => {
    try {
        const response = await api.get('/empleados');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los empleados:', error.message);
        return [];
    }
};

// Obtener un empleado por ID
export const getEmpleadoById = async (id) => {
    try {
        const response = await api.get(`/empleados/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el empleado por ID:', error.message);
        return null;
    }
};

// Crear un nuevo empleado
export const createEmpleado = async (empleadoData) => {
    try {
        const response = await api.post('/empleados', empleadoData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el empleado:', error.message);
        return null;
    }
};

// Actualizar un empleado por ID
export const updateEmpleado = async (id, empleadoData) => {
    try {
        const response = await api.put(`/empleados/${id}`, empleadoData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el empleado:', error.message);
        return null;
    }
};

// Eliminar un empleado por ID
export const deleteEmpleado = async (id) => {
    try {
        const response = await api.delete(`/empleados/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el empleado:', error.message);
        return null;
    }
};
