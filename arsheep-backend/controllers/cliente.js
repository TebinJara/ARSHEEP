import supabase from '../database/connection.js';
import { v4 as uuidv4 } from 'uuid';

const upload = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "Subida de imágenes"
    });
};

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
        .eq('numrun_cliente', id)
        .single();

    if (error) return res.status(400).json({ error });
    return res.json(data);
};

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
    try {
        const {
            numrun_cliente,
            dvrun_cliente,
            pnombre_cliente,
            snombre_cliente,
            appaterno_cliente,
            apmaterno_cliente,
            dirección_cliente,
            email_cliente,
            numtelefono_cliente,
            id_comuna,
            fecnac_cliente,
            id_tipo_cliente,
            razon_social_cliente,
            id_region,
            fec_inicio_contrato_cliente,
            fec_termino_contrato_cliente,
            fec_creacion_cliente
        } = req.body;

        let imagen_cliente = '';
        if (req.file) {
            imagen_cliente = await uploadImage(req.file);
        }

        const { data, error } = await supabase
            .from('CLIENTE')
            .insert([{
                numrun_cliente,
                dvrun_cliente,
                pnombre_cliente,
                snombre_cliente,
                appaterno_cliente,
                apmaterno_cliente,
                dirección_cliente,
                email_cliente,
                numtelefono_cliente,
                id_comuna,
                fecnac_cliente,
                id_tipo_cliente,
                razon_social_cliente,
                id_region,
                imagen_cliente,
                fec_inicio_contrato_cliente,
                fec_termino_contrato_cliente,
                fec_creacion_cliente
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
            dvrun_cliente,
            pnombre_cliente,
            snombre_cliente,
            appaterno_cliente,
            apmaterno_cliente,
            dirección_cliente,
            email_cliente,
            numtelefono_cliente,
            id_comuna,
            fecnac_cliente,
            id_tipo_cliente,
            razon_social_cliente,
            id_region,
            fec_inicio_contrato_cliente,
            fec_termino_contrato_cliente,
            fec_creacion_cliente
        } = req.body;

        let imagen_cliente = req.body.imagen_cliente || '';
        if (req.file) {
            imagen_cliente = await uploadImage(req.file);
        }

        const { data, error } = await supabase
            .from('CLIENTE')
            .update({
                dvrun_cliente,
                pnombre_cliente,
                snombre_cliente,
                appaterno_cliente,
                apmaterno_cliente,
                dirección_cliente,
                email_cliente,
                numtelefono_cliente,
                id_comuna,
                fecnac_cliente,
                id_tipo_cliente,
                razon_social_cliente,
                id_region,
                imagen_cliente,
                fec_inicio_contrato_cliente,
                fec_termino_contrato_cliente,
                fec_creacion_cliente
            })
            .eq('numrun_cliente', id);

        if (error) throw error;
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const deleteCliente = async (req, res) => {
    const { id } = req.params;
    console.log(`Intentando eliminar el cliente con ID: ${id}`); // Log para depuración

    try {
        const { data, error } = await supabase
            .from('CLIENTE')
            .delete()
            .match({ numrun_cliente: id });

        if (error) {
            console.error('Error al eliminar el cliente:', error.message); // Log para depuración
            return res.status(400).json({ error: error.message });
        }

        console.log('Cliente eliminado:', data); // Log para depuración
        return res.json(data);
    } catch (error) {
        console.error('Error en el servidor al eliminar el cliente:', error.message);
        return res.status(500).json({ error: error.message });
    }
};