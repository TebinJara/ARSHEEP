import supabase from '../database/connection.js';


const insertarOrdenTrabajo = async (ordenTrabajoData) => {
    const { data, error } = await supabase
        .from('ORDEN_TRABAJO')
        .insert([ordenTrabajoData], { returning: 'minimal' });

    if (error) {
        throw error;
    }
    return data;
};

const handleInsertarOrdenTrabajo = async (req, res) => {
    const { descripción, status, fecha_creacion, fecha_vencimiento, prioridad, adicional, run_cliente, id_empleado } = req.body;
    const { imagen_1, imagen_2, imagen_3, imagen_4 } = req.files; // Suponiendo que estás usando algún middleware como multer para manejar la subida de archivos

    try {
        let imageUrls = {};

        if (imagen_1) {
            const { publicUrl } = await subirImagen(imagen_1[0], 'img1');
            imageUrls.imagen_1 = publicUrl;
        }
        if (imagen_2) {
            const { publicUrl } = await subirImagen(imagen_2[0], 'img2');
            imageUrls.imagen_2 = publicUrl;
        }
        if (imagen_3) {
            const { publicUrl } = await subirImagen(imagen_3[0], 'img3');
            imageUrls.imagen_3 = publicUrl;
        }
        if (imagen_4) {
            const { publicUrl } = await subirImagen(imagen_4[0], 'img4');
            imageUrls.imagen_4 = publicUrl;
        }

        const ordenTrabajoData = {
            descripción,
            status,
            fecha_creacion,
            fecha_vencimiento,
            prioridad,
            adicional,
            run_cliente,
            id_empleado,
            ...imageUrls
        };

        const response = await insertarOrdenTrabajo(ordenTrabajoData);
        res.status(200).json({ message: 'Orden de trabajo insertada correctamente', data: response });
    } catch (error) {
        console.error('Error al insertar la orden de trabajo:', error.message);
        res.status(500).json({ message: 'Error al insertar la orden de trabajo', error: error.message });
    }
};

export { handleInsertarOrdenTrabajo };
//cambio para funcion backend