import React, { useState, useEffect } from 'react';
import { insertarOrdenTrabajo, obtenerEmpleado, obtenerClientesrun } from '../../services/supa';
import './FormularioOT.css';

const FormularioOT = () => {
    const [newForm, setNewForm] = useState({
        descripción: '',
        status: '',
        fecha_creacion: '',
        fecha_vencimiento: '',
        prioridad: '',
        adicional: '',
        run_cliente: '',
        id_empleado: '',
        imagen_1: ''
    });

    const [clientes, setClientes] = useState([]);
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        const cargarClientes = async () => {
            try {
                const listaClientes = await obtenerClientesrun();
                setClientes(listaClientes);
            } catch (error) {
                console.error('Error al cargar clientes:', error);
            }
        };

        const cargarEmpleados = async () => {
            try {
                const listaEmpleados = await obtenerEmpleado();
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
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await insertarOrdenTrabajo(newForm);
            console.log('Respuesta del servidor:', response);
        } catch (error) {
            console.error('Error al insertar datos en Supabase:', error.message);
        }
    };

    return (
        <div className='principal-container'>
            <div className='secondary-container'>
                <form className="form-grid" onSubmit={handleSubmit}>
                    <div className='container-header'>
                        <h2>Información del Cliente</h2>
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripción">Descripción:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="descripción"
                            name="descripción"
                            placeholder="Ingrese la descripción de la OT"
                            value={newForm.descripción}
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
                            <option value="1">Ingresada</option>
                            <option value="2">En Proceso</option>
                            <option value="3">Cancelada</option>
                            <option value="4">Completada</option>
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
                        <label htmlFor="run_cliente">RUT Cliente:</label>
                        <select
                            className="form-control"
                            id="run_cliente"
                            name="run_cliente"
                            value={newForm.run_cliente}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione un cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.run_cliente} value={cliente.run_cliente}>{cliente.nombre_cliente}</option>
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
                                <option key={empleado.id_empleado} value={empleado.id_empleado}>{empleado.nombreCompleto}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="imagen_1">Imagen 1:</label>
                        <textarea
                            className="form-control"
                            id="imagen_1"
                            name="imagen_1"
                            rows="3"
                            placeholder="Ingrese información de la imagen"
                            value={newForm.imagen_1}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar OT</button>
                </form>

            </div><div className='secondary-container'>

            </div>
        </div>
    );
};

export { FormularioOT };