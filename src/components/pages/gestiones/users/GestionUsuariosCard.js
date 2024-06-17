import React, { useState } from 'react';
import './GestionUsuariosCard.css';
import { cambiarEstadoUsuario, subirImagenUsuarioEmpleado } from '../../../../services/GestionUsuariosService';
import Switch from '@mui/material/Switch';


export const GestionUsuariosCard = ({ user, onClose, actualizarUsuarios }) => {
    const [estadoUsuario, setEstadoUsuario] = useState(user.estado_usuario);
    const [profileImage, setProfileImage] = useState(user.profile_image || '../img/isotipo-arsheep.png');
    const [selectedImage, setSelectedImage] = useState(user.profile_image || '../../img/no_photo_arsheep.png');
    const [fileImage, setFileImage] = useState();



    const handleEstadoChangeSwitch = (event) => {
        const nuevoEstado = event.target.checked;
        setEstadoUsuario(nuevoEstado);
    }

    const handleEstadoChange = async () => {
        try {
            const resultado = await cambiarEstadoUsuario(user.id_usuario, estadoUsuario);
            if (resultado) {
                actualizarUsuarios();
            }
        } catch (error) {
            console.error('Error al cambiar el estado del usuario:', error);
        }
    };

    const handleImageUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('id_usuario', user.id_usuario);
        formData.append('imagen_antigua', user.profile_image);

        try {
            const response = await subirImagenUsuarioEmpleado(formData);

            if (response && response.newImageUrl) {
                const newImageUrl = response.newImageUrl;
                setProfileImage(newImageUrl);
                actualizarUsuarios();
            } else {
                console.error('La respuesta del servidor no contiene la URL de la imagen');
            }
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setFileImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGuardar = () => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
        if (confirmacion) {
            handleImageUpload(fileImage);
            handleEstadoChange();
            onClose()
        }
    };

    return (
        <div className='modal-container'>
            <div className="card">
                <div className="card-header">
                    <span onClick={onClose}>X</span>
                </div>
                <div className="card-title">
                    <h1>Datos del Usuario # {" " + user.id_usuario}</h1>
                </div>
                <div className='card-image'>
                    <img
                        src={selectedImage}
                        alt={`Imagen de ${user.nombre_usuario}`}
                        onClick={() => document.getElementById('imageUpload').click()}
                    />
                    <input
                        type="file"
                        id="imageUpload"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </div>
                <div className="card-content">
                    <div className="card-row">
                        <div className="card-item">
                            <strong>NOMBRE DE USUARIO:</strong><span>{user.nombre_usuario}</span>
                        </div>
                    </div>
                    <div className="card-row">
                        <div className="card-item">
                            <strong>ESTADO:</strong><span>{(user.estado_usuario) ? "ACTIVO" : "INACTIVO"}</span>
                        </div>
                    </div>
                    <div className="card-row">
                        <div className="card-item">
                            <strong>ID EMPLEADO:</strong><span>{user.id_empleado}</span>
                        </div>
                        <div className="card-item">
                            <strong>FUNCIÓN:</strong><span>{user.EMPLEADO.ROL.desc_rol}</span>
                        </div>
                    </div>
                    <div className="card-row">
                        <div className="card-item">
                            <strong>NOMBRE:</strong><span>{`${user.EMPLEADO.pnombre} ${user.EMPLEADO.apaterno} ${user.EMPLEADO.amaterno}`}</span>
                        </div>
                    </div>
                    <div className="card-row">
                        <div className="card-item">
                            <strong>TELÉFONO:</strong><span>{user.EMPLEADO.numero_contacto}</span>
                        </div>
                    </div>

                </div>
                <div className="card-footer">
                    <div className='switch_container'>
                        <label>
                            <Switch
                                checked={estadoUsuario}
                                onChange={handleEstadoChangeSwitch}
                                className="custom-switch"
                            />
                            {estadoUsuario ? 'Desactivar Usuario' : 'Activar Usuario'}
                        </label>
                    </div>
                    <div>
                        <button onClick={handleGuardar}>Guardar</button>
                        <button onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};