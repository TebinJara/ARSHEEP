// presupuestoVtController.js
import supabase from '../database/connection.js';

// Crear un presupuesto VT
export const createPresupuestoVt = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('PRESUPUESTO_VISITA_TECNICA')
            .insert([req.body]);

        if (error) throw error;

        return res.status(201).json(data);
    } catch (error) {
        console.error('Error al crear el presupuesto VT:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todos los presupuestos VT
export const getPresupuestosVt = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('PRESUPUESTO_VISITA_TECNICA')
            .select('*')
            .order('id_presupuesto_vt', { ascending: false });

        if (error) return res.status(400).json({ error });
        return res.json(data);
    } catch (error) {
        console.error('Error al obtener los presupuestos VT:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un presupuesto VT por ID
export const getPresupuestoVtById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de presupuesto VT es requerido' });

        const { data, error } = await supabase
            .from('PRESUPUESTO_VISITA_TECNICA')
            .select('*')
            .eq('id_presupuesto_vt', id)
            .single();

        if (error) return res.status(400).json({ error });
        if (!data) return res.status(404).json({ error: 'Presupuesto VT no encontrado' });

        return res.json(data);
    } catch (error) {
        console.error('Error al obtener el presupuesto VT por ID:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar un presupuesto VT
export const updatePresupuestoVt = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de presupuesto VT es requerido' });

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Datos de presupuesto VT son requeridos' });
        }

        const { data, error } = await supabase
            .from('PRESUPUESTO_VISITA_TECNICA')
            .update(req.body)
            .eq('id_presupuesto_vt', id)
            .select('*');

        if (error) {
            console.error('Error en la consulta a la base de datos:', error);
            return res.status(400).json({ error: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Presupuesto VT no encontrado' });
        }

        return res.json(data[0]);
    } catch (error) {
        console.error('Error al actualizar el presupuesto VT:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un presupuesto VT
export const deletePresupuestoVt = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de presupuesto VT es requerido' });

        const { data, error } = await supabase
            .from('PRESUPUESTO_VISITA_TECNICA')
            .delete()
            .eq('id_presupuesto_vt', id);

        if (error) return res.status(400).json({ error });
        if (!data) return res.status(404).json({ error: 'Presupuesto VT no encontrado' });

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar el presupuesto VT:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const getPresupuestoVtByIdVt = async (req, res) => {
    try {
        const { id_vt } = req.params;
        if (!id_vt) return res.status(400).json({ error: 'ID de presupuesto VT es requerido' });

        const { data, error } = await supabase
            .from('PRESUPUESTO_VISITA_TECNICA')
            .select('*')
            .eq('id_vt', id_vt);

        if (error) {
            console.error('Error al obtener el presupuesto VT:', error.message);
            return res.status(400).json({ error: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Presupuesto VT no encontrado' });
        }

        return res.status(200).json(data); // Devolver como un array
    } catch (error) {
        console.error('Error al obtener el presupuesto VT por ID:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};