import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendario.css';
import { obtenerOrdenesDeTrabajo } from '../../services/supa';
import 'moment/locale/es';
import Modal from '../modal/Modal';

moment.locale('es'); // Configurar locale para español
const localizer = momentLocalizer(moment);

const messages = {
  today: 'Hoy',
  previous: 'Anterior',
  next: 'Siguiente',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
};

const OTCalendario = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordenes = await obtenerOrdenesDeTrabajo();
        const eventsData = ordenes.map((ot) => {
          const startDate = moment(ot.fecha_creacion).startOf('day').toDate();
          const endDate = moment(ot.fecha_vencimiento).endOf('day').toDate();

          return {
            id: ot.id_ot,
            title: ot.descripcion,
            start: startDate,
            end: endDate,
            description: ot.diagnostico,
            status: ot.status,
            className: obtenerClasePorEstado(ot.status)
          };
        });
        setEvents(eventsData);
        checkForAlerts(eventsData);
      } catch (error) {
        console.error('Error al obtener órdenes de trabajo:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 24 * 60 * 60 * 1000); // 24 horas en milisegundos

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  const checkForAlerts = (events) => {
    const currentDate = moment().startOf('day');
    const upcomingAlerts = events.filter(event => {
      const endDate = moment(event.end).endOf('day');
      const daysToEnd = endDate.diff(currentDate, 'days');
      return (daysToEnd > 0 && daysToEnd <= 5) && (event.status === 1 || event.status === 2);
    });

    if (upcomingAlerts.length > 0) {
      setAlerts(upcomingAlerts);
      setShowModal(true);
    }
  };

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
        messages={messages}
        eventPropGetter={(event, start, end, isSelected) => ({
          className: event.className
        })}
        defaultView="month"
        views={['month', 'week', 'day', 'agenda']}
        step={60}
        showMultiDayTimes
        components={{
          week: {
            header: ({ date, localizer }) => (
              <div>{localizer.format(date, 'dddd DD/MM')}</div>
            ),
          },
          day: {
            header: ({ date, localizer }) => (
              <div>{localizer.format(date, 'dddd DD/MM')}</div>
            ),
          },
        }}
      />
      {selectedEvent && (
        <div className="event-details">
          <h2>{selectedEvent.title}</h2>
          <p><strong>Inicio:</strong> {selectedEvent.start.toLocaleString()}</p>
          <p><strong>Fin:</strong> {selectedEvent.end.toLocaleString()}</p>
          <p><strong>Descripción:</strong> {selectedEvent.description}</p>
        </div>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Alertas</h2>
        {alerts.map(alert => (
          <div key={alert.id} className="alert">
            <p>La OT "{alert.title}" vencerá en {moment(alert.end).endOf('day').diff(moment().startOf('day'), 'days')} días.</p>
          </div>
        ))}
        {/* <button className="modal-close" onClick={() => setShowModal(false)}>Cerrar</button> */}
      </Modal>
    </div>
  );
};

export default OTCalendario;
