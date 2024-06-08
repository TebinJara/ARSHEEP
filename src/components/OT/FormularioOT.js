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
    // const [imagenFiles, setImagenFiles] = useState({ imagen_1: null, imagen_2: null, imagen_3: null, imagen_4: null });

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
        console.log(JSON.stringify(newForm));
    };

    // const handleFileChange = (e) => {
    //     const { name, files } = e.target;
    //     setImagenFiles(prevState => ({
    //         ...prevState,
    //         [name]: files[0]
    //     }));
    //     console.log(JSON.stringify(imagenFiles));
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        console.log(JSON.stringify(newForm));
        for (let key in newForm) {
            formData.append(key, newForm[key]);
        }

        // for (let key in imagenFiles) {
        //     if (imagenFiles[key]) {
        //         formData.append(key, imagenFiles[key]);
        //     }
        // }

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const result = await insertarOrdenTrabajo(formData);
            console.log('Respuesta del servidor:', result);
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
                    {/* <div className="form-group">
                        <label htmlFor="imagen_1">Imagen 1:</label>
                        <input
                            type="file"
                            className="form-control"
                            id="imagen_1"
                            name="imagen_1"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imagen_2">Imagen 2:</label>
                        <input
                            type="file"
                            className="form-control"
                            id="imagen_2"
                            name="imagen_2"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imagen_3">Imagen 3:</label>
                        <input
                            type="file"
                            className="form-control"
                            id="imagen_3"
                            name="imagen_3"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imagen_4">Imagen 4:</label>
                        <input
                            type="file"
                            className="form-control"
                            id="imagen_4"
                            name="imagen_4"
                            onChange={handleFileChange}
                        />
                    </div> */}
                    <button type="submit" className="btn btn-primary">Enviar OT</button>
                </form>
            </div>
            <div className='secondary-container'>
            </div>
        </div>
    );
};

export { FormularioOT };
