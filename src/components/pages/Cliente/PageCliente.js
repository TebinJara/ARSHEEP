import React, { useEffect, useState } from "react";
import "./PageCliente.css";
import { getClientes } from "../../../services/clienteService";
import { useNavigate } from "react-router-dom";
import { ClienteTile } from "./ClienteTile";

export const PageCliente = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [criterio, setCriterio] = useState("nombre_cliente");

  const fetchData = async () => {
    try {
      const clientes = await getClientes();
      console.log("Clientes obtenidos:", clientes);
      setData(clientes || []);
      setFilteredData(clientes || []);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const aplicarFiltro = () => {
      const filtered = data.filter((cliente) => {
        if (criterio === "nombre_cliente") {
          const nombreCompleto = cliente.nombre_cliente+" "+cliente.appaterno_cliente+" "+cliente.apmaterno_cliente;
          return nombreCompleto?.toString().toLowerCase().includes(filtro.toLowerCase());
        } else if (criterio === "numrun_cliente") {
          return cliente.numrun_cliente?.toString().toLowerCase().includes(filtro.toLowerCase());
        }
        return false;
      });
      setFilteredData(filtered);
      
    };
    aplicarFiltro();
  }, [filtro, criterio, data]);

  const handleFilterChange = (e) => {
    setFiltro(e.target.value);
  };

  const handleCriterioChange = (e) => {
    setCriterio(e.target.value);
  };

  const navigate = useNavigate();

  const handleButtonClick = (cliente) => {
    navigate('/Layout/Clientes/ficha', { state: { cliente } });
  };

  const handleCreateButtonClick = () => {
    navigate('/Layout/Clientes/crear');
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
              <option value="nombre_cliente">Nombre</option>
              <option value="numrun_cliente">RUT</option>
            </select>
            <input
              type="text"
              value={filtro}
              onChange={handleFilterChange}
              placeholder="Ingrese filtro..."
            />
          </div>
        </div>
        <div>
          <button onClick={handleCreateButtonClick}>Crear Cliente</button>
        </div>
        <div className="tiles-container">
          {filteredData.map((cliente) => (
            <ClienteTile key={cliente.numrun_cliente} cliente={cliente} onclick={console.log("hola")} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageCliente;
