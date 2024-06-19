import React from 'react';
import './GestionOrdenTrabajo.css';

export const GestionOrdenTrabajo = ({ orden }) => {
    return (

        <div className='orden-trabajo-gestion-container'>
            <div className='orden-trabajo-gestion-header'>
                <h2>ACTUALIZAR OT #{orden.id_ot}</h2>
            </div>
            <div className='orden-trabajo-gestion-content'>
                <div className='orden-trabajo-gestion-form-container'>

                    <form>
                        <div className='form-header'>
                            
                        </div>
                        <div className='form-level-1'>
                            <div className='form-group'>
                                <label>DESCRIPCIÓN</label>
                                <input type='text' value={orden.desc_ot} readOnly />
                            </div>
                        </div>
                        <div className='form-level-2'>
                            <div className='form-group'>
                                <label>Status</label>
                                <input type='text' value={orden.id_status} readOnly />
                            </div>
                            <div className='form-group'>
                                <label>Fecha de Creación</label>
                                <input type='date' value={orden.fcreacion_ot} readOnly />
                            </div>
                            <div className='form-group'>
                                <label>Fecha de Vencimiento</label>
                                <input type='date' value={orden.fvencimiento_ot} readOnly />
                            </div>
                        </div>
                        <div className='form-level-3'>
                            <div className='form-group'>
                                <label>Prioridad</label>
                                <input type='text' value={orden.id_prioridad} readOnly style={{ color: getColorPrioridad(orden.id_prioridad) }} />
                            </div>
                        </div>
                        <div className='form-level-4'>
                            <button type='button'>Guardar</button>
                        </div>

                    </form>
                </div>

                <div className='orden-trabajo-gestion-form-container'>
                    <form>
                        <div className='form-header'>
                            <h3>DIAGNÓSTICOS</h3>
                        </div>
                        <div className='form-level-1'>
                            <div className='form-group'>
                                <label>diagnóstico</label>
                                <textarea></textarea>
                            </div>
                        </div>
                        <div className='form-level-4'>
                            <button type='button'>Agregar</button>
                        </div>
                    </form>
                    <div className='orden-trabajo-gestion-item-container'>

                    </div>
                </div>


                <div className='orden-trabajo-gestion-form-container'>
                    <form>
                        <div className='form-header'>
                            <h3>RECOMENDACIONES</h3>
                        </div>
                        <div className='form-level-1'>
                            <div className='form-group'>
                                <label>RECOMENDACIÓN</label>
                                <textarea></textarea>
                            </div>
                        </div>
                        <div className='form-level-4'>
                            <button type='button'>Agregar</button>
                        </div>
                    </form>
                    <div className='orden-trabajo-gestion-item-container'>

                    </div>
                </div>


                <div className='orden-trabajo-gestion-form-container'>
                    <form>
                        <div className='form-header'>
                            <h3>BENEFICIOS</h3>
                        </div>
                        <div className='form-level-1'>
                            <div className='form-group'>
                                <label>BENEFICIO</label>
                                <textarea></textarea>
                            </div>
                        </div>
                        <div className='form-level-4'>
                            <button type='button'>Agregar</button>
                        </div>
                    </form>
                    <div className='orden-trabajo-gestion-item-container'>

                    </div>
                </div>

                <div className='orden-trabajo-gestion-form-container'>
                    <form>
                        <div className='form-header'>
                            <h3>DOCUMENTOS ASOCIADOS</h3>
                        </div>
                        <div className='form-level-1'>
                            <div className='form-group'>
                                <label>DOCUMENTO</label>
                                <textarea></textarea>
                            </div>
                        </div>
                        <div className='form-level-4'>
                            <button type='button'>Agregar</button>
                        </div>
                    </form>
                    <div className='orden-trabajo-gestion-item-container'>

                    </div>
                </div>

            </div>
            <div className='orden-trabajo-gestion-footer'>
                <button></button>
            </div>
        </div>

    );
};

const getColorPrioridad = (prioridad) => {
    switch (prioridad) {
        case 'Baja':
            return 'green';
        case 'Media':
            return 'orange';
        case 'Alta':
            return 'red';
        default:
            return 'white';
    }
};