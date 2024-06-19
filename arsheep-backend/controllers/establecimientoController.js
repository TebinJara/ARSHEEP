import supabase from '../database/connection.js';

// Crear un establecimiento
export const createEstablecimiento = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('ESTABLECIMIENTO')
            .insert([req.body]);

        if (error) throw error;

        return res.status(201).json(data);
    } catch (error) {
        console.error('Error al crear el establecimiento:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todos los establecimientos
export const getEstablecimientos = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('ESTABLECIMIENTO')
            .select(`
                *
            `)
            .order('nombre_establecimiento', { ascending: true });

        if (error) return res.status(400).json({ error });
        return res.json(data);
    } catch (error) {
        console.error('Error al obtener los establecimientos:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un establecimiento por ID
export const getEstablecimientoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de establecimiento es requerido' });

        const { data, error } = await supabase
            .from('ESTABLECIMIENTO')
            .select('*')
            .eq('id_establecimiento', id)
            .single();

        if (error) return res.status(400).json({ error });
        if (!data) return res.status(404).json({ error: 'Establecimiento no encontrado' });

        return res.json(data);
    } catch (error) {
        console.error('Error al obtener el establecimiento por ID:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar un establecimiento
export const updateEstablecimiento = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de establecimiento es requerido' });

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Datos de establecimiento son requeridos' });
        }

        const { data, error } = await supabase
            .from('ESTABLECIMIENTO')
            .update(req.body)
            .eq('id_establecimiento', id)
            .select('*');

        if (error) {
            console.error('Error en la consulta a la base de datos:', error);
            return res.status(400).json({ error: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Establecimiento no encontrado' });
        }

        return res.json(data[0]);
    } catch (error) {
        console.error('Error al actualizar el establecimiento:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un establecimiento
export const deleteEstablecimiento = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de establecimiento es requerido' });

        const { data, error } = await supabase
            .from('ESTABLECIMIENTO')
            .delete()
            .eq('id_establecimiento', id);

        if (error) return res.status(400).json({ error });
        if (!data) return res.status(404).json({ error: 'Establecimiento no encontrado' });

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar el establecimiento:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
