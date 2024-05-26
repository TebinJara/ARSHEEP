// src/components/ImageUpload.js
import React, { useState } from 'react';

import supabase, { subirImagen } from  '../../services/supa';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            setUploading(true);
            if (!image) {
                alert('Por favor, selecciona una imagen para subir.');
                return;
            }

            // Llama a la función subirImagen de supabase
            const { data, error } = await subirImagen(image);
            if (error) {
                throw error;
            }
            
            alert('¡Imagen subida exitosamente!');
        } catch (error) {
            alert('Error al subir la imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h1>Subir Imagen</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Subiendo...' : 'Subir'}
            </button>
        </div>
    );
};

export default ImageUpload;
// error uploading image:
// _services_supa__WEBPACK_IMPORTED_MODULE_1__.default.subirImagen is not a function