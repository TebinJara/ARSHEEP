import supabase from '../database/connection.js';
import { body, validationResult } from 'express-validator';

// Validaciones
const empleadoValidationRules = () => [
  body('pnombre').isString().withMessage('El primer nombre debe ser una cadena'),
  body('snombre').optional().isString().withMessage('El segundo nombre debe ser una cadena'),
  body('apaterno').isString().withMessage('El apellido paterno debe ser una cadena'),
  body('amaterno').optional().isString().withMessage('El apellido materno debe ser una cadena'),
  body('id_rol').isInt().withMessage('El ID de rol debe ser un número entero'),
  body('numero_contacto').isInt().withMessage('El número de contacto debe ser un número entero'),
  body('correo').isEmail().withMessage('Debe ser un correo electrónico válido')
];

// Middleware para validaciones
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Crear un empleado
export const createEmpleado = [
  empleadoValidationRules(),
  validate,
  async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('EMPLEADO')
        .insert([req.body]);

      if (error) throw error;

      return res.status(201).json(data);
    } catch (error) {
      console.error('Error al crear el empleado:', error.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
];

// Obtener todos los empleados
export const getEmpleados = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('EMPLEADO')
      .select('*')
      .order('pnombre')
      .order('apaterno')
      .order('amaterno');

    if (error) return res.status(400).json({ error });
    return res.json(data);
  } catch (error) {
    console.error('Error al obtener los empleados:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un empleado por ID
export const getEmpleadoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID de empleado es requerido' });

    const { data, error } = await supabase
      .from('EMPLEADO')
      .select('*')
      .eq('id_empleado', id)
      .single();

    if (error) return res.status(400).json({ error });
    if (!data) return res.status(404).json({ error: 'Empleado no encontrado' });

    return res.json(data);
  } catch (error) {
    console.error('Error al obtener el empleado por ID:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un empleado
export const updateEmpleado = [
  empleadoValidationRules(),
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: 'ID de empleado es requerido' });

      // Asegúrate de que req.body tenga los datos correctos
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Datos de empleado son requeridos' });
      }

      const { data, error } = await supabase
        .from('EMPLEADO')
        .update(req.body)
        .eq('id_empleado', id)
        .select('*'); // Asegúrate de seleccionar los datos actualizados

      if (error) {
        console.error('Error en la consulta a la base de datos:', error);
        return res.status(400).json({ error: error.message });
      }
      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }

      return res.json(data[0]); // Devuelve el primer elemento del array de datos actualizados
    } catch (error) {
      console.error('Error al actualizar el empleado:', error.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
];

// Eliminar un empleado
export const deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID de empleado es requerido' });

    const { data, error } = await supabase
      .from('EMPLEADO')
      .delete()
      .eq('id_empleado', id);

    if (error) return res.status(400).json({ error });
    if (!data) return res.status(404).json({ error: 'Empleado no encontrado' });

    return res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar el empleado:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
