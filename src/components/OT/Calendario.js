import React from 'react';
import './Calendario.css';
import OTCalendario from './OTCalendario';

const Calendario = () => {
  console.log("Rendering Calendario component");
  return (
    <div className="Calendario">
      <OTCalendario />
    </div>
  );
}

export default Calendario;

