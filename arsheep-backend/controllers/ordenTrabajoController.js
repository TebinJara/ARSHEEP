import supabase from '../database/connection.js';
import {subirImagen} from '../../src/services/supa.js'

export const createOrdenTrabajo = async (req, res) => {
    try {
        const { descripción, status, fecha_creacion, fecha_vencimiento, prioridad, adicional, run_cliente, id_empleado } = req.body;

        let imageUrl = null;
        if (req.file) {
            const { publicUrl } = await subirImagen(req.file);
            imageUrl = publicUrl;
        }

        const { data, error } = await supabase
            .from('ORDEN_TRABAJO')
            .insert([
                {
                    descripción,
                    status,
                    fecha_creacion,
                    fecha_vencimiento,
                    prioridad,
                    adicional,
                    imagen_1: imageUrl,
                    run_cliente,
                    id_empleado
                }
            ]);

        if (error) {
            throw error;
        }

        res.status(200).json({ message: 'Orden de trabajo creada exitosamente', data });
    } catch (error) {
        console.error('Error al crear la orden de trabajo:', error);
        res.status(500).json({ message: 'Error al crear la orden de trabajo', error: error.message });
    }
};