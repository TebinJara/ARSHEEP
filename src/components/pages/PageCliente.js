import React, { useEffect, useState } from 'react';
import "../pages/PageCliente.css";
import { obtenerClientes } from '../../services/supa';

export const PageCliente = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [criterio, setCriterio] = useState('nombre_cliente');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);  // Estado para controlar la visibilidad del formulario

    useEffect(() => {
        const fetchData = async () => {
            const clientes = await obtenerClientes();
            setData(clientes || []);
        };
        fetchData();
    }, []);

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


    const abrirFormularioEnNuevaVentana = () => {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.right = "0";
        overlay.style.bottom = "0";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        overlay.style.zIndex = "1000";  // Asegúrate de que el zIndex sea suficientemente alto para cubrir todo.
        
        document.body.appendChild(overlay);
    
        const nuevaVentana = window.open('', '_blank', 'width=600,height=400,left=200,top=200');
    
        nuevaVentana.document.write(
            `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Agregar Cliente</title>
            </head>
            <body>
                <h1>Agregar Nuevo Cliente</h1>
                <form>
                    <label for="rut">RUT de Cliente:</label>
                    <input type="text" id="rut" name="rut" required><br>
                    <label for="dv">DV:</label>
                    <input type="text" id="dv" name="dv" required><br>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required><br>
                    <button type="submit">Guardar</button>
                </form>
                <button onclick="window.close()">Cerrar</button>
            </body>
            </html>
            
        `);
    
        nuevaVentana.document.close(); // Asegura que el contenido de la nueva ventana se ha cargado completamente
    
        // Escuchar cuando la nueva ventana se cierra para eliminar el overlay
        const interval = setInterval(() => {
            if (nuevaVentana.closed) {
                clearInterval(interval);
                document.body.removeChild(overlay);
            }
        }, 100);
    }

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
                        <button onClick={abrirFormularioEnNuevaVentana}>Agregar Cliente</button>
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
                            <p><strong>Teléfono:</strong> {clienteSeleccionado.contacto}</p>
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
