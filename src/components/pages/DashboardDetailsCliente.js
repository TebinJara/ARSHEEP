import React, { useState } from 'react';
import './DashboardDetailsCliente.css';
import { FormModificarCliente } from './FormModificarCliente';

export const DashboardDetailsCliente = ({ clienteSeleccionado, onClose, onEliminar, onUpdateCliente }) => {
    const [isEditing, setIsEditing] = useState(false);

    if (!clienteSeleccionado) {
        return <p>No hay información del cliente disponible</p>;
    }

    const {
        url_imagen_cliente = 'default-image-url.jpg',
        nombre_cliente = 'Nombre no disponible',
        run_cliente = 'RUT no disponible',
        dv_run_cliente = '',
        direccion_cliente = 'Dirección no disponible',
        numtelefono_cliente = 'Teléfono no disponible',
        numtelefono2_cliente = 'Teléfono adicional no disponible',
        email_cliente = 'Email no disponible',
        fecha_contrato_inicio = 'Fecha de inicio no disponible',
        fecha_contrato_termino_cliente = 'Fecha de término no disponible',
        fecha_creacion_cliente = 'Fecha de creación no disponible'
    } = clienteSeleccionado;

    const handleModificarClick = () => {
        setIsEditing(true);
    };

    const displayPhoneNumber = (phone1, phone2) => {
        if (phone1 && phone2) {
            return `${phone1} o ${phone2}`;
        }
        return phone1 || phone2 || 'Teléfono no disponible';
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
                            <h3>{nombre_cliente}</h3>
                        </div>
                        <div className='cont-prueba'>
                            <img src={url_imagen_cliente} alt={`Imagen de ${nombre_cliente}`} className="imagen-cliente" />
                        </div>

                        <div className='data-container'>
                            <div className='data-item'>
                                <label><strong>RUT:</strong></label>
                                <span>{run_cliente}-{dv_run_cliente}</span>
                            </div>
                            <div className='data-item'>
                                <label><strong>Dirección:</strong></label>
                                <span>{direccion_cliente}</span>
                            </div>
                            <div className='data-item'>
                                <label><strong>Teléfono:</strong></label>
                                <span>{displayPhoneNumber(numtelefono_cliente, numtelefono2_cliente)}</span>
                            </div>
                            <div className='data-item'>
                                <label><strong>Email:</strong></label>
                                <span>{email_cliente}</span>
                            </div>
                            <div className='data-item'>
                                <label><strong>Fecha de Inicio del Contrato:</strong></label>
                                <span>{fecha_contrato_inicio}</span>
                            </div>
                            <div className='data-item'>
                                <label><strong>Fecha de Término del Contrato:</strong></label>
                                <span>{fecha_contrato_termino_cliente}</span>
                            </div>
                        </div>

                        <div className='simple-container-row-buttons'>
                            <button onClick={() => onEliminar(run_cliente)}>Eliminar</button>
                            <button onClick={handleModificarClick}>Modificar</button>
                            <button>Notificar</button>
                            <button>Tickets</button>
                        </div>
                    </div>

                </div>

            </div>
            {isEditing && (
                <div className="edit-form-container">
                    <FormModificarCliente
                        clienteInicial={clienteSeleccionado}
                        onClose={() => setIsEditing(false)}
                        onUpdateCliente={onUpdateCliente}
                    />
                </div>
            )}
        </div>
    );
};