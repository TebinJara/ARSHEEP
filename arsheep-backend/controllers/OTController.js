import supabase from '../database/connection.js';
import { body, validationResult } from 'express-validator';

// Validaciones
/*const ordenTrabajoValidationRules = () => [
  body('id_ot').isInt().withMessage('El ID de orden de trabajo debe ser un número entero'),
  body('descripcion').isString().withMessage('La descripción debe ser una cadena'),
  body('status').isInt().withMessage('El estado debe ser un número entero'),
  body('fecha_creacion').isDate().withMessage('La fecha de creación debe ser una fecha válida'),
  body('fecha_vencimiento').isDate().withMessage('La fecha de vencimiento debe ser una fecha válida'),
  body('prioridad').isString().withMessage('La prioridad debe ser una cadena'),
  body('adicional').optional().isString().withMessage('El adicional debe ser una cadena'),
  body('id_empleado').isInt().withMessage('El ID de empleado debe ser un número entero'),
  body('repuestos').optional().isString().withMessage('Los repuestos deben ser una cadena'),
  body('diagnostico').optional().isString().withMessage('El diagnóstico debe ser una cadena'),
  body('reparacion_realizada').optional().isString().withMessage('La reparación realizada debe ser una cadena'),
  body('numrun_cliente').isInt().withMessage('El número de RUN del cliente debe ser un número entero')
];

// Middleware para validaciones
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};*/

// Crear una orden de trabajo
export const createOrdenTrabajo = [
  /*ordenTrabajoValidationRules(),
  validate,*/
  async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('ORDEN_TRABAJO')
        .insert([req.body]);

      if (error) throw error;

      return res.status(201).json(data);
    } catch (error) {
      console.error('Error al crear la orden de trabajo:', error.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
];

// Obtener todas las órdenes de trabajo
export const getOrdenesTrabajo = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('ORDEN_TRABAJO')
      .select(`
       *
      `)
      .order('fecha_creacion', { ascending: false });

    if (error) return res.status(400).json({ error });
    return res.json(data);
  } catch (error) {
    console.error('Error al obtener las órdenes de trabajo:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener una orden de trabajo por ID con JOIN
export const getOrdenTrabajoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID de orden de trabajo es requerido' });

    const { data, error } = await supabase
      .from('ORDEN_TRABAJO')
      .select(`
        ORDEN_TRABAJO:id_ot,
        descripcion,
        status,
        fecha_creacion,
        fecha_vencimiento,
        prioridad,
        adicional,
        id_empleado,
        repuestos,
        diagnostico,
        reparacion_realizada,
        numrun_cliente,
        VISITA_TECNICA(
          id_vt,
          desc_vt,
          desc_problema_vt,
          analisis_vt,
          recomendacion_vt,
          beneficio_vt,
          proximospasos_vt,
          fec_creacion_vt,
          id_empleado,
          id_estado_vt,
          fec_programacion_vt,
          id_establecimiento
        ),
        ESTABLECIMIENTO(
          id_establecimiento,
          dirección_establecimiento,
          numrun_empresa,
          numtel_establecimiento,
          email_establecimiento,
          id_comuna,
          id_region,
          nombre_establecimiento
        ),
        EMPRESA(
          numrun_empresa,
          dvrun_empresa,
          numtelefono_empresa,
          dirección_empresa,
          email_empresa,
          sitioweb_empresa,
          numrun_cliente,
          nombre_empresa
        ),
        CLIENTE(
          numrun_cliente,
          dvrun_cliente,
          nombre_cliente,
          appaterno_cliente,
          apmaterno_cliente,
          direccion_cliente,
          email_cliente,
          numtelefono_cliente,
          id_comuna,
          fecnac_cliente,
          imagen_cliente,
          fec_inicio_contrato_cliente,
          fec_termino_contrato_cliente,
          fec_creacion_cliente,
          id_region
        )
      `)
      .eq('id_ot', id)
      .single();

    if (error) return res.status(400).json({ error });
    if (!data) return res.status(404).json({ error: 'Orden de trabajo no encontrada' });

    return res.json(data);
  } catch (error) {
    console.error('Error al obtener la orden de trabajo por ID:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Actualizar una orden de trabajo
export const updateOrdenTrabajo = [
  /*ordenTrabajoValidationRules(),
  validate,*/
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: 'ID de orden de trabajo es requerido' });

      // Asegúrate de que req.body tenga los datos correctos
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Datos de orden de trabajo son requeridos' });
      }

      const { data, error } = await supabase
        .from('ORDEN_TRABAJO')
        .update(req.body)
        .eq('id_ot', id)
        .select('*'); // Asegúrate de seleccionar los datos actualizados

      if (error) {
        console.error('Error en la consulta a la base de datos:', error);
        return res.status(400).json({ error: error.message });
      }
      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Orden de trabajo no encontrada' });
      }

      return res.json(data[0]); // Devuelve el primer elemento del array de datos actualizados
    } catch (error) {
      console.error('Error al actualizar la orden de trabajo:', error.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
];

// Eliminar una orden de trabajo
export const deleteOrdenTrabajo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID de orden de trabajo es requerido' });

    const { data, error } = await supabase
      .from('ORDEN_TRABAJO')
      .delete()
      .eq('id_ot', id);

    if (error) return res.status(400).json({ error });
    if (!data) return res.status(404).json({ error: 'Orden de trabajo no encontrada' });

    return res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la orden de trabajo:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
