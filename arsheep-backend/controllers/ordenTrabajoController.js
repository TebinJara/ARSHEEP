import supabase from '../database/connection.js';


export const createOrdenTrabajo = async (req, res) => {
    const {descripcion, status, fechaCreacion, fechaVencimiento, prioridad, adicional, imgUrls } = req.body;
    const { data, error } = await supabase
      .from('ORDEN_TRABAJO')
      .insert([{descripcion, status, fechaCreacion, fechaVencimiento, prioridad, adicional, imgUrls }]);
  
    if (error) return res.status(400).json({ error });
    res.status(201).json(data);
  };