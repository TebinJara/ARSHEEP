import React, { useEffect, useState } from 'react';
import './GestionVisitaTecnica.css';
import { updateVisitaTecnica } from '../../../services/visitaTecnicaService';
import { createOrdenTrabajo } from '../../../services/ordenTrabajoService';

export const GestionVisitaTecnica = ({ visita, setRefresh }) => {
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
    }, [visita]);

    const actualizarVisitaTecnica = async (id, data) => {
        try {
            await updateVisitaTecnica(id, data);
        } catch (error) {
            console.error('Error updating visita:', error);
        }
    };

    const descOt = {
        desc_ot: "hola"
    }

    const crearOT = async (data) => {
        try {
            await createOrdenTrabajo(data);
        } catch (error) {
            console.error('Error create OT:', error);
        }
    };

    const handleSave = (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        const updatedVisita = {
            desc_vt
        };
        actualizarVisitaTecnica(visita.id_vt, updatedVisita);
        setRefresh(prev => !prev); // Actualiza el estado de refresh
    };

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
                                <label>DESCRIPCIÓN</label>
                                <input
                                    type='text'
                                    value={desc_vt}
                                    onChange={(e) => setDescVt(e.target.value)}
                                />
                                <label>PROBLEMA</label>
                                <textarea
                                    value={desc_problema_vt}
                                    onChange={(e) => setDescProblemaVt(e.target.value)}
                                ></textarea>
                                <label>ANALISIS</label>
                                <textarea
                                    value={analisis_vt}
                                    onChange={(e) => setAnalisisVt(e.target.value)}
                                ></textarea>
                                <label>RECOMENDACIONES</label>
                                <textarea
                                    value={recomendacion_vt}
                                    onChange={(e) => setRecomendacionVt(e.target.value)}
                                ></textarea>
                                <label>BENEFICIOS</label>
                                <textarea
                                    value={beneficio_vt}
                                    onChange={(e) => setBeneficioVt(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className='form-level-2'>
                            {/* Otros campos del formulario */}
                        </div>
                        <div className='form-level-4'>
                            <button type='submit'>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='visita-tecnica-gestion-footer'>
                <button>ACTUALIZAR</button>
                <button onClick={() => crearOT(descOt)}>GENERAR O.T.</button>
            </div>
        </div>
    );
};
