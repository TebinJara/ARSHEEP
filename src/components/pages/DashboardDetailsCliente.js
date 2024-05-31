import React, { useState, useEffect } from 'react';
import './DashboardDetailsCliente.css';

export const DashboardDetailsCliente = ({ clienteSeleccionado, onClose, onEliminar, onUpdateCliente }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...clienteSeleccionado });
    const [styleInput, setStyleInput] = useState("input-desenabled");

    useEffect(() => {
        setFormData({ ...clienteSeleccionado });
    }, [clienteSeleccionado]);

    if (!clienteSeleccionado) {
        return <p>No hay información del cliente disponible</p>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleModificarClick = () => {
        setIsEditing(true);
        setStyleInput("");
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        onUpdateCliente(formData); // Función para actualizar los detalles del cliente
        setStyleInput("input-desenabled");
    };

    const formatRut = (rut, dv) => {
        if (typeof rut !== 'string') {
            rut = String(rut);
        }
        return `${rut.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}-${dv}`;
    };

    const formatFecha = (fecha) => {
        if (!fecha) return '';
        const [year, month, day] = fecha.split('-');
        return `${day}-${month}-${year}`;
    };

    return (
        <div className='secondary-container-50'>
            <div className='container-header'>
                <h2>Información del Cliente</h2>
                <h3 onClick={onClose}>x</h3>
            </div>

            <div className='secondary-container'>

                <div className='container-header'>
                    <h3>{formData.pnombre_cliente} {formData.snombre_cliente} {formData.appaterno_cliente} {formData.apmaterno_cliente}</h3>
                </div>

                <div className='data-container'>
                    <div className='image-container'>
                        <img src={formData.url_imagen_cliente || 'default-image-url.jpg'} alt={`Imagen de ${formData.pnombre_cliente}`} className="image-cliente" />
                    </div>
                    <div className='data-item'>
                        <label>RUT: </label>
                        <input
                            type="text"
                            name="numrun_cliente"
                            value={formatRut(formData.numrun_cliente, formData.dvrun_cliente)}
                            onChange={handleInputChange}
                            disabled={true}
                            className="input-desenabled"
                        />
                    </div>
                    <div className='data-item'>
                        <label>Primer Nombre:</label>
                        <input
                            type="text"
                            name="pnombre_cliente"
                            value={formData.pnombre_cliente}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={styleInput}
                        />
                    </div>
                    <div className='data-item'>
                        <label>Segundo Nombre:</label>
                        <input
                            type="text"
                            name="snombre_cliente"
                            value={formData.snombre_cliente}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={styleInput}
                        />
                    </div>
                    <div className='data-item'>
                        <label>Apellido Paterno:</label>
                        <input
                            type="text"
                            name="appaterno_cliente"
                            value={formData.appaterno_cliente}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={styleInput}
                        />
                    </div>
                    <div className='data-item'>
                        <label>Apellido Materno:</label>
                        <input
                            type="text"
                            name="apmaterno_cliente"
                            value={formData.apmaterno_cliente}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={styleInput}
                        />
                    </div>
                    <div className='data-item'>
                        <label>Dirección: </label>
                        <input
                            type="text"
                            name="dirección_cliente"
                            value={formData.dirección_cliente}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={styleInput}
                        />
                    </div>
                    <div className='data-item'>
                        <label>Teléfono:</label>
                        <input
                            type="tel"
                            name="numtelefono_cliente"
                            value={formData.numtelefono_cliente}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={styleInput}
                        />
                    </div>
                    <div className='data-item'>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email_cliente"
                            value={formData.email_cliente}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={styleInput}
                        />
                    </div>
                    <div className='data-item'>
                        <label>Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            name="fecnac_cliente"
                            value={formData.fecnac_cliente}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={styleInput}
                        />
                    </div>
                    <div className='data-item'>
                        <label>Fecha de Inicio del Contrato:</label>
                        <input
                            type="date"
                            name="fec_inicio_contrato_cliente"
                            value={formData.fec_inicio_contrato_cliente}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={styleInput}
                        />
                    </div>
                    <div className='data-item'>
                        <label>Fecha de Término del Contrato:</label>
                        <input
                            type="date"
                            name="fec_termino_contrato_cliente"
                            value={formData.fec_termino_contrato_cliente}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={styleInput}
                        />
                    </div>
                    <div className='data-item'>
                        <label>Fecha de Creación del Cliente:</label>
                        <input
                            type="date"
                            name="fec_creacion_cliente"
                            value={formData.fec_creacion_cliente}
                            onChange={handleInputChange}
                            disabled={true}
                            className="input-desenabled"
                        />
                    </div>
                </div>

                <div className='control-buttons-container'>
                    <div className='control-buttons-container-group'>
                        <button onClick={() => onEliminar(formData.numrun_cliente)}>Eliminar</button>
                        {isEditing ? (
                            <button onClick={handleSaveClick}>Guardar</button>
                        ) : (
                            <button onClick={handleModificarClick}>Modificar</button>
                        )}
                        <button>Notificar</button>
                        <button>Tickets</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
