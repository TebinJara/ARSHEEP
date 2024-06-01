import React, { useEffect, useState } from 'react';
import "./PageCliente.css";
import { obtenerClientes, eliminarCliente } from '../../services/ClienteService';
import { FormAgregarCliente } from './FormAgregarCliente';
import { DashboardDetailsCliente } from './DashboardDetailsCliente';

// Componente principal para la página de clientes
export const PageCliente = () => {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [criterio, setCriterio] = useState('pnombre_cliente');
    const [showModal, setShowModal] = useState(false);

    // Función para obtener datos de clientes desde la API
    const fetchData = async () => {
        try {
            const clientes = await obtenerClientes();
            console.log('Clientes obtenidos:', clientes);
            setData(clientes || []);
            setFilteredData(clientes || []);
        } catch (error) {
            console.error('Error al obtener clientes:', error);
        }
    };

    useEffect(() => {
        console.log('Efecto inicial para obtener clientes');
        fetchData();
    }, []);

    useEffect(() => {
        console.log('Data ha cambiado, actualizando filteredData:', data);
        setFilteredData(data);
    }, [data]);

    // Función para formatear el RUT
    const formatearRUT = (run, dv) => {
        const runStr = run.toString();
        const runFormateado = runStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return `${runFormateado}-${dv}`;
    };

    // Función para formatear la fecha
    const formatearFecha = (fecha) => {
        if (!fecha) return '';
        const [year, month, day] = fecha.split('-');
        return `${day}-${month}-${year}`;
    };

    // Función para seleccionar un cliente y formatear sus fechas
    const seleccionarCliente = cliente => {
        const clienteFormateado = {
            ...cliente,
            fecnac_cliente: formatearFecha(cliente.fecnac_cliente),
            fec_inicio_contrato_cliente: formatearFecha(cliente.fec_inicio_contrato_cliente),
            fec_termino_contrato_cliente: formatearFecha(cliente.fec_termino_contrato_cliente),
            fec_creacion_cliente: formatearFecha(cliente.fec_creacion_cliente)
        };
        setClienteSeleccionado(clienteFormateado);
        console.log(cliente);
    };

    const handleFilterChange = e => {
        setFiltro(e.target.value);
    };

    const handleCriterioChange = e => {
        setCriterio(e.target.value);
    };

    // Función para aplicar el filtro
    const aplicarFiltro = () => {
        const filtered = data.filter(cliente => cliente[criterio]?.toString().toLowerCase().includes(filtro.toLowerCase()));
        setFilteredData(filtered);
    };

    // Función para deshacer el filtro
    const deshacerFiltro = () => {
        setFilteredData(data);
        setFiltro('');
    };

    const handleShowModal = () => {
        setShowModal(true);
        setClienteSeleccionado(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseDashboard = () => {
        setClienteSeleccionado(null);
    };

    // Función para eliminar un cliente
    const handleEliminarCliente = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este cliente?');
        if (confirmacion) {
            try {
                const respuesta = await eliminarCliente(id);
                if (respuesta) {
                    console.log('Cliente eliminado, actualizando lista');
                    await fetchData(); // Vuelve a obtener los datos después de eliminar el cliente
                    deshacerFiltro(); // Aplica la lógica de deshacer filtro para actualizar la tabla
                    setClienteSeleccionado(null); // Cierra los detalles del cliente
                } else {
                    console.error('Error al eliminar el cliente');
                }
            } catch (error) {
                console.error('Error en la solicitud de eliminación:', error);
                console.log(id);
            }
        }
    };



    return (
        <div className='principal-container'>
            <div className='secondary-container'>
                <div className='filter-container'>
                    <div className='filter-container-header'>
                        <p>Filtrar</p>
                    </div>
                    <div className='filter-container-group'>
                        <select value={criterio} onChange={handleCriterioChange}>
                            <option value="numrun_cliente">RUT</option>
                            <option value="dvrun_cliente">DV</option>
                            <option value="pnombre_cliente">Primer Nombre</option>
                            <option value="snombre_cliente">Segundo Nombre</option>
                            <option value="appaterno_cliente">Apellido Paterno</option>
                            <option value="apmaterno_cliente">Apellido Materno</option>
                            <option value="razon_social_cliente">Razón Social</option>
                            <option value="fec_inicio_contrato_cliente">Inicio Contrato</option>
                            <option value="fec_termino_contrato_cliente">Término Contrato</option>
                            <option value="fec_creacion_cliente">Fecha Creación</option>
                        </select>
                        <input type="text" value={filtro} onChange={handleFilterChange} placeholder="Ingrese filtro..." />
                    </div>
                    <div className='filter-container-button'>
                        <button onClick={aplicarFiltro}>Filtrar</button>
                        <button onClick={deshacerFiltro}>Deshacer</button>
                    </div>
                </div>
                <div className='control-buttons-container'>
                    <div className='control-buttons-container-group'>
                        <button onClick={handleShowModal}>Agregar Cliente</button>
                        <button>PDF</button>
                        <button>Excel</button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>RUT</th>
                                <th>Primer Nombre</th>
                                <th>Segundo Nombre</th>
                                <th>Apellido Paterno</th>
                                <th>Apellido Materno</th>
                                <th>Razón Social</th>
                                <th>Inicio Contrato</th>
                                <th>Término Contrato</th>
                                <th>Fecha Creación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((cliente) => (
                                <tr key={cliente.numrun_cliente} onClick={() => seleccionarCliente(cliente)} className="table-row">
                                    <td>{formatearRUT(cliente.numrun_cliente, cliente.dvrun_cliente)}</td>
                                    <td>{cliente.pnombre_cliente}</td>
                                    <td>{cliente.snombre_cliente}</td>
                                    <td>{cliente.appaterno_cliente}</td>
                                    <td>{cliente.apmaterno_cliente}</td>
                                    <td>{cliente.razon_social_cliente}</td>
                                    <td>{formatearFecha(cliente.fec_inicio_contrato_cliente)}</td>
                                    <td>{formatearFecha(cliente.fec_termino_contrato_cliente)}</td>
                                    <td>{formatearFecha(cliente.fec_creacion_cliente)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
               
            </div>
            {showModal && <FormAgregarCliente onClose={handleCloseModal} />}
            {clienteSeleccionado && (
                <DashboardDetailsCliente
                    clienteSeleccionado={clienteSeleccionado}
                    onClose={handleCloseDashboard}
                    onEliminar={handleEliminarCliente}
                    onUpdateCliente={fetchData}
                />
            )}
        </div>
    );
};

export default PageCliente;
