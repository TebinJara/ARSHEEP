import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://niqxbeaxtqofvrboxnzb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcXhiZWF4dHFvZnZyYm94bnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NTMyMDksImV4cCI6MjAzMDQyOTIwOX0.k025dPkt6rB55YNbs1elSUr-Zoi1CF5Of_HDOV3OENc';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export const obtenerClientes = async () => {
    const { data, error } = await supabase.from('CLIENTE').select('*');
    if (error) throw error;
    return data;
};

export const obtenerUsuario = async () => {
    const { data, error } = await supabase.from('USUARIO').select('*');
    if (error) throw error;
    return data;
};

export const obtenerOrdenesDeTrabajo = async () => {
    const { data, error } = await supabase.from('ORDEN_TRABAJO').select('*');
    if (error) throw error;
    return data;
};

export const obtenerEmpleadoPorId = async (idEmpleado) => {
    const { data, error } = await supabase.from('EMPLEADO').select('*').eq('id_empleado', idEmpleado).single();
    if (error) throw error;
    return data;
};

export const obtenerStatusPorId = async (idStatus) => {
    const { data, error } = await supabase.from('TIPO_STATUS').select('*').eq('status', idStatus).single();
    if (error) throw error;
    return data;
};

export const uploadImagen1 = async (file) => {
    const filePath = `img1/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from('imgOT').upload(filePath, file);
    if (error) throw error;
    return data.Key;
};