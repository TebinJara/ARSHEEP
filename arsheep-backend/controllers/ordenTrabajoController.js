import supabase from '../database/connection.js';

export const createOrdenTrabajo = async (req, res) => {
    try {
        const { descripcion, status, fecha_creacion, fecha_vencimiento, prioridad, adicional, imagen_1, run_cliente,id_empleado } = req.body;

        const { data, error } = await supabase
            .from('ORDEN_TRABAJO')
            .insert([
                {
                    descripcion,
                    status,
                    fecha_creacion: fecha_creacion,
                    fecha_vencimiento: fecha_vencimiento,
                    prioridad,
                    adicional,
                    imagen_1: imagen_1,
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
