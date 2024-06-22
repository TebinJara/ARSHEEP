import React, { useEffect, useState } from 'react';
import "./UserData.css";
import { InfoCard } from '../../InfoCard/InfoCard';
import { MenuButtons } from '../../buttons/menuButton/MenuButtons';

export const UserData = () => {

    const [username, setUsername] = useState('');
    const [usuario, setUsuario] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {

        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        const storedEmpleado = JSON.parse(localStorage.getItem('empleado'));
        const storedRol = JSON.parse(localStorage.getItem('rol'));
        const storedTipoUsuario = JSON.parse(localStorage.getItem('tipoUsuario'));
        const storedDepartamento = JSON.parse(localStorage.getItem('departamento'));



        if (storedUser) {

            setUsername(storedUser.nombre_usuario);

            setImage(storedUser.profile_image)

            setUsuario(
                {
                    "USUARIO": storedUser.nombre_usuario,
                    "ROL": storedTipoUsuario.desc_tipo_usuario,
                    "FECHA DE CREACIÓN": storedUser.fec_creacion_usuario,
                    "ID EMPLEADO": storedUser.id_empleado,
                    "DEPARTAMENTO": storedDepartamento.desc_departamento,
                    "FUNCIÓN": storedRol.desc_rol,
                    "NOMBRE": `${storedEmpleado?.pnombre || ''} ${storedEmpleado?.snombre || ''} ${storedEmpleado?.apaterno || ''} ${storedEmpleado?.amaterno || ''}`,
                    "TELÉFONO": storedEmpleado.numero_contacto
                }
            );

        }

    }, []);

    return (
        <div className='user-config'>
            <div className='data-usuario'>
                <InfoCard title="Información del Usuario" data={usuario} image={image} />
            </div>
        </div>
    );
};