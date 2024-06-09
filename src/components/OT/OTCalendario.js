import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendario.css';
import { obtenerOrdenesDeTrabajo } from '../../services/supa';

const localizer = momentLocalizer(moment);

const OTCalendario = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordenes = await obtenerOrdenesDeTrabajo();
        const eventsData = ordenes.map((ot) => ({
          id: ot.id_ot,
          title: ot.descripcion,
          start: new Date(ot.fecha_creacion),
          end: new Date(ot.fecha_vencimiento),
          description: ot.diagnostico,
          className: obtenerClasePorEstado(ot.status)
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error('Error al obtener órdenes de trabajo:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const obtenerClasePorEstado = (estado) => {
    switch (estado) {
      case 1: // Ingresada
        return 'ingresada';
      case 2: // En Proceso
        return 'en-proceso';
      case 3: // Cancelada
        return 'cancelada';
      case 4: // Completada
        return 'completada';
      default:
        return '';
    }
  };

  return (
    <div className="Calendario">
      <h1>Calendario de Órdenes de Trabajo</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={(event, start, end, isSelected) => ({
          className: event.className
        })}
      />
      {selectedEvent && (
        <div className="event-details">
          <h2>{selectedEvent.title}</h2>
          <p><strong>Inicio:</strong> {selectedEvent.start.toLocaleString()}</p>
          <p><strong>Fin:</strong> {selectedEvent.end.toLocaleString()}</p>
          <p><strong>Descripción:</strong> {selectedEvent.description}</p>
        </div>
      )}
    </div>
  );
};

export default OTCalendario;
