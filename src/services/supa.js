import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
   "https://niqxbeaxtqofvrboxnzb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcXhiZWF4dHFvZnZyYm94bnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NTMyMDksImV4cCI6MjAzMDQyOTIwOX0.k025dPkt6rB55YNbs1elSUr-Zoi1CF5Of_HDOV3OENc"
);

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

// Función obtener datos usuario
export const obtenerUsuario = async () => {
    try {        
        const { data, error } = await supabase
            .from('USUARIO')
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
