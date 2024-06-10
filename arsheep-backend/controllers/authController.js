import jwt from 'jsonwebtoken';
import supabase from '../database/connection.js';

// Función para generar un token JWT con una duración de 1 hora, incluyendo datos no sensibles
const generarToken = (user) => {
    const payload = {
        id: user.id_usuario,
        nombre_usuario: user.nombre_usuario,
        profile_image: user.profile_image,
        numrun_cliente: user.numrun_cliente,
        id_empleado: user.id_empleado,
        id_tipo_usuario: user.id_tipo_usuario,
        fec_creacion_usuario: user.fec_creacion_usuario,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1H' });
};

// Función de login para autenticar al usuario
export const login = async (req, res) => {
    const { username, password } = req.body;

    console.log('Datos recibidos:', username, password); // Log para verificar datos de entrada

    // Verifica que el nombre de usuario y la contraseña no estén vacíos
    if (!username || !password) {
        return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' });
    }

    try {
        // Busca al usuario en la base de datos
        const { data: user, error: userError } = await supabase
            .from('USUARIO')
            .select('*')
            .eq('nombre_usuario', username)
            .single();

        console.log('Usuario encontrado:', user); // Log para verificar usuario encontrado

        if (userError || !user) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Verifica la contraseña sin encriptación
        if (password !== user.contrasenha) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Busca los datos del empleado en la base de datos
        const { data: empleado, error: empleadoError } = await supabase
            .from('EMPLEADO')
            .select('*')
            .eq('id_empleado', user.id_empleado)
            .single();

        console.log('Empleado encontrado:', empleado); // Log para verificar empleado encontrado

        if (empleadoError) {
            return res.status(400).json({ message: 'Error al obtener los datos del empleado' });
        }

        // Busca los datos del rol en la base de datos
        const { data: rol, error: rolError } = await supabase
            .from('ROL')
            .select('*')
            .eq('id_rol', empleado.id_rol)
            .single();

        console.log('Rol encontrado:', rol); // Log para verificar rol encontrado

        if (rolError) {
            return res.status(400).json({ message: 'Error al obtener los datos del rol' });
        }

        // Busca los datos del tipo de usuario en la base de datos
        const { data: tipoUsuario, error: tipoUsuarioError } = await supabase
            .from('TIPO_USUARIO')
            .select('*')
            .eq('id_tipo_usuario', user.id_tipo_usuario)
            .single();

        console.log('Tipo de Usuario encontrado', tipoUsuario); // Log para verificar tipo de usuario encontrado

        if (tipoUsuarioError) {
            return res.status(400).json({ message: 'Error al obtener los datos del tipo de usuario' });
        }

        // Busca los datos del departamento en la base de datos
        const { data: departamento, error: departamentoError } = await supabase
            .from('DEPARTAMENTO')
            .select('*')
            .eq('id_departamento', rol.id_departamento)
            .single();

        console.log('Departamento encontrado', departamento); // Log para verificar departamento encontrado

        if (departamentoError) {
            return res.status(400).json({ message: 'Error al obtener los datos del departamento' });
        }

        // Genera un token JWT incluyendo datos no sensibles
        const token = generarToken(user);

        // Envía el token y la información no sensible del usuario y del empleado
        res.json({
            token,
            user: {
                id: user.id_usuario,
                nombre_usuario: user.nombre_usuario,
                profile_image: user.profile_image,
                numrun_cliente: user.numrun_cliente,
                id_empleado: user.id_empleado,
                id_tipo_usuario: user.id_tipo_usuario,
                fec_creacion_usuario: user.fec_creacion_usuario,
            },
            empleado: {
                id: empleado.id_empleado,
                pnombre: empleado.pnombre,
                snombre: empleado.snombre,
                apaterno: empleado.apaterno,
                amaterno: empleado.amaterno,
                numero_contacto: empleado.numero_contacto,
            },
            tipoDeUsuario: {
                id: tipoUsuario.id_tipo_usuario,
                desc_tipo_usuario: tipoUsuario.desc_tipo_usuario,
            },
            rol: {
                id: rol.id_rol,
                desc_rol: rol.desc_rol,
            },
            departamento: {
                id: departamento.id_departamento,
                desc_departamento: departamento.desc_departamento,
            }
        });
    } catch (error) {
        console.log('Error inesperado:', error); // Log para verificar error inesperado
        res.status(500).json({ message: 'Error del servidor' });
    }
};
