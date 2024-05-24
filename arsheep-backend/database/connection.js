import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// URL de tu instancia de Supabase desde las variables de entorno
const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Clave de API para autenticar las solicitudes a Supabase desde las variables de entorno
const supabaseKey = process.env.VITE_SUPABASE_KEY;

// Creación de una instancia del cliente de Supabase con la URL y la clave
const supabase = createClient(supabaseUrl, supabaseKey);

// Exportación de la instancia de Supabase para ser utilizada en otras partes de la aplicación
export default supabase;