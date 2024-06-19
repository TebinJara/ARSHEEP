import supabase from '../database/connection.js';

// Crear una empresa
export const createEmpresa = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('EMPRESA')
            .insert([req.body]);

        if (error) throw error;

        return res.status(201).json(data);
    } catch (error) {
        console.error('Error al crear la empresa:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todas las empresas
export const getEmpresas = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('EMPRESA')
            .select(`
                numrun_empresa,
                nombre_empresa,
                dvrun_empresa,
                numtelefono_empresa,
                dirección_empresa,
                email_empresa,
                sitioweb_empresa,
                numrun_cliente
            `)
            .order('numrun_empresa', { ascending: true });

        if (error) return res.status(400).json({ error });
        return res.json(data);
    } catch (error) {
        console.error('Error al obtener las empresas:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener una empresa por ID
export const getEmpresaById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de empresa es requerido' });

        const { data, error } = await supabase
            .from('EMPRESA')
            .select('*')
            .eq('numrun_empresa', id)
            .single();

        if (error) return res.status(400).json({ error });
        if (!data) return res.status(404).json({ error: 'Empresa no encontrada' });

        return res.json(data);
    } catch (error) {
        console.error('Error al obtener la empresa por ID:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar una empresa
export const updateEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de empresa es requerido' });

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Datos de empresa son requeridos' });
        }

        const { data, error } = await supabase
            .from('EMPRESA')
            .update(req.body)
            .eq('numrun_empresa', id)
            .select('*');

        if (error) {
            console.error('Error en la consulta a la base de datos:', error);
            return res.status(400).json({ error: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }

        return res.json(data[0]);
    } catch (error) {
        console.error('Error al actualizar la empresa:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar una empresa
export const deleteEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de empresa es requerido' });

        const { data, error } = await supabase
            .from('EMPRESA')
            .delete()
            .eq('numrun_empresa', id);

        if (error) return res.status(400).json({ error });
        if (!data) return res.status(404).json({ error: 'Empresa no encontrada' });

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar la empresa:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
