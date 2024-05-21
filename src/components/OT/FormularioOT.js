import React, { useState, useRef } from 'react';
import './FormularioOT.css';

const FormularioOT = () => {
    // Estado local para los valores del formulario
    const [descripcion, setDescripcion] = useState('');
    const [status, setStatus] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [adicional, setAdicional] = useState('');
    const [archivos, setArchivos] = useState([null, null, null, null]);
    const campoArchivoRefs = useRef([null, null, null, null]);

    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes enviar los datos del formulario a tu backend para insertar la OT en la base de datos
        console.log('Formulario enviado:', { descripcion, status, fechaCreacion, prioridad, adicional, archivos });
    };
    const handleArchivoSeleccionado = (index, event) => {
        const archivoSeleccionado = event.target.files[0];
        const newArchivos = [...archivos];
        newArchivos[index] = archivoSeleccionado;
        setArchivos(newArchivos);
    };
    const handleClickAdjuntarArchivo = (index) => {
        campoArchivoRefs.current[index].click();
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
                        <input type="file" style={{ display: 'none' }} ref={(ref) => campoArchivoRefs.current[index] = ref} onChange={(e) => handleArchivoSeleccionado(index, e)} accept="image/*" />
                        <button type="button" className="btn btn-secondary" onClick={() => handleClickAdjuntarArchivo(index)}>Adjuntar imagen {index + 1}</button>
                        {archivos[index] && <p>{archivos[index].name}</p>}
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
