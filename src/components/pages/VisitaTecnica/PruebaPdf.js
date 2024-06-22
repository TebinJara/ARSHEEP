import React, { useState } from 'react';
import { uploadPdf } from '../../../services/visitaTecnicaService';

export const PruebaPdf = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Por favor, selecciona un archivo.');
            return;
        }

        const response = await uploadPdf(file);

        if (response) {
            setMessage('Archivo subido exitosamente.');
        } else {
            setMessage('Error al subir el archivo.');
        }
    };

    return (
        <div>
            <h2>Subir Archivo PDF</h2>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Subir</button>
            {message && <p>{message}</p>}
        </div>
    );
};

