import jwt from 'jsonwebtoken';
import supabase from '../database/connection.js';

const generarToken = (userId) => {
    // Genera un token JWT con una duración de 1 hora
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '10s' });
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    // Verifica que el nombre de usuario y la contraseña no estén vacíos
    if (!username || !password) {
        return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' });
    }

    // Busca al usuario en la base de datos
    const { data: user, error } = await supabase
        .from('USUARIO')
        .select('*')
        .eq('nombre_usuario', username)
        .single();

    // Si hay un error o el usuario no existe
    if (error || !user) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Verifica la contraseña sin encriptación
    if (password !== user.contrasenha) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Genera un token JWT
    const token = generarToken(user.id_usuario);

    // Envía el token y la información no sensible del usuario
    res.json({
        token,
        user: {
            id: user.id_usuario,
            nombre_usuario: user.nombre_usuario,
            email: user.email
        }
    });
};