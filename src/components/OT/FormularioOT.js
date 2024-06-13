import React, { useState, useEffect } from 'react';
import { obtenerEmpleados, obtenerClientes, insertarOrdenTrabajo } from '../../services/OtService';
import './FormularioOT.css';

const FormularioOT = () => {
    const [newForm, setNewForm] = useState({
        descripcion: '',
        status: '',
        fecha_creacion: '',
        fecha_vencimiento: '',
        prioridad: '',
        adicional: '',
        numrun_cliente: '',
        id_empleado: '',
    });

    const [clientes, setClientes] = useState([]);
    const [empleados, setEmpleados] = useState([]);

    // Estados de las OT
    const estados = {
        1: 'Ingresada',
        2: 'En Proceso',
        3: 'Cancelada',
        4: 'Completada',
    };

    useEffect(() => {
        const cargarClientes = async () => {
            try {
                const listaClientes = await obtenerClientes();
                console.log('Clientes recibidos:', listaClientes);
                setClientes(listaClientes);
            } catch (error) {
                console.error('Error al cargar clientes:', error);
            }
        };

        const cargarEmpleados = async () => {
            try {
                const listaEmpleados = await obtenerEmpleados();
                console.log('Empleados recibidos:', listaEmpleados);
                setEmpleados(listaEmpleados);
            } catch (error) {
                console.error('Error al cargar empleados:', error);
            }
        };

        cargarClientes();
        cargarEmpleados();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewForm(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log('Formulario actualizado:', JSON.stringify(newForm));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        for (let key in newForm) {
            formData.append(key, newForm[key]);
        }
    
        try {
            const result = await insertarOrdenTrabajo(formData);
            console.log('Respuesta del servidor:', result);
    
            if (result && result.id_ot) {
                const id_ot = result.id_ot;
                localStorage.setItem('id_ot', id_ot);
                window.location.href = '/Layout/UploadImage';
    
                const empleadoSeleccionado = empleados.find(empleado => empleado.id_empleado.toString() === newForm.id_empleado.toString());
                if (empleadoSeleccionado && empleadoSeleccionado.correo) {
                    console.log('Empleado seleccionado:', empleadoSeleccionado);
    
                    const correoData = {
                        destinatario: empleadoSeleccionado.correo,
                        asunto: `Nueva OT Asignada - ${id_ot}`,
                        texto: `Se ha creado una nueva OT con la siguiente información:\n\nDescripción: ${newForm.descripcion}\nEstado: ${estados[newForm.status]}\nFecha de Creación: ${newForm.fecha_creacion}\nFecha de Vencimiento: ${newForm.fecha_vencimiento}\nPrioridad: ${newForm.prioridad}\nInformación Adicional: ${newForm.adicional}\nRUT Cliente: ${newForm.numrun_cliente}\nEmpleado: ${empleadoSeleccionado.pnombre} ${empleadoSeleccionado.snombre ? empleadoSeleccionado.snombre + ' ' : ''}${empleadoSeleccionado.apaterno} ${empleadoSeleccionado.amaterno}\n\nHaz clic aquí para ver más detalles: http://localhost:3000/Layout/OT`
                    };
                    
    
                    console.log('Enviando datos al servidor de correo:', correoData);
    
                    const response = await fetch('http://localhost:3001/enviar-correo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(correoData),
                    });
    
                    const responseData = await response.text();
                    console.log('Respuesta del servidor de correo:', responseData);
                } else {
                    console.error('No se encontró el correo del empleado seleccionado.');
                }
            } else {
                console.error('El id_ot no está disponible en la respuesta del servidor:', result);
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };    

    return (
        <div className='principal-container'>
            <div className='secondary-container'>
                <div className='container-header'>
                    <h2>Formulario Orden de Trabajo</h2>
                </div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="descripcion"
                            name="descripcion"
                            placeholder="Ingrese la descripción de la OT"
                            value={newForm.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Estado:</label>
                        <select
                            className="form-control"
                            id="status"
                            name="status"
                            value={newForm.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione Estado</option>
                            {Object.keys(estados).map((key) => (
                                <option key={key} value={key}>
                                    {estados[key]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fecha_creacion">Fecha de Creación:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fecha_creacion"
                            name="fecha_creacion"
                            value={newForm.fecha_creacion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fecha_vencimiento">Fecha de Vencimiento:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fecha_vencimiento"
                            name="fecha_vencimiento"
                            value={newForm.fecha_vencimiento}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prioridad">Prioridad:</label>
                        <select
                            className="form-control"
                            id="prioridad"
                            name="prioridad"
                            value={newForm.prioridad}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione la prioridad</option>
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="adicional">Información Adicional:</label>
                        <textarea
                            className="form-control"
                            id="adicional"
                            name="adicional"
                            rows="3"
                            placeholder="Ingrese información adicional"
                            value={newForm.adicional}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="numrun_cliente">RUT Cliente:</label>
                        <select
                            className="form-control"
                            id="numrun_cliente"
                            name="numrun_cliente"
                            value={newForm.numrun_cliente}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione un cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.numrun_cliente} value={cliente.numrun_cliente}>
                                    {cliente.numrun_cliente}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="id_empleado">Empleado:</label>
                        <select
                            className="form-control"
                            id="id_empleado"
                            name="id_empleado"
                            value={newForm.id_empleado}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione un empleado</option>
                            {empleados.map(empleado => (
                                <option key={empleado.id_empleado} value={empleado.id_empleado}>
                                    {`${empleado.pnombre} ${empleado.snombre ? empleado.snombre + ' ' : ''}${empleado.apaterno} ${empleado.amaterno}`}
                                </option>
                            ))}
                        </select>
                    </div>
                  
                    <button type="submit" className="btn btn-primary">Enviar OT</button>
                </form>
            </div>
            <div className='secondary-container'>
            </div>
        </div>
    );
};

export { FormularioOT };
