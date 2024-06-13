import supabase from '../database/connection.js';

export const getEmpleados = async (req, res) => {
    const { data, error } = await supabase
        .from('EMPLEADO')
        .select('*');

    if (error) {
        console.error('Error al obtener empleados:', error);
        return res.status(400).json({ error });
    }

    // Verifica la estructura de los datos
    if (data.length > 0) {
        console.log('Estructura de un empleado:', data[0]);
    }

    return res.json(data);
};