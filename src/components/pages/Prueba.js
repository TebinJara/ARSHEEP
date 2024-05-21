import React, { useEffect, useState } from 'react'

export const Prueba = () => {
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/api/usuarios')
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(error => console.error('Error fetching data:', error))
    }, [])

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>{usuario.nombre}</li> // Asume que hay un campo `nombre` en tu tabla
                ))}
            </ul>
        </div>
    )
}
