import React, { useState } from 'react';
import { crearCliente } from '../../services/ClienteService';
import "./FormAgregarCliente.css";

export const FormAgregarCliente = ({ onClose }) => {
    const [cliente, setCliente] = useState({
        run_cliente: '',
        dv_run_cliente: '',
        pnombre_cliente: '',
        snombre_cliente: '',
        appaterno_cliente: '',
        apmaterno_cliente: '',
        dirección_cliente: '',
        numtelefono_cliente: '',
        email_cliente: '',
        fecnac_cliente: '',
        id_tipo_cliente: '',
        razon_social_cliente: '',
        id_comuna: '',
        id_region: '',
        fec_inicio_contrato_cliente: '',
        fec_termino_contrato_cliente: '',
        fec_creacion_cliente: new Date().toISOString().split('T')[0] // set current date
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
            formData.append('imagen_cliente', imagen); // Asegúrate de que el nombre coincida con el esperado en el backend
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
                    <label htmlFor="pnombre_cliente">Primer Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pnombre_cliente"
                        name="pnombre_cliente"
                        value={cliente.pnombre_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="snombre_cliente">Segundo Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="snombre_cliente"
                        name="snombre_cliente"
                        value={cliente.snombre_cliente}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="appaterno_cliente">Apellido Paterno:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="appaterno_cliente"
                        name="appaterno_cliente"
                        value={cliente.appaterno_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apmaterno_cliente">Apellido Materno:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="apmaterno_cliente"
                        name="apmaterno_cliente"
                        value={cliente.apmaterno_cliente}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dirección_cliente">Dirección:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dirección_cliente"
                        name="dirección_cliente"
                        value={cliente.dirección_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numtelefono_cliente">Teléfono:</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="numtelefono_cliente"
                        name="numtelefono_cliente"
                        value={cliente.numtelefono_cliente}
                        onChange={handleChange}
                        required
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
                    <label htmlFor="fecnac_cliente">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecnac_cliente"
                        name="fecnac_cliente"
                        value={cliente.fecnac_cliente}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fec_inicio_contrato_cliente">Fecha de Inicio de Contrato:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fec_inicio_contrato_cliente"
                        name="fec_inicio_contrato_cliente"
                        value={cliente.fec_inicio_contrato_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fec_termino_contrato_cliente">Fecha de Término de Contrato:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fec_termino_contrato_cliente"
                        name="fec_termino_contrato_cliente"
                        value={cliente.fec_termino_contrato_cliente}
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
