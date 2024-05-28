import supabase from '../database/connection.js';
import { subirImagen,guardarImagenEnSupabase} from '../../src/services/supa.js';

export const createOrdenTrabajo = async (req, res) => {
    try {
        const { descripcion, status, fecha_creacion, fecha_vencimiento, prioridad, adicional, imagen_1, run_cliente, id_empleado } = req.body;

        let imageUrl = null;

        // Si hay una imagen adjunta, obtenemos la URL de la imagen
        if (imagen_1) {
            console.log("Imagen recibida:", imagen_1); // Agregar un registro para verificar que la imagen se esté recibiendo correctamente
            // Guarda la URL de la imagen subida en la base de datos
            imageUrl = await guardarImagenEnSupabase(imagen_1);
            console.log("URL de la imagen:", imageUrl); // Agregar un registro para verificar la URL de la imagen
        }

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
                    imagen_1: imageUrl, // Aquí se usa la URL de la imagen
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