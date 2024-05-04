import React from 'react'
import "../pages/PageCliente.css";
import { TablaClientes } from '../tables/TablaClientes';

export const PageCliente = () => {
    return (
        <div className='page-cliente'>

           <TablaClientes/>
            
        </div>
    )
}
