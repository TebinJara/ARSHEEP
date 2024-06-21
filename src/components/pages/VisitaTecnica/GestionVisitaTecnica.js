import React, { useEffect, useState } from 'react';
import './GestionVisitaTecnica.css';
import { updateVisitaTecnica } from '../../../services/visitaTecnicaService';
import Switch from '@mui/material/Switch';
import { getCurrentDate } from '../../../helpers/dateHelper';
import { getEstablecimientos } from '../../../services/establecimientoService';
import { getTiposMantenimiento } from '../../../services/tipoMantenimientoService';
import { getEmpleados } from '../../../services/empleadoService';

export const GestionVisitaTecnica = ({ visita, setRefresh }) => {
    // Estado para mostrar un mensaje de éxito
    const [successMessage, setSuccessMessage] = useState('');
    // Estado para controlar el switch
    const [estadoSwitch, setEstadoSwitch] = useState(false);

    // Definición de estados locales para los diferentes campos de la visita técnica

    const [id_estado_vt, setIdEstadoVt] = useState('');


    //Definición Objeto a enviar
    const [formData, setFormData] = useState({
        fec_programacion_vt: '',
        id_tipo_mantenimiento: '',
        id_empleado: '',
        id_establecimiento: '',
        desc_vt: '',
        desc_problema_vt:'',
        analisis_vt: '',
        recomendacion_vt: '',
        beneficio_vt:'',
    });

    //Arreglo de objetos
    const [empleados, setEmpleados] = useState([]);
    const [establecimientos, setEstablecimientos] = useState([]);
    const [tipoMantenimiento, setTipoMantenimiento] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: (name === 'id_empleado' || name === 'id_establecimiento' || name === 'id_tipo_mantenimiento')
                ? Number(value)
                : (typeof value === 'string' ? value.toUpperCase() : value),
        }));
    };

    useEffect(() => {
        console.log(formData)
    }, [formData]);


    // useEffect para inicializar los estados locales cuando cambia el prop visita
    useEffect(() => {
        formData.fec_programacion_vt = visita.fec_programacion_vt ;
        formData.id_tipo_mantenimiento = visita.id_tipo_mantenimiento ;
        formData.id_empleado = visita.id_empleado ;
        formData.id_establecimiento = visita.id_establecimiento ;
        formData.desc_vt = visita.desc_vt ;
        formData.desc_problema_vt = (visita.desc_problema_vt||'') ;
        formData.analisis_vt = (visita.analisis_vt||'') ;
        formData.recomendacion_vt = (visita.recomendacion_vt||'') ;
        formData.beneficio_vt = (visita.beneficio_vt||'') ;
        console.log(visita)
        fetchData();
    }, [visita]);

    //Funciones de FETCH
    const fetchEmpleados = async () => {
        try {
            const data = await getEmpleados();
            setEmpleados(data);
        } catch (error) {
            console.error('Error fetching empleados:', error);
        }
    };

    const fetchTipoMantenimientos = async () => {
        try {
            const data = await getTiposMantenimiento();
            setTipoMantenimiento(data);
        } catch (error) {
            console.error('Error fetching tipoMantenimientos:', error);
        }
    };

    const fetchEstablecimientos = async () => {
        try {
            const data = await getEstablecimientos();
            setEstablecimientos(data);
        } catch (error) {
            console.error('Error fetching establecimientos:', error);
        }
    };

    const fetchData = async () => {
        await fetchEmpleados();
        await fetchEstablecimientos();
        await fetchTipoMantenimientos();
    };

    // useEffect para actualizar el estado `id_estado_vt` basado en `estadoSwitch`
    useEffect(() => {
        if (estadoSwitch) {
            setIdEstadoVt(6);
        } else {
            setIdEstadoVt(visita.id_estado_vt); 
        }
    }, [estadoSwitch, visita.id_estado_vt]);

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

        try {
            await actualizarVisitaTecnica(visita.id_vt, formData);
            setRefresh(prev => !prev);
            setSuccessMessage('¡Información actualizada con éxito!');
            alert('¡Información actualizada con éxito!');
        } catch (error) {
            console.error('Error al actualizar la visita técnica:', error);
        }
    };

    // Función para manejar el cambio del estado del switch
    const handleEstadoChangeSwitch = (event) => {
        const nuevoEstado = event.target.checked;
        setEstadoSwitch(nuevoEstado);
    };

    return (
        <div className='visita-tecnica-gestion-container'>
            <div className='visita-tecnica-gestion-header'>
                <h1>ACTUALIZAR VISITA TÉCNICA</h1>
                <div>
                    <p>VISITA TÉCNICA: {visita.id_vt} </p>
                    <p>FECHA AGENDAMIENTO: {visita.fec_creacion_vt} </p>
                    <p>ESTADO: {visita.ESTADO_VISITA_TECNICA.desc_estado_vt}</p>
                    <p>TÉCNICO: {visita.EMPLEADO.pnombre} {visita.EMPLEADO.apaterno} {visita.EMPLEADO.amaterno}</p>
                </div>
            </div>
            <div className='visita-tecnica-gestion-content'>
                <div className='visita-tecnica-gestion-form-container'>
                    <form onSubmit={handleSave}>
                        <div className='form-level-1'>
                            <div className='form-group'>
                                {successMessage && <p>{successMessage}</p>}
                                <label>FECHA DE VISITA:</label>
                                <input
                                    type="date"
                                    name="fec_programacion_vt"
                                    value={formData.fec_programacion_vt}
                                    onChange={handleChange}
                                    min={getCurrentDate()}
                                    required
                                />
                                <label>MANTENIMIENTO:</label>
                                <select
                                    name="id_tipo_mantenimiento"
                                    value={formData.id_tipo_mantenimiento}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">SELECCIONE EL TIPO DE MANTENIMIENTO</option>
                                    {tipoMantenimiento.map((tipoMantenimiento) => (
                                        <option
                                            key={tipoMantenimiento.id_tipo_mantenimiento}
                                            value={tipoMantenimiento.id_tipo_mantenimiento}
                                        >
                                            {tipoMantenimiento.desc_tipo_mantenimiento}
                                        </option>
                                    ))}
                                </select>
                                <label>EMPLEADO:</label>
                                <select
                                     name="id_empleado"
                                     value={formData.id_empleado}
                                     onChange={handleChange}
                                     required
                                >
                                    <option value="">SELECCIONE UN EMPLEADO</option>
                                    {empleados.map((empleado) => (
                                        <option
                                            key={empleado.id_empleado}
                                            value={empleado.id_empleado}
                                        >
                                            {empleado.pnombre + " " + empleado.apaterno + " " + empleado.amaterno}
                                        </option>
                                    ))}
                                </select>
                                <label>ESTABLECIMIENTO:</label>
                                <select
                                     name="id_establecimiento"
                                     value={formData.id_establecimiento}
                                     onChange={handleChange}
                                     required
                                >
                                    <option value="">SELECCIONE UN ESTABLECIMIENTO</option>
                                    {establecimientos.map((establecimiento) => (
                                        <option
                                            key={establecimiento.id_establecimiento}
                                            value={establecimiento.id_establecimiento}
                                        >
                                            {establecimiento.nombre_establecimiento}
                                        </option>
                                    ))}
                                </select>
                                <label>DESCRIPCIÓN</label>
                                <input
                                    name="desc_vt"
                                    type='text'
                                    value={formData.desc_vt.toUpperCase()}
                                    onChange={handleChange}
                                    maxLength="60"
                                />
                                <label>PROBLEMA</label>
                                <textarea
                                    name = 'desc_problema_vt'
                                    value={formData.desc_problema_vt}
                                    onChange={handleChange}
                                    maxLength="1000"
                                ></textarea>
                                <label>ANALISIS</label>
                                <textarea
                                    name = 'analisis_vt'
                                    value={formData.analisis_vt}
                                    onChange={handleChange}
                                    maxLength="1000"
                                ></textarea>
                                <label>RECOMENDACIONES</label>
                                <textarea
                                    name = 'recomendacion_vt'
                                    value={formData.recomendacion_vt}
                                    onChange={handleChange}
                                    maxLength="1000"
                                ></textarea>
                                <label>BENEFICIOS</label>
                                <textarea
                                    name = 'beneficio_vt'
                                    value={formData.beneficio_vt}
                                    onChange={(handleChange)}
                                    maxLength="1000"
                                ></textarea>
                            </div>
                        </div>
                        <div className='form-level-2'>
                            {visita.id_estado_vt !== 6 &&
                                <div className='switch_container'>
                                    <Switch
                                        checked={estadoSwitch}
                                        onChange={handleChange}
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
