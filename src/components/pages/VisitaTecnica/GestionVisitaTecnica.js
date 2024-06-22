import React, { useEffect, useState } from 'react';
import './GestionVisitaTecnica.css';
import { updateVisitaTecnica, uploadPdf } from '../../../services/visitaTecnicaService';
import Switch from '@mui/material/Switch';
import { getCurrentDate, getMaxDate } from '../../../helpers/dateHelper';
import { getEstablecimientos } from '../../../services/establecimientoService';
import { getTiposMantenimiento } from '../../../services/tipoMantenimientoService';
import { getEmpleados } from '../../../services/empleadoService';
import { getPresupuestoVtById, getPresupuestoVtByIdVt, getPresupuestosVt } from '../../../services/presupuestoVtService';
import { sendMailOTasignation } from '../../../services/emailService';
import { getOrdenTrabajoByIdvt, createOrdenTrabajo } from '../../../services/ordenTrabajoService';
import { useNavigate } from 'react-router-dom';

export const GestionVisitaTecnica = ({ visita, setRefresh }) => {
    const [successMessage, setSuccessMessage] = useState('');
    const [estadoSwitch, setEstadoSwitch] = useState(false);
    const [id_estado_vt, setIdEstadoVt] = useState('');
    const [orden_trabajo, setOrdenTrabajo] = useState({});
    const [refresh2, setRefresh2] = useState(false);



    const navigate = useNavigate();

    //Definición Objeto a enviar
    const [formData, setFormData] = useState({
        fec_programacion_vt: '',
        id_tipo_mantenimiento: '',
        id_empleado: '',
        id_establecimiento: '',
        desc_vt: '',
        desc_problema_vt: '',
        analisis_vt: '',
        recomendacion_vt: '',
        beneficio_vt: '',
        id_estado_vt: '',
    });

    const [empleados, setEmpleados] = useState([]);
    const [establecimientos, setEstablecimientos] = useState([]);
    const [tipoMantenimiento, setTipoMantenimiento] = useState([]);
    const [presupuestos, setPresupuestos] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        setFormData({
            fec_programacion_vt: visita.fec_programacion_vt || '',
            id_tipo_mantenimiento: visita.id_tipo_mantenimiento || '',
            id_empleado: visita.id_empleado || '',
            id_establecimiento: visita.id_establecimiento || '',
            desc_vt: visita.desc_vt || '',
            desc_problema_vt: visita.desc_problema_vt || '',
            analisis_vt: visita.analisis_vt || '',
            recomendacion_vt: visita.recomendacion_vt || '',
            beneficio_vt: visita.beneficio_vt || '',
            id_estado_vt: visita.id_estado_vt || '',
        });
        fetchData();
        setFile("");

    }, [visita, refresh2]);

    useEffect(() => {
        if (estadoSwitch) {
            setIdEstadoVt(6);
        } else {
            setIdEstadoVt(visita.id_estado_vt);
        }

    }, [estadoSwitch, visita.id_estado_vt]);


    const fetchData = async () => {
        await fetchEmpleados();
        await fetchEstablecimientos();
        await fetchTipoMantenimientos();
        await fetchPresupuestos();
    };

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

    const fetchPresupuestos = async () => {
        try {
            const data = await getPresupuestoVtByIdVt(visita.id_vt);
            if (data) {
                setPresupuestos(data);
                return
            }
            setPresupuestos([]);
            console.log("presupuestos", data)
        } catch (error) {
            console.error('Error fetching presupuestos:', error);
        }

    }
    const fetchOrdenTrabajo = async () => {
        try {
            const data = await getOrdenTrabajoByIdvt(visita.id_vt);
            setOrdenTrabajo(data);
            console.log('id orden trabajo', data);
        } catch (error) {
            console.error('Error fetching OT_VT:', error);
        }
    };


    const actualizarVisitaTecnica = async (id, data) => {
        try {
            await updateVisitaTecnica(id, data);
        } catch (error) {
            console.error('Error updating visita:', error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const userConfirmed = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (!userConfirmed) {
            return;
        }
        formData.id_estado_vt = id_estado_vt;
        try {
            const updatedVisita = await actualizarVisitaTecnica(visita.id_vt, formData);
            setRefresh(prev => !prev);
            setSuccessMessage('¡Información actualizada con éxito!');
            alert('¡Información actualizada con éxito!');

            if (id_estado_vt === 6) {
                const dataot = {
                    id_vt: visita.id_vt,
                    desc_ot: `ORDEN DE TRABAJO PARA V.T. ${visita.id_vt}`,
                    id_empleado: visita.id_empleado,

                }

                await createOrdenTrabajo(dataot)

                const ot = getOrdenTrabajoByIdvt(dataot.id_vt);
                setOrdenTrabajo(ot);
                console.log('que wea trae', ot);

                const correo = {
                    destinatario: visita.EMPLEADO.correo,
                    asunto: 'Asignación de Orden de Trabajo',
                    texto: `Hola ${visita.EMPLEADO.pnombre}, se te ha asignado una nueva Orden de Trabajo, por la visita tecnica ${visita.id_vt}.`
                };
                try {
                    await sendMailOTasignation(correo);
                    console.log('Correo enviado con éxito');
                    navigate('/Layout/OT'); 
                } catch (error) {
                    console.error('Error al enviar el correo:', error);
                }
            }
        } catch (error) {
            console.error('Error al actualizar la visita técnica:', error);
        }
    };

    const handleEstadoChangeSwitch = (event) => {
        const nuevoEstado = event.target.checked;
        setEstadoSwitch(nuevoEstado);
    };


    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Por favor, selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);

        const response = await uploadPdf(file, visita.id_vt);
        setFile('');
        if (response) {
            alert('El documento se ha agregado exitosamente.')
            setRefresh2(!refresh2);
        } else {
            alert('Hubo un error al intentar agregar el documento. Por favor, inténtalo nuevamente.')
        }
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
                                <label>FECHA DE TRABAJO:</label>
                                <input
                                    type="date"
                                    name="fec_programacion_vt"
                                    value={formData.fec_programacion_vt}
                                    onChange={handleChange}
                                    min={getCurrentDate()}
                                    max={getMaxDate()}
                                    required
                                />
                                <label>FECHA DE VENCIMIENTO:</label>
                                <input
                                    type="date"
                                    name="fec_programacion_vt"
                                    value={formData.fec_programacion_vt}
                                    onChange={handleChange}
                                    min={getCurrentDate()}
                                    max={getMaxDate()}
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
                                    value={formData.desc_vt}
                                    onChange={handleChange}
                                    maxLength="60"
                                    required
                                />
                                <label>PROBLEMA</label>
                                <textarea
                                    name='desc_problema_vt'
                                    value={formData.desc_problema_vt}
                                    onChange={handleChange}
                                    maxLength="1000"
                                ></textarea>
                                <label>ANALISIS</label>
                                <textarea
                                    name='analisis_vt'
                                    value={formData.analisis_vt}
                                    onChange={handleChange}
                                    maxLength="1000"
                                ></textarea>
                                <label>RECOMENDACIONES</label>
                                <textarea
                                    name='recomendacion_vt'
                                    value={formData.recomendacion_vt}
                                    onChange={handleChange}
                                    maxLength="1000"
                                ></textarea>
                                <label>BENEFICIOS</label>
                                <textarea
                                    name='beneficio_vt'
                                    value={formData.beneficio_vt}
                                    onChange={handleChange}
                                    maxLength="1000"
                                ></textarea>
                                <label>PRESUPESTOS</label>


                            </div>
                        </div>
                        <div className='form-level-2'>

                            {visita.id_estado_vt !== 6 &&
                                <div>
                                    <label>GENERAR O.T.</label>
                                    <div className='switch_container'>
                                        <Switch
                                            checked={estadoSwitch}
                                            onChange={handleEstadoChangeSwitch}
                                            className="custom-switch"
                                        />
                                        <label>
                                            {estadoSwitch ? 'Si ' : 'No '}
                                        </label>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='form-level-4'>
                            <button type='submit'>ACTUALIZAR</button>
                        </div>
                    </form>
                    <div className>

                        <div className='input-file-container' >
                            <img
                                src="../../img/upload-file.png"
                                alt="Seleccionar archivo"
                                onClick={() => document.getElementById('fileUpload').click()}
                                className="image-input"
                            />
                            <input
                                type="file"
                                id="fileUpload"
                                style={{ display: 'none' }}
                                accept=".pdf"
                                onChange={handleFileChange}
                            />

                            <button
                                className={file ? 'enabled' : 'disabled'}
                                disabled={!file}
                                onClick={handleUpload}
                            >
                                Subir</button>
                            {(presupuestos.length === 0 && !file) && <p>No has subido documentos</p>}
                        </div>
                        <div className='file-container'>
                            {presupuestos.length > 0 ? (
                                presupuestos.map((presupuesto) => (
                                    <div key={presupuesto.id_presupuesto_vt}>
                                        <a href={presupuesto.url_presupuesto_vt} download>
                                            <img
                                                src={'../../img/pdf.png'}
                                                alt='Imagen de'
                                            />
                                        </a>
                                        <p>{presupuesto.desc_presupuesto_vt}</p>
                                    </div>
                                ))
                            ) : (""
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
