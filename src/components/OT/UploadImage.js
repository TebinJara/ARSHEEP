import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [idOts, setIdOts] = useState([]);
  const [selectedIdOt, setSelectedIdOt] = useState('');
  const [file, setFile] = useState(null);

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
      console.log('Image uploaded successfully:', response.data);

      // Limpiar el id_ot del almacenamiento local después de subir la imagen
      localStorage.removeItem('id_ot');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="id_ot">ID OT:</label>
      <select id="id_ot" value={selectedIdOt} onChange={(e) => setSelectedIdOt(e.target.value)}>
        <option value="">Select ID OT</option>
        {idOts.map((ot) => (
          <option key={ot.id_ot} value={ot.id_ot}>{ot.id_ot}</option>
        ))}
      </select>

      <label htmlFor="file">Upload Image:</label>
      <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />

      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadImage;