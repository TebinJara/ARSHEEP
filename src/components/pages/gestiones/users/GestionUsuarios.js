import React, { useState, useEffect } from 'react';
import './GestionUsuarios.css';
import { obtenerUsuariosEmpleados,obtenerUsuarioEmpleadoPorID } from '../../../../services/GestionUsuariosService';
import { GestionUsuariosCard } from './GestionUsuariosCard';

const GestionUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [criterio, setCriterio] = useState("id_usuario");
  const [orden, setOrden] = useState("ascendente");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchData = async () => {
    try {
      const usuariosEmpleados = await obtenerUsuariosEmpleados();
      console.log("Usuarios obtenidos:", usuariosEmpleados);
      setUsers(usuariosEmpleados || []);
      setFilteredUsers(usuariosEmpleados || []);
    } catch (error) {
      console.error("Error al obtener usuarios empleados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    aplicarFiltro();
  }, [filtro, criterio, orden, users]);

  const handleFilterChange = (e) => {
    setFiltro(e.target.value);
  };

  const handleCriterioChange = (e) => {
    setCriterio(e.target.value);
  };

  const handleOrdenChange = () => {
    setOrden(orden === "ascendente" ? "descendente" : "ascendente");
  };

  const aplicarFiltro = () => {
    let filtered = users.filter((usuario) =>
      usuario[criterio]?.toString().toLowerCase().includes(filtro.toLowerCase())
    );

    filtered = filtered.sort((a, b) => {
      if (a[criterio] < b[criterio]) return orden === "ascendente" ? -1 : 1;
      if (a[criterio] > b[criterio]) return orden === "ascendente" ? 1 : -1;
      return 0;
    });

    setFilteredUsers(filtered);
  };

  const parsearFecha = (fecha) => {
    const [año, mes, dia] = fecha.split('-');
    return `${dia}-${mes}-${año}`;
  };

  const handleRowClick = (usuarioEmpleado) => {
    setSelectedUser(usuarioEmpleado);

  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const actualizarUsuarios = () => {
    fetchData();
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
              <option value="id_usuario">ID Usuario</option>
              <option value="nombre_usuario">Nombre de Usuario</option>
              <option value="id_empleado">ID Empleado</option>
              <option value="fec_creacion_usuario">Fecha de Creación</option>
            </select>
            <input
              type="text"
              value={filtro}
              onChange={handleFilterChange}
              placeholder="Ingrese filtro..."
            />
            <button onClick={handleOrdenChange}>
              {orden === "ascendente" ? "Ordenar Descendente" : "Ordenar Ascendente"}
            </button>
          </div>
        </div>
        <div className="control-buttons-container">
          <div className="control-buttons-container-group">
            <button onClick={() => { }}>Agregar Usuario</button>
            <button>PDF</button>
            <button>Excel</button>
          </div>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID Usuario</th>
                <th>Nombre de Usuario</th>
                <th>ID Empleado</th>
                <th>Nombre</th>
                <th>Función</th>
                <th>Fecha de Creación</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((usuarioEmpleado) => (
                <tr key={usuarioEmpleado.id_usuario} className="table-row" onClick={() => handleRowClick(usuarioEmpleado)}>
                  <td>{usuarioEmpleado.id_usuario}</td>
                  <td>{usuarioEmpleado.nombre_usuario}</td>
                  <td>{usuarioEmpleado.id_empleado}</td>
                  <td>{`${usuarioEmpleado.EMPLEADO.pnombre} ${usuarioEmpleado.EMPLEADO.apaterno} ${usuarioEmpleado.EMPLEADO.amaterno}`}</td>
                  <td>{usuarioEmpleado.EMPLEADO.ROL.desc_rol}</td>
                  <td>{parsearFecha(usuarioEmpleado.fec_creacion_usuario)}</td>
                  <td>{usuarioEmpleado.estado_usuario ? 'ACTIVO' : 'INACTIVO'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedUser && <GestionUsuariosCard user={selectedUser} onClose={handleCloseModal} actualizarUsuarios={actualizarUsuarios} />}
    </div>
  );
};

export default GestionUsuarios;
