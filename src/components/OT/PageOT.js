import React, { useEffect, useState } from 'react';
import "../OT/PageOT.css";
import { obtenerOrdenesDeTrabajo, obtenerEmpleadoPorId, obtenerStatusPorId } from '../../services/supa';

export const PageOT = () => {
    const [data, setData] = useState([]);
    const [otSeleccionada, setOtSeleccionada] = useState(null);
    const [nombreEmpleado, setNombreEmpleado] = useState(null);
    const [nombreStatus, setNombreStatus] = useState(null);

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
            }
        };
        fetchData();
    }, []);

    const seleccionarOT = async (ot) => {
        setOtSeleccionada(ot);
        const empleado = await obtenerEmpleadoPorId(ot.id_empleado);
        setNombreEmpleado(empleado);
        const status = await obtenerStatusPorId(ot.status);
        setNombreStatus(status);
    };

    return (
        <div className='principal-container'>
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
                    {data.map((ot) => (
                        <tr key={ot.id_ot} onClick={() => seleccionarOT(ot)} className="table-row">
                            <td>{ot.id_ot}</td>
                            <td>{ot.descripción}</td>
                            <td>{ot.nombreStatus}</td>
                            <td>{ot.fecha_creacion}</td>
                            <td>{ot.fecha_vencimiento}</td>
                            <td>{ot.prioridad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {otSeleccionada && (
                <div className='info-ot'>
                    <h2>Información de la OT</h2>
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
    );
}

export default PageOT;
