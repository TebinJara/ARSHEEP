import React from 'react'
import './ClienteTile.css'
import { useNavigate } from 'react-router-dom';

export const ClienteTile = ({ cliente }) => {

    const formatearRUT = (run, dv) => {
        const runStr = run.toString();
        const runFormateado = runStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return `${runFormateado}-${dv}`;
    };
    const navigate = useNavigate();
    const hola = () => {
        navigate('/Layout/Clientes/ficha', { state: { cliente } });
    };


    return (
        <div className='tile-container' onClick={hola} >
            <div className='tile'>
                <div className='tile-image-container'>
                    <img
                        src={cliente.imagen_cliente||'../../img/no_photo_arsheep.png'}
                        alt='Imagen de'
                    />
                </div>
                <p> {cliente.nombre_cliente + ' ' + cliente.appaterno_cliente + ' ' + cliente.apmaterno_cliente} </p>
                <p>{formatearRUT(cliente.numrun_cliente, cliente.dvrun_cliente)}</p>
            </div>
        </div>
    )
}
