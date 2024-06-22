import React, { useEffect, useState } from 'react';
import './PageOrdenesTrabajo.css';
import { getOrdenesTrabajo } from '../../../services/ordenTrabajoService';
import { OrdenTrabajoCrear } from './OrdenTrabajoCrear';
import { GestionOrdenTrabajo } from './GestionOrdenTrabajo';



export const PageOrdenesTrabajo = () => {
  const [dataOrdenesTrabajo, setDataOrdenesTrabajo] = useState([]);
  const [showPageOTCrear, setShowPageOTCrear] = useState(false);
  const [selectedOrden, setSelectedOrden] = useState(null); // Estado para manejar la orden seleccionada

  const fetchData = async () => {
    try {
      const data = await getOrdenesTrabajo();
      setDataOrdenesTrabajo(data); // Guardar los datos en el estado
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleOrdenClick = (orden) => {
    setSelectedOrden(orden); // Establece la orden seleccionada}
    setShowPageOTCrear(false);
    console.log(selectedOrden);
  };

  return (
    <div className='page-ordenes-trabajo-container'>

      <div className='filter'>

      </div>

      <div className='ordenes-trabajo-container'>
        {dataOrdenesTrabajo.map((orden, index) => (
          <div key={index} className="orden-trabajo" onClick={() => handleOrdenClick(orden)}>
            <h4>OT {orden.id_ot}</h4>
            <p>{orden.desc_ot.toUpperCase()}</p>

            <div>
              <p>CREADA: {orden.fecha_creacion}</p>
              <p>VENCE: {orden.fecha_vencimiento}</p>
            </div>
            <div>
            <p style={{ color: getColorPrioridad(orden.prioridad) }}>PRIO: {orden.PRIORIDAD.desc_prioridad}</p>
              <p>{orden.TIPO_STATUS.nombre_status}</p>
            </div>
            
          </div>
        ))}
      </div>
      <div className='ordenes-trabajo-panel'>
        {selectedOrden && <GestionOrdenTrabajo orden={selectedOrden} />} {/* Renderiza el nuevo componente */}
      </div>
    </div>
  );
};
