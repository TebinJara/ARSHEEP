import { createClient } from '@supabase/supabase-js'
import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/usuarios'; // Asegúrate de que la URL es correcta


export const supabase = createClient(
   "https://niqxbeaxtqofvrboxnzb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcXhiZWF4dHFvZnZyYm94bnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NTMyMDksImV4cCI6MjAzMDQyOTIwOX0.k025dPkt6rB55YNbs1elSUr-Zoi1CF5Of_HDOV3OENc"
);

export const obtenerUsuario = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return []; // Retorna un array vacío en caso de error
    }
};

// Función obtener datos clientes
export const obtenerClientes = async () => {
    try {        
        const { data, error } = await supabase
            .from('CLIENTE')
            .select('*'); // Seleccionar todos los campos

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error al obtener los datos de la tabla de clientes:', error.message);
        return null;
    }
};


export const obtenerOrdenesDeTrabajo = async () => {
    try {
        let { data, error } = await supabase
            .from('ORDEN_TRABAJO') // Nombre de la tabla en tu base de datos
            .select('*');
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al obtener órdenes de trabajo:', error);
        return null;
    }
};
export const obtenerEmpleadoPorId = async (idEmpleado) => {
    try {
        const { data, error } = await supabase
            .from('EMPLEADO')
            .select('id_empleado, pnombre, snombre, apaterno, amaterno')
            .eq('id_empleado', idEmpleado)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al obtener el empleado por ID:', error);
        return null;
    }
};

export const obtenerStatusPorId = async (idStatus) => {
    try {
        const { data, error } = await supabase
            .from('TIPO_STATUS')
            .select('*')
            .eq('status', idStatus)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al obtener el status por ID:', error);
        return null;
    }
};