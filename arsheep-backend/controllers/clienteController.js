import supabase from '../database/connection.js';
import { body, validationResult } from 'express-validator';

// Validaciones
const clienteValidationRules = () => [
  body('numrun_cliente').isInt().withMessage('El número de RUN debe ser un número entero'),
  body('dvrun_cliente').isString().withMessage('El dígito verificador debe ser una cadena'),
  body('nombre_cliente').isString().withMessage('El nombre debe ser una cadena'),
  body('appaterno_cliente').isString().withMessage('El apellido paterno debe ser una cadena'),
  body('apmaterno_cliente').isString().withMessage('El apellido materno debe ser una cadena'),
  body('direccion_cliente').isString().withMessage('La dirección debe ser una cadena'),
  body('email_cliente').isEmail().withMessage('Debe ser un correo electrónico válido'),
  body('numtelefono_cliente').isString().withMessage('El número de teléfono debe ser una cadena'),
  body('id_comuna').isInt().withMessage('El ID de comuna debe ser un número entero'),
  body('fecnac_cliente').isDate().withMessage('La fecha de nacimiento debe ser una fecha válida'),
  body('imagen_cliente').optional().isString().withMessage('La imagen debe ser una cadena'),
  body('fec_inicio_contrato_cliente').optional().isDate().withMessage('La fecha de inicio del contrato debe ser una fecha válida'),
  body('fec_termino_contrato_cliente').optional().isDate().withMessage('La fecha de término del contrato debe ser una fecha válida'),
  body('fec_creacion_cliente').isDate().withMessage('La fecha de creación debe ser una fecha válida'),
  body('id_region').isInt().withMessage('El ID de región debe ser un número entero')
];

// Middleware para validaciones
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Crear un cliente
export const createCliente = [
  clienteValidationRules(),
  validate,
  async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('CLIENTE')
        .insert([req.body]);

      if (error) throw error;

      return res.status(201).json(data);
    } catch (error) {
      console.error('Error al crear el cliente:', error.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
];

// Obtener todos los clientes con relaciones
export const getClientes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('CLIENTE')
      .select(`
        numrun_cliente,
        dvrun_cliente,
        nombre_cliente,
        appaterno_cliente,
        apmaterno_cliente,
        direccion_cliente,
        email_cliente,
        numtelefono_cliente,
        id_comuna,
        COMUNA (
          id_comuna,
          desc_comuna,
          id_region
        ),
        fecnac_cliente,
        imagen_cliente,
        fec_inicio_contrato_cliente,
        fec_termino_contrato_cliente,
        fec_creacion_cliente
      `)
      .order('nombre_cliente')
      .order('appaterno_cliente')
      .order('apmaterno_cliente');

    if (error) return res.status(400).json({ error });
    return res.json(data);
  } catch (error) {
    console.error('Error al obtener los clientes:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un cliente por ID con relaciones
export const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID de cliente es requerido' });

    const { data, error } = await supabase
      .from('CLIENTE')
      .select(`
        numrun_cliente,
        dvrun_cliente,
        nombre_cliente,
        appaterno_cliente,
        apmaterno_cliente,
        dirección_cliente,
        email_cliente,
        numtelefono_cliente,
        id_comuna,
        COMUNA (
          id_comuna,
          desc_comuna,
          id_region
        ),
        fecnac_cliente,
        id_tipo_cliente
        imagen_cliente,
        fec_inicio_contrato_cliente,
        fec_termino_contrato_cliente,
        fec_creacion_cliente
      `)
      .eq('numrun_cliente', id)
      .single();

    if (error) return res.status(400).json({ error });
    if (!data) return res.status(404).json({ error: 'Cliente no encontrado' });

    return res.json(data);
  } catch (error) {
    console.error('Error al obtener el cliente por ID:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateCliente = [
  clienteValidationRules(),
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: 'ID de cliente es requerido' });

      // Asegúrate de que req.body tenga los datos correctos
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Datos de cliente son requeridos' });
      }

      const { data, error } = await supabase
        .from('CLIENTE')
        .update(req.body)
        .eq('numrun_cliente', id)
        .select('*'); // Asegúrate de seleccionar los datos actualizados

      if (error) {
        console.error('Error en la consulta a la base de datos:', error);
        return res.status(400).json({ error: error.message });
      }
      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      return res.json(data[0]); // Devuelve el primer elemento del array de datos actualizados
    } catch (error) {
      console.error('Error al actualizar el cliente:', error.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
];

// Eliminar un cliente
export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID de cliente es requerido' });

    const { data, error } = await supabase
      .from('CLIENTE')
      .delete()
      .eq('numrun_cliente', id);

    if (error) return res.status(400).json({ error });
    if (!data) return res.status(404).json({ error: 'Cliente no encontrado' });

    return res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar el cliente:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Obtener todos los tipos declientes con relaciones
export const getTiposClientes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('TIPO_CLIENTE')
      .select(`
        *
      `)
      .order('desc_tipo_cliente');

    if (error) return res.status(400).json({ error });
    return res.json(data);
  } catch (error) {
    console.error('Error al obtener los tipos de clientes:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const uploadImage = async (req, res) => {
  const { id_cliente, imagen_antigua } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
  }
  const file = req.file;

  const fileName = `pfimg_cliente${id_cliente}_${Date.now()}`;
  const newImageUrl = `https://niqxbeaxtqofvrboxnzb.supabase.co/storage/v1/object/public/imagen_cliente/${fileName}`;

  try {
    // Obtener la URL de la imagen actual del usuario
    const { data: userData, error: userError } = await supabase
      .from('CLIENTE')
      .select('imagen_cliente')
      .eq('numrun_cliente', id_cliente)
      .single();

    if (userError) {
      console.error('Error al obtener la URL de la imagen del cliente', userError);
      throw new Error('Error al obtener la URL de la imagen del cliente');
    }

    // Subir la nueva imagen a Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('imagen_cliente')
      .upload(fileName, file.buffer);

    if (uploadError) {
      console.error('Error al subir la imagen a Supabase', uploadError);
      throw new Error('Error al subir la imagen a Supabase');
    }

    // Actualizar URL de la imagen en la base de datos
    const { error: updateError } = await supabase
      .from('CLIENTE')
      .update({ imagen_cliente: newImageUrl })
      .eq('numrun_cliente', id_cliente);

    if (updateError) {
      console.error('Error al actualizar la URL de la imagen en la base de datos', updateError);
      throw new Error('Error al actualizar la URL de la imagen en la base de datos');
    }

    // Eliminar la imagen anterior del almacenamiento, si existe
    if (imagen_antigua) {
      const oldImagePath = imagen_antigua.replace('https://niqxbeaxtqofvrboxnzb.supabase.co/storage/v1/object/public/imagen_cliente/', '');
      console.log('Imagen antigua a eliminar:', oldImagePath);
      const { error: deleteError } = await supabase.storage
        .from('imagen_cliente')
        .remove([oldImagePath]);

      if (deleteError) {
        console.error('Error al eliminar la imagen anterior de Supabase', deleteError);
        throw new Error('Error al eliminar la imagen anterior de Supabase');
      } else {
        console.log('Imagen antigua eliminada correctamente');
      }
    }

    return res.json({ message: 'Imagen subida y URL actualizada correctamente', newImageUrl });

  } catch (error) {
    console.error('Error en el proceso de subida de imagen', error);
    return res.status(500).json({ error: error.message });
  }
};