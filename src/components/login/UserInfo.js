import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./UserInfo.css";

export const UserInfo = () => {
    const [username, setUsername] = useState('');
    const [nombreEmpleado, setNombreEmpleado] = useState('');
    const [tipoDeUsuario, setTipoDeUsuario] = useState('');
    const [rol, setRol] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        const storedEmpleado = JSON.parse(localStorage.getItem('empleado'));
        const storedRol = JSON.parse(localStorage.getItem('rol'));
        const storedTipoUsuario = JSON.parse(localStorage.getItem('tipoUsuario'));

        if (storedUser) {
            setUsername(storedUser.nombre_usuario);
            setNombreEmpleado(`${storedEmpleado.pnombre} ${storedEmpleado.apaterno} ${storedEmpleado.amaterno}`);
            setTipoDeUsuario(storedTipoUsuario.desc_tipo_usuario);
            setRol(storedRol.desc_rol);
        }
    }, []);

    return (
        <div className='user-info'>
            <p>{tipoDeUsuario}</p>
            <div className='user-info-img'>
                <NavLink to="/Layout/PerfilUsuario">
                    <img src={JSON.parse(localStorage.getItem('usuario')).profile_image || '../img/isotipo-arsheep.png'} alt={`Imagen de ${username}`} />
                </NavLink>
            </div>
            <p>{nombreEmpleado}</p>
            <p>{rol}</p>  
        </div>
    );
};
