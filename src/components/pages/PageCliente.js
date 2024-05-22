import React, { useEffect, useState } from 'react';
import "./PageCliente.css";
import { obtenerClientes } from '../../services/ClienteService'; // Asegúrate que la ruta es correcta
import { FormAgregarCliente } from './FormAgregarCliente';


export const PageCliente = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [criterio, setCriterio] = useState('nombre_cliente');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientes = await obtenerClientes();
                setData(clientes || []);
            } catch (error) {
                console.error('Error al obtener clientes:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredData(data); // Actualiza filteredData cada vez que data cambia
    }, [data]);

    const seleccionarCliente = cliente => {
        setClienteSeleccionado(cliente);
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

    

    return (
        <div className='clientes-container-1'>
            <div className='list-clientes'>
                <div className='table-containt'>
                    <div className='table-containt-filter'>
                        <div className='table-containt-filter-input'>
                            <div className='table-containt-filter-input-header'>
                                <p>Filtrar</p>
                            </div>
                            <select value={criterio} onChange={handleCriterioChange}>
                                <option value="run_cliente">RUT</option>
                                <option value="dv_run">DV</option>
                                <option value="nombre_cliente">Nombre</option>
                            </select>
                            <input type="text" value={filtro} onChange={handleFilterChange} placeholder="Ingrese filtro..." />
                        </div>
                        <div className='table-containt-filter-button'>
                            <button onClick={aplicarFiltro}>Filtrar</button>
                            <button onClick={deshacerFiltro}>Deshacer</button>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>RUT de Cliente</th>
                                <th>DV</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((cliente) => (
                                <tr key={cliente.run_cliente} onClick={() => seleccionarCliente(cliente)} className="table-row">
                                    <td>{cliente.run_cliente}</td>
                                    <td>{cliente.dv_run}</td>
                                    <td>{cliente.nombre_cliente}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='table-containt-button'>
                    <button onClick={() => setShowModal(true)}>Agregar Cliente</button>
            {showModal && <FormAgregarCliente onClose={() => setShowModal(false)} />}
                        <button>PDF</button>
                        <button>Excel</button>
                    </div>
                </div>
            </div>
            {clienteSeleccionado && (
                <div className='dashboard-details'>
                    <div className='dashboard-details-header'>
                        <h2>Información del Cliente</h2>
                    </div>
                    <div className='dashboard-details-containt'>
                        <div className='dashboard-details-containt-image'>
                            <img src={clienteSeleccionado.url_imagen} alt={`Imagen de ${clienteSeleccionado.nombre_cliente}`} className="imagen-cliente" />
                        </div>
                        <div className='dashboard-details-containt-data'>
                            <p><strong>RUT:</strong> {clienteSeleccionado.run_cliente}</p>
                            <p><strong>Nombre:</strong> {clienteSeleccionado.nombre_cliente}</p>
                            <p><strong>Dirección:</strong> {clienteSeleccionado.direccion_cliente}</p>
                            <p><strong>Teléfono:</strong> {clienteSeleccionado.contacto_cliente}</p>
                        </div>
                        <div className='table-containt-button'>
                            <button>Eliminar</button>
                            <button>Modificar</button>
                            <button>Notificar</button>
                            <button>Tickets</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
