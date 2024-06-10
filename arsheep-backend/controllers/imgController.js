import supabase from '../database/connection.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Configurar Multer para manejar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file'); 

// Controlador para subir una imagen
export const subirImagen = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: 'Error al subir el archivo' });
            }

            const { id_ot } = req.body;
            const file = req.file;

            // Verificar si se proporciona el id_ot y el archivo de imagen
            if (!id_ot || !file) {
                return res.status(400).json({ error: 'Falta id_ot o archivo de imagen' });
            }

            // Generar un nombre único para el archivo
            const fileName = `${uuidv4()}.${file.mimetype.split('/')[1]}`;

            // Subir la imagen al almacenamiento de Supabase
            const { data: uploadData, error: uploadError } = await supabase.storage.from('imgOT/img').upload(fileName, file.buffer, {
                cacheControl: '3600',
                upsert: false
            });

            if (uploadError) {
                throw new Error(`Error al subir la imagen: ${uploadError.message}`);
            }
            const publicURL = `${supabase.storageUrl}/object/public/imgOT/img1/${fileName}`;
            
            const { data: imgData, error: dbError } = await supabase.from('IMG').insert([
                { id_ot: id_ot, url_img: publicURL }
            ]);

            if (dbError) {
                throw new Error(`Error al insertar en la base de datos: ${dbError.message}`);
            }

            // Devolver la URL de la imagen subida
            res.json({ message: 'Imagen subida con éxito', url: publicURL });
        });
    } catch (error) {
        console.error('Error en subirImagen:', error);
        res.status(500).json({ error: error.message });
    }
};