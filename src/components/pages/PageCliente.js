import React, { useEffect, useState } from "react";
import "./PageCliente.css";
import { obtenerClientes, eliminarCliente } from "../../services/ClienteService";
import { obtenerTipoClientePorId } from "../../services/TipoClienteService";
import { FormAgregarCliente } from "./FormAgregarCliente";
import { DashboardDetailsCliente } from "./DashboardDetailsCliente";

export const PageCliente = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [criterio, setCriterio] = useState("pnombre_cliente");
  const [showModal, setShowModal] = useState(false);
  const [tipoClientes, setTipoClientes] = useState({});

  const fetchTipoClientes = async (clientes) => {
    const tipos = {};
    for (const cliente of clientes) {
      tipos[cliente.id_tipo_cliente] = await obtenerTipoClientePorId(cliente.id_tipo_cliente);
    }
    setTipoClientes(tipos);
  };

  const fetchData = async () => {
    try {
      const clientes = await obtenerClientes();
      console.log("Clientes obtenidos:", clientes);
      setData(clientes || []);
      setFilteredData(clientes || []);
      await fetchTipoClientes(clientes || []);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Data ha cambiado, actualizando filteredData:", data);
    setFilteredData(data);
  }, [data]);

  const formatearRUT = (run, dv) => {
    const runStr = run.toString();
    const runFormateado = runStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${runFormateado}-${dv}`;
  };

  const seleccionarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  const handleFilterChange = (e) => {
    setFiltro(e.target.value);
  };

  const handleCriterioChange = (e) => {
    setCriterio(e.target.value);
  };

  const aplicarFiltro = () => {
    const filtered = data.filter((cliente) =>
      cliente[criterio]?.toString().toLowerCase().includes(filtro.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const deshacerFiltro = () => {
    setFilteredData(data);
    setFiltro("");
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
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este cliente?"
    );
    if (confirmacion) {
      try {
        const respuesta = await eliminarCliente(id);
        if (respuesta) {
          console.log("Cliente eliminado, actualizando lista");
          await fetchData();
          deshacerFiltro();
          setClienteSeleccionado(null);
        } else {
          console.error("Error al eliminar el cliente");
        }
      } catch (error) {
        console.error("Error en la solicitud de eliminación:", error);
        console.log(id);
      }
    }
  };

  return (
    <div className="principal-container">
      <div className="secondary-container">
        <div className="filter-container">
          <div className="filter-container-header">
            <p>Filtrar</p>
          </div>
          <div className="filter-container-group">
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
            <input
              type="text"
              value={filtro}
              onChange={handleFilterChange}
              placeholder="Ingrese filtro..."
            />
          </div>
          <div className="filter-container-button">
            <button onClick={aplicarFiltro}>Filtrar</button>
            <button onClick={deshacerFiltro}>Deshacer</button>
          </div>
        </div>
        <div className="control-buttons-container">
          <div className="control-buttons-container-group">
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
                <th>Nombre</th>
                <th>Tipo de Cliente</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((cliente) => (
                <tr
                  key={cliente.numrun_cliente}
                  onClick={() => seleccionarCliente(cliente)}
                  className="table-row"
                >
                  <td>
                    {formatearRUT(
                      cliente.numrun_cliente,
                      cliente.dvrun_cliente
                    )}
                  </td>
                  <td>{cliente.pnombre_cliente + " " + cliente.snombre_cliente + " " + cliente.appaterno_cliente + " " + cliente.apmaterno_cliente}</td>
                  <td>{tipoClientes[cliente.id_tipo_cliente]?.desc_tipo_cliente || 'Cargando...'}</td>
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
