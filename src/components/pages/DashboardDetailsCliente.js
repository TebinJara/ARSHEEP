import React, { useState } from 'react';
import './DashboardDetailsCliente.css';
import { FormModificarCliente } from './FormModificarCliente';

export const DashboardDetailsCliente = ({ clienteSeleccionado, onClose, onEliminar, onUpdateCliente }) => {
    const [isEditing, setIsEditing] = useState(false);

    if (!clienteSeleccionado) {
        return <p>No hay información del cliente disponible</p>;
    }

    const {
        url_imagen_cliente = 'default-image-url.jpg', // Valor por defecto si url_imagen_cliente no está definida
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

    return (
        <div className='dashboard-details'>
            <div className='dashboard-details-header'>
                <h2>Información del Cliente</h2>
                <h3 onClick={onClose}>x</h3>
            </div>

            <div className='dashboard-details-containt'>
                <h3>{nombre_cliente}</h3>
                <div className='dashboard-details-containt-2'>
                    <table className='dashboard-details-table'>
                        <tbody>
                            <tr>
                                <th>RUT</th>
                                <td>{run_cliente}-{dv_run_cliente}</td>
                            </tr>
                            <tr>
                                <th>Dirección</th>
                                <td>{direccion_cliente}</td>
                            </tr>
                            <tr>
                                <th>Teléfono</th>
                                <td>{numtelefono_cliente}</td>
                            </tr>
                            <tr>
                                <th>Teléfono Adicional</th>
                                <td>{numtelefono2_cliente}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{email_cliente}</td>
                            </tr>
                            <tr>
                                <th>Fecha de Inicio del Contrato</th>
                                <td>{fecha_contrato_inicio}</td>
                            </tr>
                            <tr>
                                <th>Fecha de Término del Contrato</th>
                                <td>{fecha_contrato_termino_cliente}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='dashboard-details-containt-button'>
                        <button onClick={() => onEliminar(run_cliente)}>Eliminar</button>
                        <button onClick={handleModificarClick}>Modificar</button>
                        <button>Notificar</button>
                        <button>Tickets</button>
                    </div>
                </div>
                <div className='dashboard-details-containt-image'>
                    <img src={url_imagen_cliente} alt={`Imagen de ${nombre_cliente}`} className="imagen-cliente" />
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