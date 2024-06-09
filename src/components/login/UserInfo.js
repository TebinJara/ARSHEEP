import React, { useEffect, useState } from 'react';
import "./UserInfo.css";

export const UserInfo = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
   
        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        if (storedUser) {
            setUsername(storedUser.nombre_usuario); // Asume que el nombre de usuario está en la propiedad nombre_usuario
        }
    }, []);

    return (
        <div className='user-info'>
            <div className='user-info-img'>
                <img src="../img/isotipo-arsheep.png" alt="Descripción" />
            </div>
            <p>{username}</p>
            <p>Cargo del usuario</p>
        </div>
    )
}