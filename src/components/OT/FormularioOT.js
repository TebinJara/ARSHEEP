import React, { useState, useEffect } from 'react';
import { insertarOrdenTrabajo } from '../../services/OtService';
import { getEmpleados } from '../../services/empleadoService';
import { getClientes } from '../../services/ClienteService';
import './FormularioOT.css';
import { sendMailOTasignation } from '../../services/emailService';

const FormularioOT = () => {
    const [newForm, setNewForm] = useState({
        desc_ot: '',
        status: '',
        fecha_creacion: '',
        fecha_vencimiento: '',
        numrun_cliente: '',
        id_empleado: ''
    });

    const [clientes, setClientes] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [idOTAsignada, setIdOTAsignada] = useState(null);

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
                const listaClientes = await getClientes();
                console.log('Clientes recibidos:', listaClientes);
                setClientes(listaClientes);
            } catch (error) {
                console.error('Error al cargar clientes:', error);
            }
        };

        const cargarEmpleados = async () => {
            try {
                const listaEmpleados = await getEmpleados();
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
        console.log('Formulario actualizado:', JSON.stringify({ ...newForm, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const result = await insertarOrdenTrabajo(newForm);
            console.log('Respuesta del servidor:', result);
    
            if (result && result.id_ot) {
                const id_ot = result.id_ot;
                setIdOTAsignada(id_ot);
                localStorage.setItem('id_ot', id_ot);

                const urlOT = `${window.location.origin}/Layout/OT/${id_ot}`; //Para que al hacer click en el enlace del correo te redirige a la pagina de la orden de trabajo

                console.log('URL de la Orden de Trabajo:', urlOT);

                const empleadoSeleccionado = empleados.find(empleado => empleado.id_empleado.toString() === newForm.id_empleado.toString());
                if (empleadoSeleccionado && empleadoSeleccionado.correo) {
                    console.log('Empleado seleccionado:', empleadoSeleccionado);
    
                    const correoData = {
                        destinatario: empleadoSeleccionado.correo,
                        asunto: `Nueva OT Asignada - ${id_ot}`,
                        texto: `Se ha creado una nueva OT con la siguiente información:\n\nDescripción: ${newForm.desc_ot}\nEstado: ${estados[newForm.status]}\nFecha de Creación: ${newForm.fecha_creacion}\nFecha de Vencimiento: ${newForm.fecha_vencimiento}\nPrioridad: ${"prioridad"}\nInformación Adicional: ${"adicional"}\nRUT Cliente: ${newForm.numrun_cliente}\nEmpleado: ${empleadoSeleccionado.pnombre} ${empleadoSeleccionado.snombre ? empleadoSeleccionado.snombre + ' ' : ''}${empleadoSeleccionado.apaterno} ${empleadoSeleccionado.amaterno}\n\nHaz clic aquí para ver más detalles: Orden de trabajo ${urlOT}`
                    };
    
                    console.log('Enviando datos al servidor de correo:', correoData);
                    const response = await sendMailOTasignation(correoData);
                    console.log('Respuesta del servidor de correo:', response);
                } else {
                    console.error('No se encontró el correo del empleado seleccionado.');
                }

                window.location.href = '/Layout/UploadImage';
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
                        <label htmlFor="desc_ot">Descripción:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="desc_ot"
                            name="desc_ot"
                            placeholder="Ingrese la descripción de la OT"
                            value={newForm.desc_ot}
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
