import React, { useEffect, useState } from 'react';
import "../OT/PageOT.css";
import { obtenerOrdenesDeTrabajo, obtenerEmpleadoPorId, obtenerStatusPorId } from '../../services/supa';

export const PageOT = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [otSeleccionada, setOtSeleccionada] = useState(null);
    const [nombreEmpleado, setNombreEmpleado] = useState(null);
    const [nombreStatus, setNombreStatus] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [criterio, setCriterio] = useState('id_ot');

    useEffect(() => {
        const fetchData = async () => {
            const ordenes = await obtenerOrdenesDeTrabajo();
            if (ordenes) {
                const updatedOrdenes = await Promise.all(
                    ordenes.map(async (ot) => {
                        const empleado = await obtenerEmpleadoPorId(ot.id_empleado);
                        const status = await obtenerStatusPorId(ot.status);
                        return {
                            ...ot,
                            nombreEmpleado: empleado
                                ? `${empleado.pnombre} ${empleado.snombre} ${empleado.apaterno} ${empleado.amaterno}`
                                : 'Desconocido',
                            nombreStatus: status ? status.nombre_status : 'Desconocido'
                        };
                    })
                );
                setData(updatedOrdenes);
                setFilteredData(updatedOrdenes);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const seleccionarOT = async (ot) => {
        setOtSeleccionada(ot);
        const empleado = await obtenerEmpleadoPorId(ot.id_empleado);
        setNombreEmpleado(empleado);
        const status = await obtenerStatusPorId(ot.status);
        setNombreStatus(status);
    };

    const handleFilterChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleCriterioChange = (e) => {
        setCriterio(e.target.value);
    };

    const aplicarFiltro = () => {
        const filtered = data.filter(ot => ot[criterio].toString().toLowerCase().includes(filtro.toLowerCase()));
        setFilteredData(filtered);
    };

    const deshacerFiltro = () => {
        setFilteredData(data);
        setFiltro('');
    };

    return (
        <div className='principal-container'>
            <div className='secondary-container-row'>
                <div className='secondary-container'>
                    <div className='simple-container'>
                        <div className='simple-container-header'>
                            <p>Filtrar</p>
                        </div>
                        <select value={criterio} onChange={handleCriterioChange}>
                            <option value="id_ot">ID OT</option>
                            <option value="descripcion">Descripción</option>
                            <option value="nombreStatus">Status</option>
                            <option value="fecha_creacion">Fecha Creación</option>
                            <option value="prioridad">Prioridad</option>
                        </select>
                        <input type="text" value={filtro} onChange={handleFilterChange} placeholder="Ingrese filtro..." />
                        <div className='simple-container-row-buttons'>
                            <button onClick={aplicarFiltro}>Filtrar</button>
                            <button onClick={deshacerFiltro}>Deshacer</button>
                        </div>
                    </div>
                    <div className='table-container'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID OT</th>
                                    <th>Descripción</th>
                                    <th>Status</th>
                                    <th>Fecha Creación</th>
                                    <th>Fecha Vencimiento</th>
                                    <th>Prioridad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((ot) => (
                                    <tr key={ot.id_ot} onClick={() => seleccionarOT(ot)} className="table-row">
                                        <td>{ot.id_ot}</td>
                                        <td>{ot.descripcion}</td>
                                        <td>{ot.nombreStatus}</td>
                                        <td>{ot.fecha_creacion}</td>
                                        <td>{ot.fecha_vencimiento}</td>
                                        <td>{ot.prioridad}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='simple-container'>
                    {otSeleccionada && (
                        <div className='info-ot'>
                            <div className='container-header'>
                                <h2>Información de la OT</h2>
                            </div>
                            <p><strong>ID OT:</strong> {otSeleccionada.id_ot}</p>
                            <p><strong>Descripción:</strong> {otSeleccionada.descripcion}</p>
                            <p><strong>Status:</strong> {nombreStatus ? nombreStatus.nombre_status : 'Cargando...'}</p>
                            <p><strong>Fecha de Creación:</strong> {otSeleccionada.fecha_creacion}</p>
                            <p><strong>Prioridad:</strong> {otSeleccionada.prioridad}</p>
                            <p><strong>Adicional:</strong> {otSeleccionada.adicional}</p>
                            <p><strong>RUN Cliente:</strong> {otSeleccionada.run_cliente}</p>
                            <p><strong>Empleado:</strong> {nombreEmpleado
                                ? `${nombreEmpleado.pnombre} ${nombreEmpleado.snombre} ${nombreEmpleado.apaterno} ${nombreEmpleado.amaterno}`
                                : 'Cargando...'}
                            </p>
                            <div>
                                <h3>Diagnóstico</h3>
                                <p>{otSeleccionada.diagnostico}</p>
                            </div>
                            <div>
                                <h3>Reparación Realizada</h3>
                                <p>{otSeleccionada.reparacion_realizada}</p>
                            </div>
                            <div>
                                <h3>Repuestos Utilizados</h3>
                                <p>{otSeleccionada.repuestos}</p>
                            </div>
                            <div>
                                <h3>Imágenes Asociadas</h3>
                                <div className="imagenes-ot">
                                    {otSeleccionada.imagen_1 && <img src={otSeleccionada.imagen_1} alt="Imagen 1" />}
                                    {otSeleccionada.imagen_2 && <img src={otSeleccionada.imagen_2} alt="Imagen 2" />}
                                    {otSeleccionada.imagen_3 && <img src={otSeleccionada.imagen_3} alt="Imagen 3" />}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PageOT;
