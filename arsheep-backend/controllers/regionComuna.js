import supabase from '../database/connection.js';

// Obtener todas las regiones
export const getRegiones = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('REGION')
            .select('*');

        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: 'No se encontraron regiones.' });
        
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error al obtener las regiones:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener una región por ID
export const getRegionById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de región es requerido' });

        const { data, error } = await supabase
            .from('REGION')
            .select('*')
            .eq('id_region', id)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Región no encontrada' });

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error al obtener la región por ID:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener las comunas por ID de región
export const getComunasByRegion = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de región es requerido' });

        const { data, error } = await supabase
            .from('COMUNA')
            .select('*')
            .eq('id_region', id);

        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: 'No se encontraron comunas para esta región.' });

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error al obtener las comunas por ID de región:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener una comuna por ID
export const getComunaById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de comuna es requerido' });

        const { data, error } = await supabase
            .from('COMUNA')
            .select('*')
            .eq('id_comuna', id)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Comuna no encontrada' });

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error al obtener la comuna por ID:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
