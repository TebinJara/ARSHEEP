import React, { useState } from 'react';
import './OrdenTrabajoCrear.css';

export const OrdenTrabajoCrear = () => {
    const [formData, setFormData] = useState({
        descripcion: '',
        hola1: '',
        hola2: '',
        hola3: '',
        hola4: '',
        hola5: '',
        hola6: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <div className='orden-trabajo-crear-container'>
            <div className='orden-trabajo-crear-header'>
                <h2>CREAR ORDEN DE TRABAJO</h2>
            </div>
            <div className='orden-trabajo-crear-content'>
                <div className='orden-trabajo-crear-form-container'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-header'>
                            <h3>INGRESA LOS DATOS DE LA O.T.</h3>
                        </div>
                        <div className='form-level-1'>
                            <div className='form-group'>
                                <label>DESCRIPCIÓN</label>
                                <input
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-level-2'>
                            <div className='form-group'>
                                <label>Hola</label>
                                <input
                                    name="hola1"
                                    value={formData.hola1}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Hola</label>
                                <input
                                    name="hola2"
                                    value={formData.hola2}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Hola</label>
                                <input
                                    name="hola3"
                                    value={formData.hola3}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-level-3'>
                            <div className='form-group'>
                                <label>Hola</label>
                                <input
                                    name="hola4"
                                    value={formData.hola4}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Hola</label>
                                <input
                                    name="hola5"
                                    value={formData.hola5}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Hola</label>
                                <input
                                    name="hola6"
                                    value={formData.hola6}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-level-4'>
                            <button type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
