import React, { useState } from 'react';

// Componente de Filtro
export const Filtros = ({ campos, onFiltrar }) => {
  const [campoSeleccionado, setCampoSeleccionado] = useState('');
  const [valorFiltro, setValorFiltro] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleCampoChange = (e) => {
    setCampoSeleccionado(e.target.value);
    setValorFiltro('');
    setFechaInicio('');
    setFechaFin('');
  };

  const handleFiltrar = () => {
    const filtro = {
      campo: campoSeleccionado,
      valor: valorFiltro,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    };
    onFiltrar(filtro);
  };

  return (
    <div className="filtro-generico-container">
      <select value={campoSeleccionado} onChange={handleCampoChange}>
        <option value="">Seleccionar Filtro</option>
        {campos.map((campo, index) => (
          <option key={index} value={campo}>{campo}</option>
        ))}
      </select>

      {campoSeleccionado && (
        <div className="input-filtro">
          {campoSeleccionado.toLowerCase().includes('fecha') ? (
            <div>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                placeholder="Fecha Inicio"
              />
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                placeholder="Fecha Fin"
              />
            </div>
          ) : (
            <input
              type="text"
              value={valorFiltro}
              onChange={(e) => setValorFiltro(e.target.value)}
              placeholder={`Filtrar por ${campoSeleccionado}`}
            />
          )}
        </div>
      )}

      <button onClick={handleFiltrar}>Filtrar</button>
    </div>
  );
};