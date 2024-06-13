import supabase from '../database/connection.js';

export const getUsuariosEmpleados = async (req, res) => {
    const { data, error } = await supabase
        .from('USUARIO')
        .select(`
            id_usuario,
            nombre_usuario,
            id_tipo_usuario,
            estado_usuario,
            TIPO_USUARIO (desc_tipo_usuario),
            id_empleado,
            fec_creacion_usuario,
            profile_image,
            EMPLEADO (
                pnombre,
                snombre,
                apaterno,
                amaterno,
                numero_contacto,
                correo,
                ROL(
                   desc_rol,
                   DEPARTAMENTO(
                   desc_departamento
                   )
                )
            )
        `)
        .not('id_empleado', 'is', null) // Filtra donde id_empleado no es null
        .not('id_tipo_usuario', 'eq', 1) // Filtra donde id_tipo_usuario no es 1
        .is('numrun_cliente', null) // Filtra donde numrun_cliente es null

    if (error) {
        console.error("Error al obtener los usuarios empleados:", error);
        return res.status(400).json({ error });
    }

    if (!data || data.length === 0) {
        console.warn("No se encontraron datos de usuarios empleados.");
        return res.status(404).json({ message: "No se encontraron datos de usuarios empleados." });
    }

    return res.json(data);
};


export const getUsuarioEmpleadoPorId = async (req, res) => {
    const { id_usuario } = req.params;

    const { data, error } = await supabase
        .from('USUARIO')
        .select(`
            id_usuario,
            nombre_usuario,
            id_tipo_usuario,
            estado_usuario,
            TIPO_USUARIO (desc_tipo_usuario),
            id_empleado,
            fec_creacion_usuario,
            profile_image,
            EMPLEADO (
                pnombre,
                snombre,
                apaterno,
                amaterno,
                numero_contacto,
                correo,
                ROL(
                   desc_rol,
                   DEPARTAMENTO(
                   desc_departamento
                   )
                )
            )
        `)
        .eq('id_usuario', id_usuario) 

    if (error) {
        console.error("Error al obtener el usuario empleado:", error);
        return res.status(400).json({ error });
    }

    if (!data || data.length === 0) {
        console.warn("No se encontraron datos del usuario empleado.");
        return res.status(404).json({ message: "No se encontraron datos del usuario empleado." });
    }

    return res.json(data[0]); // Retorna solo el primer (y único) resultado
};



export const updateEstadoUsuario = async (req, res) => {
    const { id_usuario, nuevo_estado } = req.body;

    // Verificar que se hayan proporcionado los parámetros necesarios
    if (id_usuario === undefined || nuevo_estado === undefined) {
        return res.status(400).json({ error: "Faltan parámetros: id_usuario y nuevo_estado son necesarios" });
    }

    try {
        // Realizar la actualización en la base de datos
        const { error } = await supabase
            .from('USUARIO')
            .update({ estado_usuario: nuevo_estado })
            .eq('id_usuario', id_usuario);

        // Manejar errores de la base de datos
        if (error) {
            console.error("Error al cambiar el estado del usuario:", error);
            return res.status(500).json({ error: "Error al cambiar el estado del usuario" });
        }

        // Devolver una respuesta exitosa
        return res.json({ message: "Estado del usuario actualizado correctamente" });

    } catch (err) {
        console.error("Error inesperado:", err);
        return res.status(500).json({ error: "Error inesperado al cambiar el estado del usuario" });
    }
};


export const uploadImage = async (req, res) => {
    const { id_usuario, imagen_antigua } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
    } const file = req.file;

    const fileName = `pfimg_user_employed_${id_usuario}_${Date.now()}`;
    const newImageUrl = `https://niqxbeaxtqofvrboxnzb.supabase.co/storage/v1/object/public/imgage_user/${fileName}`;

    try {
        
        // Obtener la URL de la imagen actual del usuario
        const { data: userData, error: userError } = await supabase
            .from('USUARIO')
            .select('profile_image')
            .eq('id_usuario', id_usuario)
            .single();

        if (userError) {
            console.error('Error al obtener la URL de la imagen del usuario', userError);
            throw new Error('Error al obtener la URL de la imagen del usuario');
        }

        // Subir la nueva imagen a Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('imgage_user')
            .upload(fileName, file.buffer);

        if (uploadError) {
            console.error('Error al subir la imagen a Supabase', uploadError);
            throw new Error('Error al subir la imagen a Supabase');
        }

        // Actualizar URL de la imagen en la base de datos
        const { error: updateError } = await supabase
            .from('USUARIO')
            .update({ profile_image: newImageUrl })
            .eq('id_usuario', id_usuario);

        if (updateError) {
            console.error('Error al actualizar la URL de la imagen en la base de datos', updateError);
            throw new Error('Error al actualizar la URL de la imagen en la base de datos');
        }

        // Eliminar la imagen anterior del almacenamiento, si existe
        if (imagen_antigua) {
            const oldImagePath = imagen_antigua.replace('https://niqxbeaxtqofvrboxnzb.supabase.co/storage/v1/object/public/imgage_user/', '');
            console.log('Imagen antigua a eliminar:', oldImagePath);
            const { error: deleteError } = await supabase.storage
                .from('imgage_user')
                .remove([oldImagePath]);

            if (deleteError) {
                console.error('Error al eliminar la imagen anterior de Supabase', deleteError);
                throw new Error('Error al eliminar la imagen anterior de Supabase');
            } else {
                console.log('Imagen antigua eliminada correctamente');
            }
        }

        return res.json({ message: 'Imagen subida y URL actualizada correctamente', newImageUrl });

    } catch (error) {
        console.error('Error en el proceso de subida de imagen', error);
        return res.status(500).json({ error: error.message });
    }
};