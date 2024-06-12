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
            }])
            .select('id_ot'); // Añadir select para obtener solo el id_ot

        if (error) throw error;

        // Asegúrate de que data no esté vacío y contiene id_ot
        const id_ot = data[0]?.id_ot;
        if (!id_ot) {
            throw new Error('No se pudo obtener el id_ot');
        }

        return res.json({ id_ot }); // Devolver solo id_ot
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};