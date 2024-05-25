import React, { useState } from 'react';
import { crearCliente } from '../../services/ClienteService';
import "./FormAgregarCliente.css";

export const FormAgregarCliente = ({ onClose }) => {
    const [cliente, setCliente] = useState({
        run_cliente: '',
        dv_run_cliente: '',
        nombre_cliente: '',
        direccion_cliente: '',
        numtelefono_cliente: '',
        numtelefono2_cliente: '',
        email_cliente: '',
        fecha_contrato_inicio: '',
        fecha_contrato_termino_cliente: '',
        fecha_creacion_cliente: new Date().toISOString().split('T')[0] // set current date
    });

    const [imagen, setImagen] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(cliente).forEach(key => {
            formData.append(key, cliente[key]);
        });
        if (imagen) {
            formData.append('url_imagen_cliente', imagen); // Asegúrate de que el nombre coincida con el esperado en el backend
        }

        try {
            const response = await crearCliente(formData);
            if (response && response.error) {
                alert('Error al agregar el cliente: ' + response.error.message);
            } else {
                alert('Cliente agregado con éxito!');
                onClose();
            }
        } catch (error) {
            console.error('Error al agregar cliente:', error);
            alert('Error al agregar el cliente: ' + error.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='containt-header'>
                    <h3>Agregar Nuevo Cliente</h3>
                    <span className="close" onClick={onClose}>&times;</span>
                </div>
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group">
                        <label>RUT de Cliente:</label>
                        <input type="text" name="run_cliente" value={cliente.run_cliente} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>DV:</label>
                        <input type="text" name="dv_run_cliente" value={cliente.dv_run_cliente} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" name="nombre_cliente" value={cliente.nombre_cliente} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Dirección:</label>
                        <input type="text" name="direccion_cliente" value={cliente.direccion_cliente} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Contacto Principal:</label>
                        <input type="text" name="numtelefono_cliente" value={cliente.numtelefono_cliente} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Contacto Secundario:</label>
                        <input type="text" name="numtelefono2_cliente" value={cliente.numtelefono2_cliente} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email_cliente" value={cliente.email_cliente} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Fecha de Inicio de Contrato:</label>
                        <input type="date" name="fecha_contrato_inicio" value={cliente.fecha_contrato_inicio} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Fecha de Término de Contrato:</label>
                        <input type="date" name="fecha_contrato_termino_cliente" value={cliente.fecha_contrato_termino_cliente} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Imagen:</label>
                        <input type="file" name="imagen_cliente" onChange={handleImageChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};