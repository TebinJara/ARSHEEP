import React, { useState } from 'react';
import './FormularioOT.css';

const FormularioOT = () => {
    // Estado local para los valores del formulario
    const [descripcion, setDescripcion] = useState('');
    const [status, setStatus] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [adicional, setAdicional] = useState('');
    const [archivo, setArchivo] = useState(null);

    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes enviar los datos del formulario a tu backend para insertar la OT en la base de datos
        console.log('Formulario enviado:', { descripcion, status, fechaCreacion, prioridad, adicional, archivo });
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
                <div className="form-group">
                    <label htmlFor="archivo">Adjuntar archivo:</label>
                    <input type="file" className="form-control-file" id="archivo" onChange={(e) => setArchivo(e.target.files[0])} />
                </div>
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
