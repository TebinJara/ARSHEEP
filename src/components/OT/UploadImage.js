import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UploadImage = () => {
  const [idOts, setIdOts] = useState([]);
  const [selectedIdOt, setSelectedIdOt] = useState('');
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    // Fetch the list of id_ot from the backend
    const fetchIdOts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/orden_trabajo');
        setIdOts(response.data);

        // Recuperar el id_ot del almacenamiento local y establecerlo como seleccionado
        const storedIdOt = localStorage.getItem('id_ot');
        if (storedIdOt) {
          setSelectedIdOt(storedIdOt);
        }
      } catch (error) {
        console.error('Error fetching id_ot:', error);
      }
    };

    fetchIdOts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedIdOt || !file) {
      console.error('Missing id_ot or file');
      return;
    }

    const formData = new FormData();
    formData.append('id_ot', selectedIdOt);
    formData.append('file', file);

    console.log('id_ot:', selectedIdOt);
    console.log('file:', file);

    try {
      const response = await axios.post('http://localhost:3001/api/img/subir', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Image Subida Con Exito!:', response.data);
      setUploadStatus('success'); // Indicar éxito en la subida de la imagen

      // Limpiar el id_ot del almacenamiento local después de subir la imagen
      localStorage.removeItem('id_ot');
    } catch (error) {
      console.error('Error al Subir Imagen', error);
      setUploadStatus('error'); // Indicar error en la subida de la imagen
    }
  };

  return (
    <form onSubmit={handleSubmit}>
       <label>ID OT:</label>
       <div>{selectedIdOt}</div>

      <label htmlFor="file">Subir Image:</label>
      <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />

      {uploadStatus === 'success' && <div>Image uploaded successfully</div>}
      {uploadStatus === 'error' && <div>Error uploading image</div>}  

      <button type="submit">Subir</button>
    </form>
  );
};

export default UploadImage;