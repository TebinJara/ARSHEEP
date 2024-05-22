import React, { useState } from 'react';
import { crearCliente } from '../../services/ClienteService';

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
                // Si la respuesta incluye explícitamente un error
                alert('Error al agregar el cliente: ' + response.error.message);
            } else {
                alert('Cliente agregado con éxito!');
                onClose(); // Suponiendo que onClose es una función para cerrar el modal
            }
        } catch (error) {
            // Errores de red o del servidor
            console.error('Error al agregar cliente:', error);
            alert('Error al agregar el cliente: ' + error.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Agregar Nuevo Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <label>RUT de Cliente:</label>
                    <input type="text" name="run_cliente" value={cliente.run_cliente} onChange={handleChange} required />
                    <label>DV:</label>
                    <input type="text" name="dv_run" value={cliente.dv_run} onChange={handleChange} required />
                    <label>Nombre:</label>
                    <input type="text" name="nombre_cliente" value={cliente.nombre_cliente} onChange={handleChange} required />
                    <label>Dirección:</label>
                    <input type="text" name="direccion_cliente" value={cliente.direccion_cliente} onChange={handleChange} required />
                    <label>Contacto:</label>
                    <input type="text" name="contacto_cliente" value={cliente.contacto_cliente} onChange={handleChange} required />
                    <label>URL Imagen:</label>
                    <input type="text" name="url_imagen" value={cliente.url_imagen} onChange={handleChange} />
                    <button type="submit">Guardar</button>
                </form>
            </div>
        </div>
    );
};