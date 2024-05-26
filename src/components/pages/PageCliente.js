import React, { useEffect, useState } from 'react';
import "./PageCliente.css";
import { obtenerClientes, eliminarCliente } from '../../services/ClienteService';
import { FormAgregarCliente } from './FormAgregarCliente';
import { DashboardDetailsCliente } from './DashboardDetailsCliente';

export const PageCliente = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [criterio, setCriterio] = useState('nombre_cliente');
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        try {
            const clientes = await obtenerClientes();
            console.log('Clientes obtenidos:', clientes); // Log para verificar datos obtenidos
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

    const formatearRUT = (run, dv) => {
        const runStr = run.toString();
        const runFormateado = runStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return `${runFormateado}-${dv}`;
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return '';
        const [year, month, day] = fecha.split('-');
        return `${day}-${month}-${year}`;
    };

    const seleccionarCliente = cliente => {
        // Formatea las fechas antes de establecer el cliente seleccionado
        const clienteFormateado = {
            ...cliente,
            fecha_contrato_inicio: formatearFecha(cliente.fecha_contrato_inicio),
            fecha_contrato_termino_cliente: formatearFecha(cliente.fecha_contrato_termino_cliente),
        };
        setClienteSeleccionado(clienteFormateado);
    };

    const handleFilterChange = e => {
        setFiltro(e.target.value);
    };

    const handleCriterioChange = e => {
        setCriterio(e.target.value);
    };

    const aplicarFiltro = () => {
        const filtered = data.filter(cliente => cliente[criterio].toString().toLowerCase().includes(filtro.toLowerCase()));
        setFilteredData(filtered);
    };

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
            }
        }
    };

    return (
        <div className='principal-container'>
            <div className='secondary-container-50'>
                <div className='secondary-container'>

                    <div className='simple-container'>
                        <div className='simple-container'>
                            <div className='simple-container-header'>
                                <p>Filtrar</p>
                            </div>
                            <select value={criterio} onChange={handleCriterioChange}>
                                <option value="run_cliente">RUT</option>
                                <option value="dv_run">DV</option>
                                <option value="nombre_cliente">Nombre</option>
                            </select>
                            <input type="text" value={filtro} onChange={handleFilterChange} placeholder="Ingrese filtro..." />
                        </div>
                        <div className='simple-container-row-buttons'>
                            <button onClick={aplicarFiltro}>Filtrar</button>
                            <button onClick={deshacerFiltro}>Deshacer</button>
                        </div>
                    </div>
                    <div className='simple-container-row-buttons'>
                        <button onClick={handleShowModal}>Agregar Cliente</button>
                        <button>PDF</button>
                        <button>Excel</button>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>RUT</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((cliente) => (
                                    <tr key={cliente.run_cliente} onClick={() => seleccionarCliente(cliente)} className="table-row">
                                        <td>{formatearRUT(cliente.run_cliente, cliente.dv_run_cliente)}</td>
                                        <td>{cliente.nombre_cliente}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

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