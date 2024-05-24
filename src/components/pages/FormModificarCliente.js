import React, { useState } from 'react';
import { actualizarCliente } from '../../services/ClienteService';
import './FormModificarCliente.css';

export const FormModificarCliente = ({ clienteInicial, onClose, onUpdateCliente }) => {
    const [cliente, setCliente] = useState(clienteInicial);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState('');

    if (!cliente) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente((prevCliente) => ({
            ...prevCliente,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setCliente((prevCliente) => ({
            ...prevCliente,
            imagen_cliente: file
        }));
    };

    const validarCampos = () => {
        const nuevosErrores = {};
        if (!cliente.nombre_cliente) nuevosErrores.nombre_cliente = 'El nombre es obligatorio';
        if (!cliente.direccion_cliente) nuevosErrores.direccion_cliente = 'La dirección es obligatoria';
        if (!cliente.numtelefono_cliente) nuevosErrores.numtelefono_cliente = 'El teléfono es obligatorio';
        if (!cliente.email_cliente) {
            nuevosErrores.email_cliente = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(cliente.email_cliente)) {
            nuevosErrores.email_cliente = 'El email no es válido';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarCampos()) return;

        try {
            const updatedCliente = { ...cliente };
            if (cliente.imagen_cliente instanceof File) {
                const base64Image = await convertFileToBase64(cliente.imagen_cliente);
                updatedCliente.url_imagen_cliente = base64Image;
            }
            await actualizarCliente(cliente.run_cliente, updatedCliente);
            onUpdateCliente(updatedCliente);
            setMensaje('Cliente actualizado con éxito');
            onClose();
        } catch (error) {
            console.error('Error al actualizar el cliente:', error.message);
            setMensaje('Error al actualizar el cliente');
        }
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className='form-modificar-cliente-overlay' onClick={onClose}>
            <div className='form-modificar-cliente-content' onClick={(e) => e.stopPropagation()}>
                <div className='form-modificar-cliente-header'>
                    <h2>Modificar Datos del Cliente</h2>
                    <h3 onClick={onClose}>x</h3>
                </div>
                {mensaje && <p className='mensaje'>{mensaje}</p>}
                <div className='form-modificar-cliente-containt'>
                    <form onSubmit={handleSubmit} className='form-modificar-cliente-form'>
                        <div className='form-modificar-cliente-form-input'>
                            <label>
                                Nombre:
                                <input
                                    type="text"
                                    name="nombre_cliente"
                                    value={cliente.nombre_cliente}
                                    onChange={handleChange}
                                    placeholder="Nombre del cliente"
                                />
                                {errores.nombre_cliente && <p className='error'>{errores.nombre_cliente}</p>}
                            </label>
                            <label>
                                Dirección:
                                <input
                                    type="text"
                                    name="direccion_cliente"
                                    value={cliente.direccion_cliente || ''}
                                    onChange={handleChange}
                                    placeholder="Dirección del cliente"
                                />
                                {errores.direccion_cliente && <p className='error'>{errores.direccion_cliente}</p>}
                            </label>
                            <label>
                                Teléfono:
                                <input
                                    type="text"
                                    name="numtelefono_cliente"
                                    value={cliente.numtelefono_cliente || ''}
                                    onChange={handleChange}
                                    placeholder="Teléfono del cliente"
                                />
                                {errores.numtelefono_cliente && <p className='error'>{errores.numtelefono_cliente}</p>}
                            </label>
                            <label>
                                Teléfono Adicional:
                                <input
                                    type="text"
                                    name="numtelefono2_cliente"
                                    value={cliente.numtelefono2_cliente || ''}
                                    onChange={handleChange}
                                    placeholder="Teléfono adicional"
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email_cliente"
                                    value={cliente.email_cliente || ''}
                                    onChange={handleChange}
                                    placeholder="Email del cliente"
                                />
                                {errores.email_cliente && <p className='error'>{errores.email_cliente}</p>}
                            </label>
                            <label>
                                Fecha de Inicio del Contrato:
                                <input
                                    type="date"
                                    name="fecha_contrato_inicio"
                                    value={cliente.fecha_contrato_inicio || clienteInicial.fecha_contrato_inicio}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Fecha de Término del Contrato:
                                <input
                                    type="date"
                                    name="fecha_contrato_termino_cliente"
                                    value={cliente.fecha_contrato_termino_cliente || clienteInicial.fecha_contrato_termino_cliente}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Imagen del Cliente:
                                <input 
                                    type="file" 
                                    name="imagen_cliente" 
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <div className='form-modificar-cliente-form-buttons'>
                            <button type="submit">Actualizar</button>
                            <button type="button" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                    <div className='form-modificar-cliente-image'>
                        <img src={clienteInicial.url_imagen_cliente} alt={`Imagen de ${clienteInicial.nombre_cliente}`} className="imagen-cliente" />
                    </div>
                </div>
            </div>
        </div>
    );
};