import supabase from '../database/connection.js';

// Obtener un tipo cliente por ID
export const getTipoClienteById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('TIPO_CLIENTE')
        .select('*')
        .eq('id_tipo_cliente', id)
        .single();

    if (error) return res.status(400).json({ error });
    return res.json(data);
};
