import React, { useState } from 'react';
import supabase, { subirImagen } from '../../services/supa';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            setMessage('');
        } else {
            setMessage('Por favor, selecciona una imagen válida.');
        }
    };

    const handleUpload = async () => {
        try {
            setUploading(true);
            setMessage('');
            if (!image) {
                setMessage('Por favor, selecciona una imagen para subir.');
                return;
            }

            const { data, error } = await subirImagen(image);
            if (error) {
                throw error;
            }

            setImage(null);
            setMessage('¡Imagen subida exitosamente!');
        } catch (error) {
            setMessage('Error al subir la imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <label htmlFor="image_1">Subir Imagen:</label>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Subiendo...' : 'Subir'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ImageUpload;
