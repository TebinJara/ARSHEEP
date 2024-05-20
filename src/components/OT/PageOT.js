import React, { useEffect, useState } from 'react';
import "../OT/PageOT.css";
import { obtenerOrdenesDeTrabajo } from '../../services/supa';

export const PageOT = () => {
    const [data, setData] = useState([]);
    const [otSeleccionada, setOtSeleccionada] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const ordenes = await obtenerOrdenesDeTrabajo();
            if (ordenes) {
                setData(ordenes);
            }
        };
        fetchData();
    }, []);

    const seleccionarOT = ot => {
        setOtSeleccionada(ot);
    };

    return (
        <div className='ots-container'>
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
                            <td>{ot.status}</td>
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
                    <p><strong>Status:</strong> {otSeleccionada.status}</p>
                    <p><strong>Fecha de Creación:</strong> {otSeleccionada.fecha_creacion}</p>
                    <p><strong>Prioridad:</strong> {otSeleccionada.prioridad}</p>
                    <p><strong>Adicional:</strong> {otSeleccionada.adicional}</p>
                    <p><strong>RUN Cliente:</strong> {otSeleccionada.run_cliente}</p>
                    <p><strong>ID Empleado:</strong> {otSeleccionada.id_empleado}</p>
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
