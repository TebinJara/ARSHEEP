import React, { useState } from 'react';
import { crearCliente } from '../../services/ClienteService';
import "./FormAgregarCliente.css";

export const FormAgregarCliente = ({ onClose }) => {

    const [cliente, setCliente] = useState({
        run_cliente: '',
        dv_run: '',
        nombre_cliente: '',
        direccion_cliente: '',
        contacto: '',
        url_imagen: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await crearCliente(cliente);
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
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Agregar Nuevo Cliente</h2>
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group">
                        <label>RUT de Cliente:</label>
                        <input type="text" name="run_cliente" value={cliente.run_cliente} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>DV:</label>
                        <input type="text" name="dv_run" value={cliente.dv_run} onChange={handleChange} required />
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
                        <label>Contacto:</label>
                        <input type="text" name="contacto" value={cliente.contacto} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>URL Imagen:</label>
                        <input type="text" name="url_imagen" value={cliente.url_imagen} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};