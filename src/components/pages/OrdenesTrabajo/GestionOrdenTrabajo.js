import React, { useState, useEffect } from 'react';
import './GestionOrdenTrabajo.css';
import { getCurrentDate, getMaxDate } from '../../../helpers/dateHelper';
import { updateOrdenTrabajo } from '../../../services/ordenTrabajoService'; // Asegúrate de que la ruta es correcta

export const GestionOrdenTrabajo = ({ orden }) => {
    const [formData, setFormData] = useState({
        fecha_agendada: orden.fecha_agendada || '',
        fecha_vencimiento: orden.fecha_agendada || '',
        desc_ot: orden.desc_ot || '',
        descripcion: orden.descripcion || '',
        acciones: orden.acciones || '',
        observaciones: orden.observaciones || '',
    });

    useEffect(() => {
        setFormData({
            fecha_agendada: orden.fecha_agendada || '',
            fecha_vencimiento: orden.fecha_agendada || '',
            desc_ot: orden.desc_ot || '',
            descripcion: orden.descripcion || '',
            acciones: orden.acciones || '',
            observaciones: orden.observaciones || '',
        });
    }, [orden]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const updatedOrden = await updateOrdenTrabajo(orden.id_ot, formData);
            if (updatedOrden) {
                alert('Orden de trabajo actualizada exitosamente');
            } else {
                alert('Hubo un error al actualizar la orden de trabajo');
            }
        } catch (error) {
            alert('Error al actualizar la orden de trabajo');
            console.error(error);
        }
    };

    return (
        <div className='orden-trabajo-gestion-container'>
            <div className='orden-trabajo-gestion-header'>
                <h2>ACTUALIZAR OT #{orden.id_ot}</h2>
                <div>
                    <p>VISITA TÉCNICA: {orden.id_ot} </p>
                    <p>FECHA AGENDAMIENTO: {orden.fecha_creacion} </p>
                    <p>ESTADO: {orden.TIPO_STATUS.nombre_status}</p>
                    <p>TÉCNICO: {orden.EMPLEADO.pnombre} {orden.EMPLEADO.apaterno} {orden.EMPLEADO.amaterno}</p>
                </div>
            </div>
            <div className='orden-trabajo-gestion-content'>
                <div className='orden-trabajo-gestion-form-container'>
                    <form onSubmit={handleSave}>
                        <div className='form-header'></div>
                        <div className='form-level-1'>
                            <div className='form-group'>
                                <label>FECHA DE VISITA:</label>
                                <input
                                    type="date"
                                    name="fecha_agendada"
                                    value={formData.fecha_agendada}
                                    onChange={handleChange}
                                    min={getCurrentDate()}
                                    max={getMaxDate()}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>FECHA DE VENCIMIENTO:</label>
                                <input
                                    type="date"
                                    name="fecha_vencimiento"
                                    value={formData.fecha_vencimiento}
                                    onChange={handleChange}
                                    min={getCurrentDate()}
                                    max={getMaxDate()}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>DESCRIPCIÓN</label>
                                <input
                                    type='text'
                                    name='desc_ot'
                                    onChange={handleChange}
                                    value={formData.desc_ot.toUpperCase()}
                                />
                            </div>
                            <div className='form-group'>
                                <label>DETALLES DEL TRABAJO REALIZADO</label>
                                <textarea
                                    name='descripcion'
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className='form-group'>
                                <label>ACCIONES REALIZADAS</label>
                                <textarea
                                    name='acciones'
                                    value={formData.acciones}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className='form-group'>
                                <label>OBSERVACIONES</label>
                                <textarea
                                    name='observaciones'
                                    value={formData.observaciones}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className='form-level-2'>

                        </div>
                        <div className='form-level-3'>

                        </div>
                        <div className='form-level-4'>
                            <button type='submit'>INICIAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
