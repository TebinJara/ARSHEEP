import React, { useEffect, useState } from 'react';
import './GestionVisitaTecnica.css';
import { updateVisitaTecnica } from '../../../services/visitaTecnicaService';
import { createOrdenTrabajo } from '../../../services/ordenTrabajoService';
import { handleKeyDown, handleChange } from '../../../helpers/inputHelpers';
import Switch from '@mui/material/Switch';

export const GestionVisitaTecnica = ({ visita, setRefresh }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [estadoSwitch, setEstadoWitch] = useState(false);

    // Definición de estados locales para los diferentes campos de la visita técnica
    const [desc_vt, setDescVt] = useState('');
    const [desc_problema_vt, setDescProblemaVt] = useState('');
    const [analisis_vt, setAnalisisVt] = useState('');
    const [recomendacion_vt, setRecomendacionVt] = useState('');
    const [beneficio_vt, setBeneficioVt] = useState('');
    const [proximospasos_vt, setProximosPasosVt] = useState('');
    const [fec_creacion_vt, setFecCreacionVt] = useState('');
    const [numrun_cliente, setNumrunCliente] = useState('');
    const [id_empleado, setIdEmpleado] = useState('');
    const [id_estado_vt, setIdEstadoVt] = useState('');

    // useEffect para inicializar los estados locales cuando cambia el prop visita
    useEffect(() => {
        setDescVt(visita.desc_vt || '');
        setDescProblemaVt(visita.desc_problema_vt || '');
        setAnalisisVt(visita.analisis_vt || '');
        setRecomendacionVt(visita.recomendacion_vt || '');
        setBeneficioVt(visita.beneficio_vt || '');
        setProximosPasosVt(visita.proximospasos_vt || '');
        setFecCreacionVt(visita.fec_creacion_vt || '');
        setNumrunCliente(visita.numrun_cliente || '');
        setIdEmpleado(visita.id_empleado || '');
        setIdEstadoVt(visita.id_estado_vt || '');
        setEstadoWitch(false);

    }, [visita]);


    useEffect(() => {
        if(id_estado_vt !== 6){
            setIdEstadoVt(6);
        }else if(id_estado_vt === 6){
            setIdEstadoVt(visita.id_estado_vt);
        }
        console.log(id_estado_vt)
    }, [estadoSwitch]);

    // Función para actualizar una visita técnica llamando al servicio correspondiente
    const actualizarVisitaTecnica = async (id, data) => {
        try {
            await updateVisitaTecnica(id, data);
        } catch (error) {
            console.error('Error updating visita:', error);
        }
    };



    // Función para manejar el evento de guardar el formulario
    const handleSave = async (e) => {
        e.preventDefault();
    
        const userConfirmed = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
    
        if (!userConfirmed) {
            return;
        }
    
        const updatedVisita = {
            desc_vt,
            desc_problema_vt,
            analisis_vt,
            recomendacion_vt,
            beneficio_vt,
            id_estado_vt
        };
    
        try {
            await actualizarVisitaTecnica(visita.id_vt, updatedVisita);
            // Actualiza el estado de refresh
            setRefresh(prev => !prev);
            // Muestra el mensaje de éxito
            setSuccessMessage('¡Información actualizada con éxito!');
            alert('¡Información actualizada con éxito!');
            console.log(updatedVisita)
        } catch (error) {
            // Manejo del error en caso de que ocurra
            console.error('Error al actualizar la visita técnica:', error);
        }
    };

    const handleEstadoChangeSwitch = (event) => {
        const nuevoEstado = event.target.checked;
        setEstadoWitch(nuevoEstado);
    }

    return (
        <div className='visita-tecnica-gestion-container'>
            <div className='visita-tecnica-gestion-header'>
                <h2>ACTUALIZAR VISITA # {visita.ESTABLECIMIENTO.id_establecimiento} DEL {visita.fec_creacion_vt}</h2>
            </div>
            <div className='visita-tecnica-gestion-content'>
                <div className='visita-tecnica-gestion-form-container'>
                    <form onSubmit={handleSave}>
                        <div className='form-level-1'>
                            <div className='form-group'>
                                {successMessage && <p>{successMessage}</p>}
                                <label>DESCRIPCIÓN</label>
                                <input
                                    type='text'
                                    value={desc_vt}
                                    onChange={(e) => handleChange(e, setDescVt, 'uppercase')}
                                    maxLength="60"
                                />
                                <label>PROBLEMA</label>
                                <textarea
                                    value={desc_problema_vt}
                                    onChange={(e) => setDescProblemaVt(e.target.value)}
                                    maxLength="1000"
                                ></textarea>
                                <label>ANALISIS</label>
                                <textarea
                                    value={analisis_vt}
                                    onChange={(e) => setAnalisisVt(e.target.value)}
                                    maxLength="1000"
                                ></textarea>
                                <label>RECOMENDACIONES</label>
                                <textarea
                                    value={recomendacion_vt}
                                    onChange={(e) => setRecomendacionVt(e.target.value)}
                                    maxLength="1000"
                                ></textarea>
                                <label>BENEFICIOS</label>
                                <textarea
                                    value={beneficio_vt}
                                    onChange={(e) => setBeneficioVt(e.target.value)}
                                    maxLength="1000"
                                ></textarea>
                            </div>
                        </div>
                        <div className='form-level-2'>
                            {visita.id_estado_vt !== 6 &&
                                <div className='switch_container'>
                                    <Switch
                                        checked={estadoSwitch}
                                        onChange={handleEstadoChangeSwitch}
                                        className="custom-switch"
                                    />
                                    <label>
                                        {estadoSwitch ? 'NO GENERAR O.T.' : 'GENERAR O.T.'}
                                    </label>
                                </div>
                            }
                        </div>
                        <div className='form-level-4'>
                            <button type='submit'>ACTUALIZAR</button>
                            {estadoSwitch &&
                               ""
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
