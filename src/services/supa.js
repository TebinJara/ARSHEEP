import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supaClient = axios.create({
    baseURL: 'http://localhost:3001/api', // Asegúrate de que esta sea la URL correcta
    headers: {
        'Content-Type': 'application/json'
    }
});
const supabaseUrl = 'https://niqxbeaxtqofvrboxnzb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcXhiZWF4dHFvZnZyYm94bnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NTMyMDksImV4cCI6MjAzMDQyOTIwOX0.k025dPkt6rB55YNbs1elSUr-Zoi1CF5Of_HDOV3OENc';

const supabase = createClient(supabaseUrl, supabaseKey);


export const obtenerUsuario = async () => {
    const { data, error } = await supabase.from('USUARIO').select('*');
    if (error) throw error;
    return data;
};

export const obtenerOrdenesDeTrabajo = async () => {
    const { data, error } = await supabase.from('ORDEN_TRABAJO').select('*');
    if (error) throw error;
    return data;
};

export const obtenerEmpleadoPorId = async (idEmpleado) => {
    const { data, error } = await supabase.from('EMPLEADO').select('*').eq('id_empleado', idEmpleado).single();
    if (error) throw error;
    return data;
};

export const obtenerStatusPorId = async (idStatus) => {
    const { data, error } = await supabase.from('TIPO_STATUS').select('*').eq('status', idStatus).single();
    if (error) throw error;
    return data;
};
//cambio
// Insertar orden de trabajo
export const insertarOrdenTrabajo = async (ordenTrabajo) => {
    try {
        const response = await supaClient.post('/orden_trabajo', ordenTrabajo);
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al insertar la orden de trabajo:', error.message);
        throw error; // Lanza el error para que el componente que llama pueda manejarlo
    }
};

// Obtener todos los empleados
export const obtenerEmpleados = async () => {
    try {
        const response = await supaClient.get('/empleados');
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al obtener los empleados:', error.message);
        return []; // Retorna un array vacío en caso de error
    }
};

// Obtener todos los clientes
export const obtenerClientes = async () => {
    try {
        const response = await supaClient.get('/clientes');
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
        const response = await supaClient.post(`/subirImagen/${folder}`, formData, {
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

export default supaClient;