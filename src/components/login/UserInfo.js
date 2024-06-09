import React, { useEffect, useState } from 'react';
import "./UserInfo.css";
import { NavLink } from 'react-router-dom';

export const UserInfo = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
   
        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        if (storedUser) {
            setUsername(storedUser.nombre_usuario); // Asume que el nombre de usuario está en la propiedad nombre_usuario
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        window.location.href = '/';
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    

    return (
        <div className='user-info'>
            <div className='user-info-img'>
                <img src="../img/isotipo-arsheep.png" alt="Descripción" />
            </div>
            <p className='user-text'>{capitalizeFirstLetter(username)}</p>
            <p className='user-text'>Cargo del usuario</p>
            <NavLink className={({ isActive }) => isActive ? "navlink-activo" : "navlink"} onClick={handleLogout}>
                <p className='user-text'>Cerrar sesión</p>
            </NavLink>
        </div>
    )
}