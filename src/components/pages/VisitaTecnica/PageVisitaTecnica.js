import React, { useEffect, useState } from 'react';
import './PageVisitaTecnica.css';
import { getVisitasTecnicas } from '../../../services/visitaTecnicaService';
import { GestionVisitaTecnica } from './GestionVisitaTecnica';
import { Filtros } from '../../Filtros';
import VisitaTecnicaTile from './VisitaTecnicaTile';


export const PageVisitaTecnica = () => {




  const [dataVisitasTecnicas, setDataVisitasTecnicas] = useState([]);
  const [dataFiltrada, setDataFiltrada] = useState([]);
  const [showPageOTCrear, setShowPageOTCrear] = useState(false);
  const [selectedVisita, setSelectedVisita] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getVisitasTecnicas();
      setDataVisitasTecnicas(data);
      setDataFiltrada(data); // Inicialmente, la data filtrada es igual a la data completa
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    fetchData();

  }, [refresh]);

  const aplicarFiltro = (filtro) => {
    let dataFiltrada = dataVisitasTecnicas;

    if (filtro.campo.toLowerCase().includes('fecha')) {
      dataFiltrada = dataFiltrada.filter(item =>
        new Date(item[filtro.campo]) >= new Date(filtro.fechaInicio) &&
        new Date(item[filtro.campo]) <= new Date(filtro.fechaFin)
      );
    } else {
      dataFiltrada = dataFiltrada.filter(item =>
        item[filtro.campo].toString().toLowerCase().includes(filtro.valor.toLowerCase())
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

  const camposFiltro = ['desc_vt', 'fec_creacion_vt', 'id_empleado'];

  return (
    <div className='page-visitas-tecnicas-container'>
      <Filtros campos={camposFiltro} onFiltrar={aplicarFiltro} />

      <div className='filter'>
        <button onClick={() => setShowPageOTCrear(true) + setSelectedVisita("")}>Agregar</button>
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
