import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { obtenerUsuario } from '../../services/supa';
import "./Login.css";

export const Login = () => {

    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let iniciarSesion = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const usuarios = await obtenerUsuario();
            setData(usuarios);
        };
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Busca en data si existe un usuario con el username y password ingresados
        const userExists = data.some(usuario => usuario.nombre_usuario === username && usuario.contrasenha === password);
        if (userExists) {
            iniciarSesion('/Layout'); // Si el usuario es válido, navega a '/Clientes'
        } else {
            alert('Usuario o contraseña incorrectos'); // O opcionalmente manejar este caso de otra manera
        }

    };

    return (


        <div className='login-container'>
            <form onSubmit={handleSubmit} className='form-container'>
                <div className='login-header'>
                    <h1>Inicia Sesión</h1>
                </div>
                <div className='form-group'>
                    <label htmlFor="username">Usuario:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        placeholder='Ingresa tu correo electrónico'
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        placeholder='Ingresa tu correo contraseña'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Iniciar sesión</button>

                <div className='login-footer'>
                    <p>Recupera tu Contraseña</p>
                    <p>Politicas y condiciones</p>
                </div>
            </form>
            <div className='login-info'>

                <div className='login-info-header'>
                    <img src={process.env.PUBLIC_URL + '/img/isotipo-arsheep.png'} alt='Logo Arsheep' />
                    <img src={process.env.PUBLIC_URL + '/img/logotipo-arsheep.png'} alt='Logo Arsheep' />
                </div>

                <div className='login-info-content'>
                    <h1>Bienvenido a ARSHEEP</h1>
                    <p>La plataforma definitiva para la gestión de trabajos de mantenimiento industrial. Aquí, los equipos de mantenimiento encuentran el lugar perfecto para planificar, ejecutar y supervisar sus tareas de manera eficiente y organizada.</p>
                    <div className='login-info-list'>
                            <aside>
                                <h3>Gestión de Tareas y Proyectos</h3>
                                <p>Crea, asigna y sigue tareas y proyectos de mantenimiento fácilmente.</p>
                            </aside>
                            <aside>
                                <h3>Gestión de Tareas y Proyectos</h3>
                                <p>Crea, asigna y sigue tareas y proyectos de mantenimiento fácilmente.</p>
                            </aside>
                            <aside>
                                <h3>Gestión de Tareas y Proyectos</h3>
                                <p>Crea, asigna y sigue tareas y proyectos de mantenimiento fácilmente.</p>
                            </aside>
                            <aside>
                                <h3>Gestión de Tareas y Proyectos</h3>
                                <p>Crea, asigna y sigue tareas y proyectos de mantenimiento fácilmente.</p>
                            </aside>
                            <aside>
                                <h3>Gestión de Tareas y Proyectos</h3>
                                <p>Crea, asigna y sigue tareas y proyectos de mantenimiento fácilmente.</p>
                            </aside>

                    
                    </div>

                </div>

            </div>
        </div>

    );

}