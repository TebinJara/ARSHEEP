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
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [styleInput, setStyleInput] = useState("input-desenabled");

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
        setFormData(ot);
        const empleado = await obtenerEmpleadoPorId(ot.id_empleado);
        setNombreEmpleado(empleado);
        const status = await obtenerStatusPorId(ot.status);
        setNombreStatus(status);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleModificarClick = () => {
        setIsEditing(true);
        setStyleInput("");
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Aquí puedes agregar la lógica para actualizar la OT en el backend
        setStyleInput("input-desenabled");
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
            <div className='secondary-container'>
                <div className='secondary-container'>
                    <div className='filter-container'>
                        <div className='filter-container-header'>
                            <p>Filtrar</p>
                        </div>
                        <div className='filter-container-group'>
                            <select value={criterio} onChange={handleCriterioChange}>
                                <option value="id_ot">ID OT</option>
                                <option value="descripcion">Descripción</option>
                                <option value="nombreStatus">Status</option>
                                <option value="fecha_creacion">Fecha Creación</option>
                                <option value="prioridad">Prioridad</option>
                            </select>
                            <input type="text" value={filtro} onChange={handleFilterChange} placeholder="Ingrese filtro..." />
                        </div>
                        <div className='filter-container-button'>
                            <button onClick={aplicarFiltro}>Filtrar</button>
                            <button onClick={deshacerFiltro}>Deshacer</button>
                        </div>
                    </div>
                    <div className="table-container">
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
            </div>
            <div className='secondary-container'>
                {otSeleccionada && (
                    <div className='secondary-container'>
                    <div className='data-container'>
                        <div className='container-header'>
                            <h2>Información de la OT</h2>
                        </div>
                        <div className='data-item'>
                            <label>ID OT:</label>
                            <input
                                type="text"
                                name="id_ot"
                                value={formData.id_ot}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styleInput}
                            />
                        </div>
                        <div className='data-item'>
                            <label>Descripción:</label>
                            <input
                                type="text"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styleInput}
                            />
                        </div>
                        <div className='data-item'>
                            <label>Status:</label>
                            <input
                                type="text"
                                name="nombreStatus"
                                value={nombreStatus ? nombreStatus.nombre_status : 'Cargando...'}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styleInput}
                            />
                        </div>
                        <div className='data-item'>
                            <label>Fecha de Creación:</label>
                            <input
                                type="text"
                                name="fecha_creacion"
                                value={formData.fecha_creacion}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styleInput}
                            />
                        </div>
                        <div className='data-item'>
                            <label>Prioridad:</label>
                            <input
                                type="text"
                                name="prioridad"
                                value={formData.prioridad}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styleInput}
                            />
                        </div>
                        <div className='data-item'>
                            <label>Adicional:</label>
                            <input
                                type="text"
                                name="adicional"
                                value={formData.adicional}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styleInput}
                            />
                        </div>
                        <div className='data-item'>
                            <label>RUN Cliente:</label>
                            <input
                                type="text"
                                name="run_cliente"
                                value={formData.run_cliente}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styleInput}
                            />
                        </div>
                        <div className='data-item'>
                            <label>Empleado:</label>
                            <input
                                type="text"
                                name="empleado"
                                value={nombreEmpleado ? `${nombreEmpleado.pnombre} ${nombreEmpleado.snombre} ${nombreEmpleado.apaterno} ${nombreEmpleado.amaterno}` : 'Cargando...'}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styleInput}
                            />
                        </div>
                        <div className='data-item'>
                            <label>Diagnóstico:</label>
                            <input
                                type="text"
                                name="diagnostico"
                                value={formData.diagnostico}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styleInput}
                            />
                        </div>
                        <div className='data-item'>
                            <label>Reparación Realizada:</label>
                            <input
                                type="text"
                                name="reparacion_realizada"
                                value={formData.reparacion_realizada}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styleInput}
                            />
                        </div>
                        <div className='data-item'>
                            <label>Repuestos Utilizados:</label>
                            <input
                                type="text"
                                name="repuestos"
                                value={formData.repuestos}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styleInput}
                            />
                        </div>
                        <div className='data-item'>
                            <label>Imágenes Asociadas:</label>
                            <div className="imagenes-ot">
                                {formData.imagen_1 && <img src={formData.imagen_1} alt="Imagen 1" />}
                                {formData.imagen_2 && <img src={formData.imagen_2} alt="Imagen 2" />}
                                {formData.imagen_3 && <img src={formData.imagen_3} alt="Imagen 3" />}
                            </div>
                        </div>
                        </div>
                        <div className='control-buttons-container'>
                      <div className='control-buttons-container-group'>
                          <button onClick={handleModificarClick}>Modificar</button>
                          <button onClick={handleSaveClick}>Guardar</button>
                      </div>
                  </div>
                    </div>
                      
                )}
              
            </div>
        </div>
    );
}

export default PageOT;
