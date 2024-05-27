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

    return (
        <div className='secondary-container-50'>
            <div className='container-header'>
                <h2>Información del Cliente</h2>
                <h3 onClick={onClose}>x</h3>
            </div>

            <div className='secondary-container'>
                <div className='secondary-container'>
                    <div className='simple-container'>
                        <div className='container-header'>
                            <h3>{formData.nombre_cliente}</h3>
                        </div>

                        <div className='data-container'>
                            <div className='data-item'>
                                <label>RUT: </label>
                                <input
                                    type="text"
                                    name="run_cliente"
                                    value={formatRut(formData.run_cliente, formData.dv_run_cliente)}
                                    onChange={handleInputChange}
                                    disabled={true}
                                    className="input-desenabled"
                                />
                            </div>
                            <div className='data-item'>
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre_cliente"
                                    value={formData.nombre_cliente}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={styleInput}
                                />
                            </div>
                            <div className='data-item'>
                                <label>Dirección: </label>
                                <input
                                    type="text"
                                    name="direccion_cliente"
                                    value={formData.direccion_cliente}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={styleInput}
                                />
                            </div>
                            <div className='data-item'>
                                <label>Teléfono:</label>
                                <input
                                    type="text"
                                    name="numtelefono_cliente"
                                    value={formData.numtelefono_cliente}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={styleInput}
                                />
                                <input
                                    type="text"
                                    name="numtelefono2_cliente"
                                    value={formData.numtelefono2_cliente}
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
                                <label>Fecha de Inicio del Contrato:</label>
                                <input
                                    type="text"
                                    name="fecha_contrato_inicio"
                                    value={formData.fecha_contrato_inicio}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={styleInput}
                                />
                            </div>
                            <div className='data-item'>
                                <label>Fecha de Término del Contrato:</label>
                                <input
                                    type="text"
                                    name="fecha_contrato_termino_cliente"
                                    value={formData.fecha_contrato_termino_cliente}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={styleInput}
                                />
                            </div>
                        </div>
                        <div className='cont-prueba'>
                            <img src={formData.url_imagen_cliente || 'default-image-url.jpg'} alt={`Imagen de ${formData.nombre_cliente}`} className="imagen-cliente" />
                        </div>

                    </div>
                </div>
                <div className='simple-container-row-buttons'>
                    <button onClick={() => onEliminar(formData.run_cliente)}>Eliminar</button>
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
    );
};
