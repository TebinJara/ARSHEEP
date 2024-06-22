import React, { useEffect, useState } from 'react';
import './PageVisitaTecnica.css';
import { getVisitasTecnicas } from '../../../services/visitaTecnicaService';
import { GestionVisitaTecnica } from './GestionVisitaTecnica';
import VisitaTecnicaTile from './VisitaTecnicaTile';
import { getEmpleados } from '../../../services/empleadoService';
import { getEstablecimientos } from '../../../services/establecimientoService';
import { getTiposMantenimiento } from '../../../services/tipoMantenimientoService';

export const PageVisitaTecnica = () => {
  const [dataVisitasTecnicas, setDataVisitasTecnicas] = useState([]);
  const [dataFiltrada, setDataFiltrada] = useState([]);
  const [showPageOTCrear, setShowPageOTCrear] = useState(false);
  const [selectedVisita, setSelectedVisita] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const [empleados, setEmpleados] = useState([]);
  const [establecimientos, setEstablecimientos] = useState([]);
  const [tipoMantenimiento, setTipoMantenimiento] = useState([]);

  const [filterType, setFilterType] = useState('');
  const [filters, setFilters] = useState({
    id_empleado: '',
    id_tipo_mantenimiento: '',
    id_establecimiento: '',
    fec_creacion_vt: { start: '', end: '' },
    fec_agendamiento_vt: { start: '', end: '' },
    fec_programacion_vt: { start: '', end: '' }
  });

  const fetchData = async () => {
    try {
      const data = await getVisitasTecnicas();
      setDataVisitasTecnicas(data);
      setDataFiltrada(data); // Inicialmente, la data filtrada es igual a la data completa
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchEmpleados = async () => {
    try {
      const data = await getEmpleados();
      setEmpleados(data);
    } catch (error) {
      console.error('Error fetching empleados:', error);
    }
  };

  const fetchEstablecimientos = async () => {
    try {
      const data = await getEstablecimientos();
      setEstablecimientos(data);
    } catch (error) {
      console.error('Error fetching establecimientos:', error);
    }
  };

  const fetchTipoMantenimientos = async () => {
    try {
      const data = await getTiposMantenimiento();
      setTipoMantenimiento(data);
    } catch (error) {
      console.error('Error fetching tipoMantenimientos:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchEmpleados();
    fetchEstablecimientos();
    fetchTipoMantenimientos();
   
  }, [refresh]);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    const { name, value, dataset } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: {
        ...prevFilters[name],
        [dataset.dateType]: value
      }
    }));
  };

  const resetFilters = () => {
    setFilterType('');
    setFilters({
      id_empleado: '',
      id_tipo_mantenimiento: '',
      id_establecimiento: '',
      fec_creacion_vt: { start: '', end: '' },
      fec_agendamiento_vt: { start: '', end: '' },
      fec_programacion_vt: { start: '', end: '' }
    });
    setDataFiltrada(dataVisitasTecnicas);
  };

  const aplicarFiltro = () => {
    let dataFiltrada = dataVisitasTecnicas;

    if (filterType === 'fec_creacion_vt' || filterType === 'fec_agendamiento_vt' || filterType === 'fec_programacion_vt') {
      const { start, end } = filters[filterType];
      if (new Date(end) < new Date(start)) {
        alert('La fecha final no puede ser anterior a la fecha inicial.');
        return;
      }
      dataFiltrada = dataFiltrada.filter(item => {
        const itemDate = new Date(item[filterType]);
        return itemDate >= new Date(start) && itemDate <= new Date(end);
      });
    } else if (filterType) {
      dataFiltrada = dataFiltrada.filter(item =>
        item[filterType].toString().toLowerCase().includes(filters[filterType].toLowerCase())
      );
    }

    setDataFiltrada(dataFiltrada);
  };

  const getColorPrioridad = (prioridad) => {
    switch (prioridad) {
      case 'Baja':
        return 'green';
      case 'Media':
        return 'orange';
      case 'Alta':
        return 'red';
      default:
        return 'white';
    }
  };

  const handleOrdenClick = (visita) => {
    setSelectedVisita(visita);
  };
  
  
  return (
    <div className='page-visitas-tecnicas-container'>
      <div className='filter-section'>
        <select value={filterType} onChange={handleFilterChange}>
          <option value="">Filtrar por:</option>
          <option value="id_empleado">ID Empleado</option>
          <option value="id_tipo_mantenimiento">Tipo Mantenimiento</option>
          <option value="id_establecimiento">ID Establecimiento</option>
          <option value="fec_creacion_vt">Fecha Creación</option>
          <option value="fec_agendamiento_vt">Fecha Agendamiento</option>
          <option value="fec_programacion_vt">Fecha Programación</option>
        </select>
        {filterType === 'id_empleado' && (
          <select
            name="id_empleado"
            value={filters.id_empleado}
            onChange={handleInputChange}
          >
            <option value="">SELECCIONE UN EMPLEADO</option>
            {empleados.map((empleado) => (
              <option
                key={empleado.id_empleado}
                value={empleado.id_empleado}
              >
                {empleado.pnombre + " " + empleado.apaterno + " " + empleado.amaterno}
              </option>
            ))}
          </select>
        )}
        {filterType === 'id_tipo_mantenimiento' && (
          <select
            name="id_tipo_mantenimiento"
            value={filters.id_tipo_mantenimiento}
            onChange={handleInputChange}
          >
            <option value="">SELECCIONE EL TIPO DE MANTENIMIENTO</option>
            {tipoMantenimiento.map((tipoMantenimiento) => (
              <option
                key={tipoMantenimiento.id_tipo_mantenimiento}
                value={tipoMantenimiento.id_tipo_mantenimiento}
              >
                {tipoMantenimiento.desc_tipo_mantenimiento}
              </option>
            ))}
          </select>
        )}
        {filterType === 'id_establecimiento' && (
          <select
            name="id_establecimiento"
            value={filters.id_establecimiento}
            onChange={handleInputChange}
            required
          >
            <option value="">SELECCIONE UN ESTABLECIMIENTO</option>
            {establecimientos.map((establecimiento) => (
              <option
                key={establecimiento.id_establecimiento}
                value={establecimiento.id_establecimiento}
              >
                {establecimiento.nombre_establecimiento}
              </option>
            ))}
          </select>
        )}
        {filterType === 'fec_creacion_vt' && (
          <div>
            <input
              type="date"
              name="fec_creacion_vt"
              data-date-type="start"
              value={filters.fec_creacion_vt.start}
              onChange={handleDateChange}
            />
            <input
              type="date"
              name="fec_creacion_vt"
              data-date-type="end"
              value={filters.fec_creacion_vt.end}
              onChange={handleDateChange}
            />
          </div>
        )}
        {filterType === 'fec_agendamiento_vt' && (
          <div>
            <input
              type="date"
              name="fec_agendamiento_vt"
              data-date-type="start"
              value={filters.fec_agendamiento_vt.start}
              onChange={handleDateChange}
            />
            <input
              type="date"
              name="fec_agendamiento_vt"
              data-date-type="end"
              value={filters.fec_agendamiento_vt.end}
              onChange={handleDateChange}
            />
          </div>
        )}
        {filterType === 'fec_programacion_vt' && (
          <div>
            <input
              type="date"
              name="fec_programacion_vt"
              data-date-type="start"
              value={filters.fec_programacion_vt.start}
              onChange={handleDateChange}
            />
            <input
              type="date"
              name="fec_programacion_vt"
              data-date-type="end"
              value={filters.fec_programacion_vt.end}
              onChange={handleDateChange}
            />
          </div>
        )}
        <button onClick={aplicarFiltro}>Aplicar Filtro</button>
        <button onClick={resetFilters}>Reiniciar Filtros</button>
      </div>

      <div className='filter'>
        <button onClick={() => { setShowPageOTCrear(true); setSelectedVisita(null); }}>Agregar</button>
      </div>

      <div className='visitas-tecnicas-container'>
        {dataFiltrada.map((visita, index) => (
          <div key={index} onClick={() => handleOrdenClick(visita)}>
            <VisitaTecnicaTile visita={visita} />
          </div>
        ))}
      </div>
      <div className='visita-tecnica-panel'>
        {selectedVisita && <GestionVisitaTecnica visita={selectedVisita} setRefresh={setRefresh} />}
      </div>
    </div>
  );
};