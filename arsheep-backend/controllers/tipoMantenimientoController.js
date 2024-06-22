// tipoMantenimientoController.js
import supabase from '../database/connection.js';

// Crear un tipo de mantenimiento
export const createTipoMantenimiento = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('TIPO_MANTENIMIENTO')
            .insert([req.body]);

        if (error) throw error;

        return res.status(201).json(data);
    } catch (error) {
        console.error('Error al crear el tipo de mantenimiento:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todos los tipos de mantenimiento                 
export const getTiposMantenimiento = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('TIPO_MANTENIMIENTO')
            .select(`
                id_tipo_mantenimiento,
                desc_tipo_mantenimiento
            `)
            .order('id_tipo_mantenimiento', { ascending: true });

        if (error) return res.status(400).json({ error });
        return res.json(data);
    } catch (error) {
        console.error('Error al obtener los tipos de mantenimiento:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un tipo de mantenimiento por ID
export const getTipoMantenimientoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de tipo de mantenimiento es requerido' });

        const { data, error } = await supabase
            .from('TIPO_MANTENIMIENTO')
            .select('*')
            .eq('id_tipo_mantenimiento', id)
            .single();

        if (error) return res.status(400).json({ error });
        if (!data) return res.status(404).json({ error: 'Tipo de mantenimiento no encontrado' });

        return res.json(data);
    } catch (error) {
        console.error('Error al obtener el tipo de mantenimiento por ID:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar un tipo de mantenimiento
export const updateTipoMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de tipo de mantenimiento es requerido' });

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Datos de tipo de mantenimiento son requeridos' });
        }

        const { data, error } = await supabase
            .from('TIPO_MANTENIMIENTO')
            .update(req.body)
            .eq('id_tipo_mantenimiento', id)
            .select('*');

        if (error) {
            console.error('Error en la consulta a la base de datos:', error);
            return res.status(400).json({ error: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Tipo de mantenimiento no encontrado' });
        }

        return res.json(data[0]);
    } catch (error) {
        console.error('Error al actualizar el tipo de mantenimiento:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un tipo de mantenimiento
export const deleteTipoMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de tipo de mantenimiento es requerido' });

        const { data, error } = await supabase
            .from('TIPO_MANTENIMIENTO')
            .delete()
            .eq('id_tipo_mantenimiento', id);

        if (error) return res.status(400).json({ error });
        if (!data) return res.status(404).json({ error: 'Tipo de mantenimiento no encontrado' });

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar el tipo de mantenimiento:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
