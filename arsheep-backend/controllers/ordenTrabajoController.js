import supabase from '../database/connection.js';

// const insertarOrdenTrabajo = async (ordenTrabajoData) => {
//     console.log('Datos a insertar:', ordenTrabajoData);  // Log de los datos que se intentan insertar
//     const { data, error } = await supabase
//         .from('ORDEN_TRABAJO')
//         .insert([ordenTrabajoData], { returning: 'minimal' });

//     if (error) {
//         console.error('Error al insertar en la base de datos:', error);  // Log del error en la base de datos
//         throw error;
//     }
//     return data;
// };

// const handleInsertarOrdenTrabajo = async (req, res) => {
//     console.log('Solicitud recibida:', req.body);  // Log de la solicitud recibida
//     console.log('Archivos recibidos:', req.files); // Log de los archivos recibidos

//     const { descripción, status, fecha_creacion, fecha_vencimiento, prioridad, adicional, numrun_cliente, id_empleado } = req.body;
//     const { imagen_1, imagen_2, imagen_3, imagen_4 } = req.files; // Suponiendo que estás usando algún middleware como multer para manejar la subida de archivos

//     try {
//         let imageUrls = {};

//         if (imagen_1) {
//             console.log('Subiendo imagen 1:', imagen_1[0]);  // Log antes de subir la imagen
//             const { publicUrl } = await subirImagen(imagen_1[0], 'img1');
//             imageUrls.imagen_1 = publicUrl;
//         }
//         if (imagen_2) {
//             console.log('Subiendo imagen 2:', imagen_2[0]);  // Log antes de subir la imagen
//             const { publicUrl } = await subirImagen(imagen_2[0], 'img2');
//             imageUrls.imagen_2 = publicUrl;
//         }
//         if (imagen_3) {
//             console.log('Subiendo imagen 3:', imagen_3[0]);  // Log antes de subir la imagen
//             const { publicUrl } = await subirImagen(imagen_3[0], 'img3');
//             imageUrls.imagen_3 = publicUrl;
//         }
//         if (imagen_4) {
//             console.log('Subiendo imagen 4:', imagen_4[0]);  // Log antes de subir la imagen
//             const { publicUrl } = await subirImagen(imagen_4[0], 'img4');
//             imageUrls.imagen_4 = publicUrl;
//         }

//         const ordenTrabajoData = {
//             descripción,
//             status,
//             fecha_creacion,
//             fecha_vencimiento,
//             prioridad,
//             adicional,
//             numrun_cliente,
//             id_empleado,
//             ...imageUrls
//         };

//         console.log('Datos finales a insertar:', ordenTrabajoData);  // Log de los datos finales a insertar

//         const response = await insertarOrdenTrabajo(ordenTrabajoData);
//         res.status(200).json({ message: 'Orden de trabajo insertada correctamente', data: response });
//     } catch (error) {
//         console.error('Error al insertar la orden de trabajo:', error.message);
//         res.status(500).json({ message: 'Error al insertar la orden de trabajo', error: error.message });
//     }
// };

// export { handleInsertarOrdenTrabajo };

export const insertarOrdenTrabajo = async (req, res) => {
    try {
        const {
            descripcion,
            status,
            fecha_creacion,
            fecha_vencimiento,
            prioridad,
            adicional,
            numrun_cliente,
            id_empleado
        } = req.body;

        const { data, error } = await supabase
            .from('ORDEN_TRABAJO')
            .insert([{
                descripcion,
                status,
                fecha_creacion,
                fecha_vencimiento,
                prioridad,
                adicional,
                numrun_cliente,
                id_empleado
            }]);

        if (error) throw error;
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
