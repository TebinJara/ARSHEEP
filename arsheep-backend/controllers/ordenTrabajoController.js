import supabase from '../database/connection.js';

export const createOrdenTrabajo = async (req, res) => {
    try {
        const { descripcion, status, fechaCreacion, fechaVencimiento, prioridad, adicional, imgUrl } = req.body;

        const { data, error } = await supabase
            .from('ORDEN_TRABAJO')
            .insert([
                {
                    descripcion,
                    status,
                    fecha_creacion: fechaCreacion,
                    fecha_vencimiento: fechaVencimiento,
                    prioridad,
                    adicional,
                    imagen_1: imgUrl
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
