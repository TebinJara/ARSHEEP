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

// Crear una nueva región
export const createRegion = async (req, res) => {
    try {
        const { desc_region } = req.body;
        if (!desc_region) return res.status(400).json({ error: 'Descripción de la región es requerida' });

        const { data, error } = await supabase
            .from('REGION')
            .insert([{ desc_region }]);

        if (error) throw error;

        return res.status(201).json(data);
    } catch (error) {
        console.error('Error al crear la región:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar una región por ID
export const updateRegion = async (req, res) => {
    try {
        const { id } = req.params;
        const { desc_region } = req.body;
        if (!id || !desc_region) return res.status(400).json({ error: 'ID de región y descripción son requeridos' });

        const { data, error } = await supabase
            .from('REGION')
            .update({ desc_region })
            .eq('id_region', id);

        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: 'Región no encontrada' });

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error al actualizar la región:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar una región por ID
export const deleteRegion = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de región es requerido' });

        const { data, error } = await supabase
            .from('REGION')
            .delete()
            .eq('id_region', id);

        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: 'Región no encontrada' });

        return res.status(200).json({ message: 'Región eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la región:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todas las comunas
export const getComunas = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('COMUNA')
            .select('*')
            .order('desc_comuna');

        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: 'No se encontraron comunas.' });
        
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error al obtener las comunas:', error.message);
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

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Comuna no encontrada' });

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error al obtener la comuna por ID:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todas las comunas por ID de región
export const getComunasByRegion = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de región es requerido' });

        const { data, error } = await supabase
            .from('COMUNA')
            .select('*')
            .eq('id_region', id)
            .order('desc_comuna');

        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: 'No se encontraron comunas para esta región.' });

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error al obtener las comunas por ID de región:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear una nueva comuna
export const createComuna = async (req, res) => {
    try {
        const { desc_comuna, id_region } = req.body;
        if (!desc_comuna || !id_region) return res.status(400).json({ error: 'Descripción de la comuna e ID de región son requeridos' });

        const { data, error } = await supabase
            .from('COMUNA')
            .insert([{ desc_comuna, id_region }]);

        if (error) throw error;

        return res.status(201).json(data);
    } catch (error) {
        console.error('Error al crear la comuna:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar una comuna por ID
export const updateComuna = async (req, res) => {
    try {
        const { id } = req.params;
        const { desc_comuna, id_region } = req.body;
        if (!id || !desc_comuna || !id_region) return res.status(400).json({ error: 'ID de comuna, descripción e ID de región son requeridos' });

        const { data, error } = await supabase
            .from('COMUNA')
            .update({ desc_comuna, id_region })
            .eq('id_comuna', id);

        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: 'Comuna no encontrada' });

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error al actualizar la comuna:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar una comuna por ID
export const deleteComuna = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de comuna es requerido' });

        const { data, error } = await supabase
            .from('COMUNA')
            .delete()
            .eq('id_comuna', id);

        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: 'Comuna no encontrada' });

        return res.status(200).json({ message: 'Comuna eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la comuna:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};