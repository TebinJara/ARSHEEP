import React, { useEffect, useState } from 'react'
import "../pages/PageCliente.css";
import { obtenerClientes } from '../../services/supa';

export const PageCliente = () => {
    // Utiliza el hook useState para mantener una lista de datos de clientes.
    const [data, setData] = useState([]);

    // Utiliza otro useState para mantener la información del cliente seleccionado.
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

    // useEffect se utiliza para cargar datos al montar el componente.
    useEffect(() => {
        // Función asíncrona para obtener los datos de los clientes.
        const fetchData = async () => {
            const clientes = await obtenerClientes(); // Llama a una función que obtiene los clientes.
            if (clientes) {
                setData(clientes); // Actualiza el estado con los clientes obtenidos.
            }
        };
        fetchData(); // Ejecuta la función fetchData al montar el componente.
    }, []); // El arreglo vacío asegura que el efecto solo se ejecuta una vez al montar.

    // Función para manejar la selección de un cliente.
    const seleccionarCliente = cliente => {
        setClienteSeleccionado(cliente); // Establece el cliente seleccionado en el estado.
    };

    // El componente devuelve un bloque JSX que define la UI del componente.
    return (
        <div className='clientes-container-1'>
            <table className="table">
                <thead>
                    <tr>
                        <th>RUT de Cliente</th>
                        <th>DV</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapea cada cliente a una fila de tabla */}
                    {data.map((cliente) => (
                        <tr key={cliente.run_cliente} onClick={() => seleccionarCliente(cliente)} className="table-row">
                            <td>{cliente.run_cliente}</td>
                            <td>{cliente.dv_run}</td>
                            <td>{cliente.nombre_cliente}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Muestra información detallada del cliente seleccionado si hay alguno */}
            {clienteSeleccionado && (
                <div className='info-cliente'>

                    <div className='info-cliente-1'>
                        <h2>Información del Cliente</h2>
                    </div>
                    <div className='info-cliente-2'>
                        <div className='info-cliente-2-1'>
                            <p><strong>RUT:</strong> {clienteSeleccionado.run_cliente}</p>
                            <p><strong>Nombre:</strong> {clienteSeleccionado.nombre_cliente}</p>
                            <p><strong>Dirección:</strong> {clienteSeleccionado.direccion_cliente}</p>
                            <p><strong>Teléfono:</strong> {clienteSeleccionado.contacto}</p>
                        </div>
                        <div className='info-cliente-2-2'>
                            <img src={clienteSeleccionado.url_imagen} alt={`Imagen de ${clienteSeleccionado.nombre_cliente}`} className="imagen-cliente" />
                        </div>
                    </div>


                </div>
            )}
        </div>
    );
}
