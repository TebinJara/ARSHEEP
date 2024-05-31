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
        <div className='secondary-container'>
            <div className='container-header'>
                <h2>Agregar Nuevo Cliente</h2>
                <span className="close" onClick={onClose}>&times;</span>
            </div>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="run_cliente">RUT de Cliente:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="run_cliente"
                        name="run_cliente"
                        value={cliente.run_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dv_run_cliente">DV:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dv_run_cliente"
                        name="dv_run_cliente"
                        value={cliente.dv_run_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre_cliente">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre_cliente"
                        name="nombre_cliente"
                        value={cliente.nombre_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion_cliente">Dirección:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="direccion_cliente"
                        name="direccion_cliente"
                        value={cliente.direccion_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numtelefono_cliente">Contacto Principal:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="numtelefono_cliente"
                        name="numtelefono_cliente"
                        value={cliente.numtelefono_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numtelefono2_cliente">Contacto Secundario:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="numtelefono2_cliente"
                        name="numtelefono2_cliente"
                        value={cliente.numtelefono2_cliente}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email_cliente">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email_cliente"
                        name="email_cliente"
                        value={cliente.email_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fecha_contrato_inicio">Fecha de Inicio de Contrato:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha_contrato_inicio"
                        name="fecha_contrato_inicio"
                        value={cliente.fecha_contrato_inicio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fecha_contrato_termino_cliente">Fecha de Término de Contrato:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha_contrato_termino_cliente"
                        name="fecha_contrato_termino_cliente"
                        value={cliente.fecha_contrato_termino_cliente}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imagen_cliente">Imagen:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="imagen_cliente"
                        name="imagen_cliente"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
            </form>
        </div>
    );
};