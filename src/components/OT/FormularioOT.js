import React, { useState, useEffect } from 'react';
import { insertarOrdenTrabajo, obtenerEmpleado, obtenerClientesrun, subirImagen } from '../../services/supa';
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
        imagen_1: '',
        imagen_2: '',
        imagen_3: '',
        imagen_4: ''
    });

    const [clientes, setClientes] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [imagenFiles, setImagenFiles] = useState({ imagen_1: null, imagen_2: null, imagen_3: null, imagen_4: null });

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

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setImagenFiles(prevState => ({
            ...prevState,
            [name]: files[0]
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            let imageUrls = {};
    
            for (let key in imagenFiles) {
                if (imagenFiles[key]) {
                    const { publicUrl } = await subirImagen(imagenFiles[key], key);
                    imageUrls[key] = publicUrl;
                }
            }
    
            const formWithImages = { ...newForm, ...imageUrls };
            const response = await insertarOrdenTrabajo(formWithImages);
            console.log('Respuesta del servidor:', response);
        } catch (error) {
            console.error('Error al insertar datos en Supabase:', error.message);
        }
    };

    return (
        <div className='principal-container'>
            <div className='secondary-container'>
                <div className='simple-container'>
                    <div className='container-header'>
                        <h2>Formulario Orden de Trabajo</h2>
                    </div>
                    <form className="form-grid" onSubmit={handleSubmit}>
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
                                required />
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
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar OT</button>
                    </form>
                </div>
            </div>
            <div className='secondary-container'>
            </div>
        </div>
    );
};

export { FormularioOT };