import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearVisitaTecnica.css';
import { createVisitaTecnica, getVisitasTecnicas } from '../../../services/visitaTecnicaService';
import { getEmpleadoById, getEmpleados } from '../../../services/empleadoService';
import { getClientes } from '../../../services/ClienteService';
import { getEmpresas } from '../../../services/empresaService';
import { getEstablecimientos } from '../../../services/establecimientoService';
import { getCurrentDate } from '../../../helpers/dateHelper';
import VisitaTecnicaTile from './VisitaTecnicaTile';
import { getTiposMantenimiento } from '../../../services/tipoMantenimientoService';

export const CrearVisitaTecnica = () => {
  const [visitas, setVisitas] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [empleado, setEmpleado] = useState({});
  const [empresas, setEmpresas] = useState([]);
  const [establecimientos, setEstablecimientos] = useState([]);
  const [tipoMantenimiento, setTipoMantenimiento] = useState([]);
  const [formData, setFormData] = useState({
    desc_vt: '',
    id_empleado: '',
    fec_programacion_vt: '',
    id_establecimiento: '',
    id_tipo_mantenimiento: ''
  });

  const navigate = useNavigate();

  const fetchVisitasTecnicas = async () => {
    try {
      const data = await getVisitasTecnicas();
      setVisitas(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching visitas tecnicas:', error);
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

  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
    }
  };

  const fetchEmpleadoById = async (id) => {
    try {
      const data = await getEmpleadoById(id);
      setEmpleado(data);
    } catch (error) {
      console.error(`Error fetching empleado with id ${id}:`, error);
    }
  };

  const fetchEmpresas = async () => {
    try {
      const data = await getEmpresas();
      setEmpresas(data);
    } catch (error) {
      console.error('Error fetching empresas:', error);
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

  const fetchEstablecimientos = async () => {
    try {
      const data = await getEstablecimientos();
      setEstablecimientos(data);
    } catch (error) {
      console.error('Error fetching establecimientos:', error);
    }
  };

  const fetchData = async (id) => {
    await fetchVisitasTecnicas();
    await fetchEmpleados();
    if (id) {
      await fetchEmpleadoById(id);
    }
    await fetchClientes();
    await fetchEmpresas();
    await fetchEstablecimientos();
    await fetchTipoMantenimientos();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: (name === 'id_empleado' || name === 'id_establecimiento' || name === 'id_tipo_mantenimiento')
        ? Number(value)
        : (typeof value === 'string' ? value.toUpperCase() : value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVisitaTecnica(formData);
      console.log('Visita Técnica creada con éxito:', formData);
      navigate('/Layout/VT'); // Redirigir a la URL especificada
    } catch (error) {
      console.error('Error al crear la Visita Técnica:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='visita-tecnica-crear-container'>
      <div className='visita-tecnica-crear-principal'>
        <div className='visita-tecnica-crear-header'>
          <h2>CREAR VISITA TÉCNICA</h2>
        </div>
        <div className='visita-tecnica-crear-content'>
          <div className='visita-tecnica-crear-form-container'>
            <form onSubmit={handleSubmit}>
              <div className='form-header'>
                <label>ID Visita Técnica</label>
              </div>
              <div className='form-level-1'>
                <label>FECHA DE VISITA:</label>
                <input
                  type="date"
                  name="fec_programacion_vt"
                  value={formData.fec_programacion_vt}
                  onChange={handleChange}
                  min={getCurrentDate()}
                  required
                />
              </div>
              <div className='form-level-2'>
                <label>DESCRIPCIÓN:</label>
                <input
                  type="text"
                  name="desc_vt"
                  value={formData.desc_vt}
                  onChange={handleChange}
                  title="No se permiten letras minúsculas"
                  maxLength="60"
                  required
                />
              </div>
              <div className='form-level-3'>
              <label>MANTENIMIENTO:</label>
                <select
                  name="id_tipo_mantenimiento"
                  value={formData.id_tipo_mantenimiento}
                  onChange={handleChange}
                  required
                >
                  <option value="">SELECCIONE EL TIPO DE MANTENIMIENTO</option>
                  {tipoMantenimiento.map((tipoMantenimiento) => (
                    <option
                      key={tipoMantenimiento.id_tipo_mantenimiento}
                      value={tipoMantenimiento.id_tipo_mantenimiento}
                    >
                      {tipoMantenimiento.desc_tipo_mantenimiento}
                      {console.log(formData)}
                    </option>
                  ))}
                </select>
                <label>EMPLEADO:</label>
                <select
                  name="id_empleado"
                  value={formData.id_empleado}
                  onChange={handleChange}
                  required
                >
                  <option value="">SELECCIONE UN EMPLEADO</option>
                  {empleados.map((empleado) => (
                    <option
                      key={empleado.id_empleado}
                      value={empleado.id_empleado}
                    >
                      {empleado.pnombre + " " + empleado.apaterno + " " + empleado.amaterno}
                      {console.log(formData)}
                    </option>
                  ))}
                </select>
                <label>ESTABLECIMIENTO:</label>
                <select
                  name="id_establecimiento"
                  value={formData.id_establecimiento}
                  onChange={handleChange}
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
              </div>
              <div className='form-level-4'>
                <button type="submit">Crear Visita Técnica</button>
              </div>
              <div className='visita-tecnica-crear-footer'></div>
            </form>
          </div>
        </div>
      </div>
      <div className='visita-tecnica-crear-panel'>
        {visitas
          .filter((visita) => {
            return (
              (!formData.id_empleado || visita.id_empleado === formData.id_empleado) &&
              (!formData.fec_programacion_vt || visita.fec_programacion_vt === formData.fec_programacion_vt)
            );
          })
          .map((visita, index) => (
            <VisitaTecnicaTile key={index} visita={visita} />
          ))}
      </div>
    </div>
  );
};
