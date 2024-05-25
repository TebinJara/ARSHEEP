import supabase from '../database/connection.js';
import { v4 as uuidv4 } from 'uuid';


const upload = (req, res) =>{
    return res.status(200).send({
        status:"success",
        message: "Subida de imagenes"
    })
}

// Subir imagen a Supabase
const uploadImage = async (file) => {
    const fileName = `${uuidv4()}.${file.mimetype.split('/')[1]}`;
    const { data, error } = await supabase.storage
        .from('imagen_cliente')
        .upload(fileName, file.buffer);

    if (error) throw error;
    return data.Key;
};

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
    try {
        const {
            run_cliente,
            dv_run_cliente,
            nombre_cliente,
            direccion_cliente,
            numtelefono_cliente,
            numtelefono2_cliente,
            email_cliente,
            fecha_contrato_inicio,
            fecha_contrato_termino_cliente,
            fecha_creacion_cliente
        } = req.body;

        let url_imagen_cliente = '';
        if (req.file) {
            url_imagen_cliente = await uploadImage(req.file);
        }

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

        if (error) throw error;
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Actualizar un cliente
export const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            dv_run_cliente,
            nombre_cliente,
            direccion_cliente,
            numtelefono_cliente,
            numtelefono2_cliente,
            email_cliente,
            fecha_contrato_inicio,
            fecha_contrato_termino_cliente,
            fecha_creacion_cliente
        } = req.body;

        let url_imagen_cliente = req.body.url_imagen_cliente || '';
        if (req.file) {
            url_imagen_cliente = await uploadImage(req.file);
        }

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

        if (error) throw error;
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
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