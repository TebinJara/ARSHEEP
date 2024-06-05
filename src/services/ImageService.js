import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tu-supabase-url.supabase.co'; // Reemplaza con tu URL de Supabase
const supabaseKey = 'tu-supabase-key'; // Reemplaza con tu clave de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImageToSupabase = async (file) => {
    const { data, error } = await supabase.storage
        .from('imagen_cliente')
        .upload(`public/${file.name}`, file);

    if (error) {
        throw new Error('Error al subir la imagen: ' + error.message);
    }

    const { publicURL } = supabase.storage
        .from('imagen_cliente')
        .getPublicUrl(`public/${file.name}`);

    return publicURL;
};