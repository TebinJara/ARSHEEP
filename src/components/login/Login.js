import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import "./Login.css";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(username, password);

            // Guarda el token y la información del usuario en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', JSON.stringify(data.user));
            localStorage.setItem('empleado', JSON.stringify(data.empleado));
            localStorage.setItem('tipoUsuario', JSON.stringify(data.tipoDeUsuario));
            localStorage.setItem('rol', JSON.stringify(data.rol));
            localStorage.setItem('departamento', JSON.stringify(data.departamento));



            // Navega a la página principal
            navigate('Layout');
        } catch (error) {
            alert('Usuario o contraseña incorrectos');
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
                        placeholder='Ingresa tu nombre de usuario'
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        placeholder='Ingresa tu contraseña'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
                <div className='login-footer'>
                    <p>Recupera tu Contraseña</p>
                    <p>Políticas y condiciones</p>
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
                    </div>
                </div>
            </div>
        </div>
    );
};
