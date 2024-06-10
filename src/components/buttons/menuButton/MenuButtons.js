import React from 'react'
import './MenuButtons.css'

export const MenuButtons = ({ direction }) => {
  
  return (
    <div className={`menu-button-container-${direction}`}>
      <button>Cambiar Contraseña</button>
      <button>Actualizar Datos</button>
      <button>Desactivar Cuenta</button>
      <button>Desactivar Cuenta</button>
      <button>Desactivar Cuenta</button>
      <button>Desactivar Cuenta</button>
    </div>
  )
}