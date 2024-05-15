import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY 
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
