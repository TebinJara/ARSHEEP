// controllers/usuario.js
import supabase from '../database/connection.js';

export const obtenerUsuarios = async (req, res) => {
  const { data, error } = await supabase
    .from('USUARIO')
    .select('*');

  if (error) return res.status(400).json({ error });
  res.json(data);
};

export const agregarUsuario = async (req, res) => {
  const { nombre, edad } = req.body;
  const { data, error } = await supabase
    .from('USUARIO')
    .insert([{ nombre, edad }]);

  if (error) return res.status(400).json({ error });
  res.status(201).json(data);
};