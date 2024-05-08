import React, { useEffect, useState } from 'react'
import './TablaClientes.css';
import { obtenerClientes } from '../../services/supa';


export const TablaClientes = () => {
    const [data, setData] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const clientes = await obtenerClientes();
            if (clientes) {
                setData(clientes);
            }
        };
        fetchData();
    }, []);

    const seleccionarCliente = cliente => {
        setClienteSeleccionado(cliente);
    };

    return (
        <div className='clientes-container-1'>
            <h2>Listado de Clientes</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>RUT de Cliente</th>
                        <th>DV</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((cliente) => (
                        <tr key={cliente.run_cliente} onClick={() => seleccionarCliente(cliente)} className="table-row">
                            <td>{cliente.run_cliente}</td>
                            <td>{cliente.dv_run}</td>
                            <td>{cliente.nombre_cliente}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {clienteSeleccionado && (
                <div className='info-cliente'>
                    <h2>Información del Cliente</h2>
                    <p><strong>RUT:</strong> {clienteSeleccionado.run_cliente}</p>
                    <p><strong>Nombre:</strong> {clienteSeleccionado.nombre_cliente}</p>
                    <p><strong>Dirección:</strong> {clienteSeleccionado.direccion_cliente}</p>                    
                    <p><strong>Teléfono:</strong> {clienteSeleccionado.contacto}</p>
                </div>
            )}
        </div>
    );
};