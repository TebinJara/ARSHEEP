import supabase from '../database/connection.js';

export const obtenerOT = async (req, res) => {
    const { data, error } = await supabase
        .from('ORDEN_TRABAJO')
        .select('*');

    if (error) return res.status(400).json({ error });
    return res.json(data);
};

export const obtenerOTPorId = async (req, res) => {
    const { id_ot } = req.params;

    const { data, error } = await supabase
        .from('ORDEN_TRABAJO')
        .select('*')
        .eq('id_ot', id_ot);

    if (error) return res.status(400).json({ error });
    return res.json(data);
};

export const insertarOrdenTrabajo = async (req, res) => {
    try {
        const {
            descripcion,
            status,
            fecha_creacion,
            fecha_vencimiento,
            prioridad,
            adicional,
            numrun_cliente,
            id_empleado
        } = req.body;

        const { data, error } = await supabase
            .from('ORDEN_TRABAJO')
            .insert([{
                descripcion,
                status,
                fecha_creacion,
                fecha_vencimiento,
                prioridad,
                adicional,
                numrun_cliente,
                id_empleado
            }]);

        if (error) throw error;
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
