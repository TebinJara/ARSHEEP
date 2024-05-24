import supabase from '../database/connection.js';

// Obtener todos los clientes
export const getClientes = async (req, res) => {
    const { data, error } = await supabase
        .from('CLIENTE')
        .select('*');

    if (error) return res.status(400).json({ error });
    return res.json(data);
};

// Obtener un cliente por ID
export const getClienteById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('CLIENTE')
        .select('*')
        .eq('run_cliente', id)
        .single();

    if (error) return res.status(400).json({ error });
    return res.json(data);
};

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
    const { run_cliente, dv_run_cliente, nombre_cliente, direccion_cliente, url_imagen_cliente, numtelefono_cliente, numtelefono2_cliente, email_cliente, fecha_contrato_inicio, fecha_contrato_termino_cliente, fecha_creacion_cliente } = req.body;

    const { data, error } = await supabase
        .from('CLIENTE')
        .insert([{
            run_cliente,
            dv_run_cliente,
            nombre_cliente,
            direccion_cliente,
            url_imagen_cliente,
            numtelefono_cliente,
            numtelefono2_cliente,
            email_cliente,
            fecha_contrato_inicio,
            fecha_contrato_termino_cliente,
            fecha_creacion_cliente
        }]);

    if (error) return res.status(400).json({ error });
    return res.json(data);
};

// Actualizar un cliente
export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { dv_run_cliente, nombre_cliente, direccion_cliente, url_imagen_cliente, numtelefono_cliente, numtelefono2_cliente, email_cliente, fecha_contrato_inicio, fecha_contrato_termino_cliente, fecha_creacion_cliente } = req.body;

    const { data, error } = await supabase
        .from('CLIENTE')
        .update({
            dv_run_cliente,
            nombre_cliente,
            direccion_cliente,
            url_imagen_cliente,
            numtelefono_cliente,
            numtelefono2_cliente,
            email_cliente,
            fecha_contrato_inicio,
            fecha_contrato_termino_cliente,
            fecha_creacion_cliente
        })
        .eq('run_cliente', id);

    if (error) return res.status(400).json({ error });
    return res.json(data);
};

// Eliminar un cliente
export const deleteCliente = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('CLIENTE')
        .delete()
        .match({ run_cliente: id });

    if (error) return res.status(400).json({ error });
    return res.json(data);
};