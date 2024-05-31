import supabase from '../database/connection.js';

export const getEmpleados = async (req, res) => {
    const { data, error } = await supabase
        .from('EMPLEADO')
        .select('*');

    if (error) return res.status(400).json({ error });
    return res.json(data);
};