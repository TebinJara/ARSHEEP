import React from 'react'
import "../comp-layout/LayoutFooter.css";

export const LayoutFooter = () => {
  return (
    <div className='footer'>
        <p>© 2024 arsheep.com - Todos los derechos reservados</p>
        <a href="mailto:info@arsheep.com">Contacto</a>
        <a href="/politica-de-privacidad">Política de Privacidad</a>
        <a href="/terminos-de-servicio">Términos de Servicio</a>
    </div>
  )
}
