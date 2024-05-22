import supabase from '../database/connection.js';

// Obtener todos los clientes
export const getClientes = async (req, res) => {
    const { data, error } = await supabase
        .from('CLIENTE')
        .select('*');  // Asegura seleccionar todos los campos

    if (error) return res.status(400).json({ error });
    return res.json(data);
};

// Obtener un cliente por ID
export const getClienteById = async (req, res) => {
    const { id } = req.params;  // Asegúrate de que el parámetro ID coincida con tu routing
    const { data, error } = await supabase
        .from('cliente')
        .select('*')
        .eq('run_cliente', id)  // Usamos 'run_cliente' como la clave primaria si es la que identifica unívocamente a los clientes
        .single();

    if (error) return res.status(400).json({ error });
    return res.json(data);
};

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
    const { run_cliente,dv_run, nombre_cliente, direccion_cliente, contacto, url_imagen } = req.body;
    const { data, error } = await supabase
        .from('CLIENTE')
        .insert([{ run_cliente, dv_run, nombre_cliente, direccion_cliente, contacto, url_imagen }]);

    if (error) return res.status(400).json({ error });
    return res.status(201).json(data);
};

// Actualizar un cliente
export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { dv_run, nombre_cliente, direccion_cliente, contacto_cliente, url_imagen } = req.body;
    const { data, error } = await supabase
        .from('cliente')
        .update({ dv_run, nombre_cliente, direccion_cliente, contacto_cliente, url_imagen })
        .match({ run_cliente: id });  // Asumiendo 'run_cliente' como clave

    if (error) return res.status(400).json({ error });
    return res.json(data);
};

// Eliminar un cliente
export const deleteCliente = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('cliente')
        .delete()
        .match({ run_cliente: id });  // Asumiendo 'run_cliente' como clave

    if (error) return res.status(400).json({ error });
    return res.json(data);
};