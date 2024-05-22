import React, { useState, useRef } from 'react';
import './FormularioOT.css';
import axios from 'axios';
import supabase from '../../services/supa.js';

const FormularioOT = () => {
    const [descripcion, setDescripcion] = useState('');
    const [status, setStatus] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [adicional, setAdicional] = useState('');
    const [img, setImg] = useState([null, null, null, null]);
    const campoImgRefs = useRef([null, null, null, null]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const imgUrls = [];
            for (const imagen of img) {
                if (imagen) {
                    const filePath = `img1/${Date.now()}_${imagen.name}`;
                    const { data, error } = await supabase.storage.from('imgOT').upload(filePath, imagen);
                    if (error) throw error;
                    imgUrls.push(data.Key);
                }
            }

            const formData = {
                descripcion,
                status,
                fechaCreacion,
                fechaVencimiento,
                prioridad,
                adicional,
                imgUrls
            };

            const response = await axios.post('http://localhost:5000/api/orden-trabajo', formData);

            if (response.status !== 200) {
                throw new Error('Error al enviar el formulario');
            }

            console.log('Formulario enviado:', response.data);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    const handleImgSeleccionado = (index, event) => {
        const imgSeleccionado = event.target.files[0];
        const newImg = [...img];
        newImg[index] = imgSeleccionado;
        setImg(newImg);
    };

    const handleClickAdjuntarImg = (index) => {
        campoImgRefs.current[index].click();
    };

    return (
        <div className="container">
            <h1>Formulario de Inserción de OT</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <input type="text" className="form-control" id="descripcion" placeholder="Ingrese la descripción de la OT" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Estado:</label>
                    <select className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="">Seleccione Estado</option>
                        <option value="Ingresada">Ingresada</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Cancelada">Cancelada</option>
                        <option value="Completada">Completada</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fechaCreacion">Fecha de Creación:</label>
                    <input type="date" className="form-control" id="fechaCreacion" value={fechaCreacion} onChange={(e) => setFechaCreacion(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="fechaVencimiento">Fecha de Vencimiento:</label>
                    <input type="date" className="form-control" id="fechaVencimiento" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="prioridad">Prioridad:</label>
                    <select className="form-control" id="prioridad" value={prioridad} onChange={(e) => setPrioridad(e.target.value)} required>
                        <option value="">Seleccione la prioridad</option>
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>
               
                {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="form-group">
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            ref={(ref) => (campoImgRefs.current[index] = ref)}
                            onChange={(e) => handleImgSeleccionado(index, e)}
                            accept="image/*"
                        />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleClickAdjuntarImg(index)}
                        >
                            Adjuntar imagen {index + 1}
                        </button>
                        {img[index] && (
                            <div className="image-preview">
                                <img
                                    src={URL.createObjectURL(img[index])}
                                    alt={`Vista previa ${index + 1}`}
                                />
                            </div>
                        )}
                    </div>
                ))}
                <div className="form-group">
                    <label htmlFor="adicional">Información Adicional:</label>
                    <textarea className="form-control" id="adicional" rows="3" placeholder="Ingrese información adicional" value={adicional} onChange={(e) => setAdicional(e.target.value)}></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">Enviar OT</button>
            </form>
        </div>
    );
};

export { FormularioOT };

