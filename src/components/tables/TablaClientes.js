import React, { useEffect, useState } from 'react'
import './TablaClientes.css';

const dataInicial = [
    { id: 1000, rut: '76.491.710 - 3', nombre: 'CLÍNICA MIRAFLORES S.A.', direccion: 'Los Fresnos 276, Miraflores Bajo', comuna: 'Viña del Mar', region: 'Valparaíso', telefono: '322389910', correo: 'secretariagerencia@clínicamiraflores.cl', img: 'imprcl_1000.png', fec_contrato: '01/02/2023', fec_termino_contrato: '01/09/2024', cant_ot: 10 },
    { id: 1001, rut: '76.020.458 - 7', nombre: 'RED SALUD S.A.', direccion: '3 Nte. 464, 2520276', comuna: 'Viña del Mar', region: 'Valparaíso', telefono: '600 718 6000', correo: 'administracion@redsalud.cl', img: 'imprcl_1001.jpg', fec_contrato: '02/04/2023', fec_termino_contrato: '01/05/2024', cant_ot: 8 },
    { id: 1002, rut: '76.130.465 - 1', nombre: 'INVERSIONES DEL PACÍFICO LTDA.', direccion: 'Avenida Del Mar 1230, La Serena', comuna: 'La Serena', region: 'Coquimbo', telefono: '512345678', correo: 'contacto@inversionesdp.cl', img: 'imprcl_1002.jpg', fec_contrato: '15/05/2023', fec_termino_contrato: '15/07/2024', cant_ot: 12 },
    { id: 1003, rut: '76.245.999 - 8', nombre: 'ECO ENERGÍA S.A.', direccion: 'Ruta 5 Sur 456, Temuco', comuna: 'Temuco', region: 'Araucanía', telefono: '452312564', correo: 'info@ecoenergia.cl', img: 'imprcl_1003.jpg', fec_contrato: '01/06/2023', fec_termino_contrato: '01/06/2024', cant_ot: 5 },
    { id: 1004, rut: '76.345.210 - 4', nombre: 'AGROCAMPO LTDA.', direccion: 'Camino a Pichilemu 7980, Rancagua', comuna: 'Rancagua', region: 'O\'Higgins', telefono: '722345678', correo: 'ventas@agrocampo.cl', img: 'imprcl_1004.png', fec_contrato: '21/07/2023', fec_termino_contrato: '21/07/2024', cant_ot: 7 },
    { id: 1005, rut: '76.478.165 - 9', nombre: 'BIOTECNOLOGÍAS MODERNAS SPA', direccion: 'Los Industriales 1110, Quilicura', comuna: 'Santiago', region: 'Metropolitana', telefono: '225678900', correo: 'contacto@biotecmod.cl', img: 'imprcl_1005.jpg', fec_contrato: '12/08/2023', fec_termino_contrato: '12/08/2024', cant_ot: 15 },
    { id: 1006, rut: '76.589.674 - 2', nombre: 'CONSTRUCTORA ALTA VISTA S.A.', direccion: 'Gran Avenida 4562, San Miguel', comuna: 'San Miguel', region: 'Metropolitana', telefono: '229876543', correo: 'proyectos@altavista.cl', img: 'imprcl_1006.png', fec_contrato: '17/09/2023', fec_termino_contrato: '17/03/2024', cant_ot: 10 },
    { id: 1007, rut: '76.610.387 - 5', nombre: 'METALMECÁNICA LA ESTRELLA S.A.', direccion: 'Calle Nueva 234, Talcahuano', comuna: 'Talcahuano', region: 'Biobío', telefono: '412345678', correo: 'ventas@mecanicalestrella.cl', img: 'imprcl_1007.jpg', fec_contrato: '05/11/2023', fec_termino_contrato: '05/05/2024', cant_ot: 9 },
    { id: 1008, rut: '76.720.951 - 6', nombre: 'RESTAURANTES DEL SUR S.A.', direccion: 'Avenida Pedro Montt 123, Puerto Montt', comuna: 'Puerto Montt', region: 'Los Lagos', telefono: '652345678', correo: 'reservas@restaurantesdelsur.cl', img: 'imprcl_1008.jpg', fec_contrato: '23/12/2023', fec_termino_contrato: '23/06/2024', cant_ot: 11 },
    { id: 1009, rut: '76.834.500 - 7', nombre: 'ACADEMIA DE ARTES VISUALES', direccion: 'Avenida Matta 172, Valdivia', comuna: 'Valdivia', region: 'Los Ríos', telefono: '632345678', correo: 'admisiones@aartesv.cl', img: 'imprcl_1009.jpg', fec_contrato: '10/01/2024', fec_termino_contrato: '10/01/2025', cant_ot: 6 },
    { id: 1010, rut: '76.945.318 - 4', nombre: 'TIENDAS MAX AHORRO', direccion: 'Paseo Bulnes 450, Punta Arenas', comuna: 'Punta Arenas', region: 'Magallanes', telefono: '612345678', correo: 'contacto@maxahorro.cl', img: 'imprcl_1010.jpg', fec_contrato: '28/02/2024', fec_termino_contrato: '28/02/2025', cant_ot: 8 },
    { id: 1011, rut: '76.056.789 - 1', nombre: 'HOTEL COSTA PACÍFICO', direccion: 'Avenida Del Mar 2500, Antofagasta', comuna: 'Antofagasta', region: 'Antofagasta', telefono: '552345678', correo: 'recepcion@costapacifico.cl', img: 'imprcl_1011.png', fec_contrato: '15/03/2024', fec_termino_contrato: '15/09/2024', cant_ot: 10 },
    { id: 1012, rut: '76.111.222 - 3', nombre: 'GALERÍA DE ARTE MODERNO', direccion: 'Avenida Libertador 3344, Arica', comuna: 'Arica', region: 'Arica y Parinacota', telefono: '582345678', correo: 'info@galeriaartemoderno.cl', img: 'imprcl_1012.jpg', fec_contrato: '20/03/2024', fec_termino_contrato: '20/09/2024', cant_ot: 7 },
    { id: 1013, rut: '76.223.334 - 5', nombre: 'SERVICIOS INDUSTRIALES BETA', direccion: 'Sector Industrial 567, Copiapó', comuna: 'Copiapó', region: 'Atacama', telefono: '522345678', correo: 'contacto@serviciosbeta.cl', img: 'imprcl_1013.png', fec_contrato: '15/04/2024', fec_termino_contrato: '15/10/2024', cant_ot: 12 },
    { id: 1014, rut: '76.334.445 - 6', nombre: 'INVERSIONES Y PROPIEDADES ALFA', direccion: 'Gran Avenida 789, La Calera', comuna: 'La Calera', region: 'Valparaíso', telefono: '332345678', correo: 'ventas@inversionesalfa.cl', img: 'imprcl_1014.jpg', fec_contrato: '01/05/2024', fec_termino_contrato: '01/11/2024', cant_ot: 9 },
    { id: 1015, rut: '76.445.556 - 7', nombre: 'CONFECCIONES DEL NORTE', direccion: 'Calle Larga 890, Iquique', comuna: 'Iquique', region: 'Tarapacá', telefono: '572345678', correo: 'info@confeccionesdelnorte.cl', img: 'imprcl_1015.png', fec_contrato: '18/06/2024', fec_termino_contrato: '18/12/2024', cant_ot: 8 },
    { id: 1016, rut: '76.556.667 - 8', nombre: 'LABORATORIOS CLÍNICOS VIDALAB', direccion: 'Avenida Alemania 1001, Puerto Varas', comuna: 'Puerto Varas', region: 'Los Lagos', telefono: '652345679', correo: 'recepcion@vidalab.cl', img: 'imprcl_1016.jpg', fec_contrato: '03/07/2024', fec_termino_contrato: '03/01/2025', cant_ot: 11 },
    { id: 1017, rut: '76.667.778 - 9', nombre: 'TECNOLOGÍA Y SISTEMAS ADVANCE', direccion: 'Paseo Huérfanos 1120, Santiago', comuna: 'Santiago', region: 'Metropolitana', telefono: '225678911', correo: 'soporte@techadvance.cl', img: 'imprcl_1017.jpg', fec_contrato: '10/08/2024', fec_termino_contrato: '10/02/2025', cant_ot: 5 },
    { id: 1018, rut: '76.778.889 - 1', nombre: 'AGRICULTURA ORGÁNICA OASIS', direccion: 'Camino Rural 2023, Chillán', comuna: 'Chillán', region: 'Ñuble', telefono: '422345678', correo: 'ventas@agrooasis.cl', img: 'imprcl_1018.jpg', fec_contrato: '25/09/2024', fec_termino_contrato: '25/03/2025', cant_ot: 6 },
    { id: 1019, rut: '76.889.990 - 2', nombre: 'RETAIL TECH S.A.', direccion: 'Mall Plaza 345, Antofagasta', comuna: 'Antofagasta', region: 'Antofagasta', telefono: '552345679', correo: 'info@retailtech.cl', img: 'imprcl_1019.png', fec_contrato: '07/10/2024', fec_termino_contrato: '07/04/2025', cant_ot: 14 },
    { id: 1020, rut: '76.990.001 - 3', nombre: 'MUEBLES Y DECORACIONES EL ROBLE', direccion: 'Avenida del Valle 2345, Osorno', comuna: 'Osorno', region: 'Los Lagos', telefono: '642345678', correo: 'contacto@elroble.cl', img: 'imprcl_1020.jpg', fec_contrato: '15/11/2024', fec_termino_contrato: '15/05/2025', cant_ot: 7 },
    { id: 1021, rut: '77.001.112 - 4', nombre: 'CENTRO EDUCATIVO MODERNO', direccion: 'Eduardo Frei 4321, Temuco', comuna: 'Temuco', region: 'Araucanía', telefono: '452345688', correo: 'admisiones@cemoderno.cl', img: 'imprcl_1021.png', fec_contrato: '22/12/2024', fec_termino_contrato: '22/06/2025', cant_ot: 10 },
    { id: 1022, rut: '77.112.223 - 5', nombre: 'CLÍNICA VETERINARIA PETCARE', direccion: 'San Martín 123, Valdivia', comuna: 'Valdivia', region: 'Los Ríos', telefono: '632345699', correo: 'info@petcare.cl', img: 'imprcl_1022.jpg', fec_contrato: '10/01/2025', fec_termino_contrato: '10/07/2025', cant_ot: 8 },
    { id: 1023, rut: '77.223.334 - 6', nombre: 'BODEGAS Y VIÑEDOS VISTA AL MAR', direccion: 'Ruta del Vino 456, Casablanca', comuna: 'Casablanca', region: 'Valparaíso', telefono: '322345710', correo: 'ventas@vistaalmar.cl', img: 'imprcl_1023.jpg', fec_contrato: '18/02/2025', fec_termino_contrato: '18/08/2025', cant_ot: 9 },
    { id: 1024, rut: '77.334.445 - 7', nombre: 'DEPORTES EXTREMOS AVENTURA', direccion: 'Parque Aventura 789, Pucón', comuna: 'Pucón', region: 'Araucanía', telefono: '452345721', correo: 'contacto@deportesaventura.cl', img: 'imprcl_1024.png', fec_contrato: '25/03/2025', fec_termino_contrato: '25/09/2025', cant_ot: 12 },
    { id: 1025, rut: '77.445.556 - 8', nombre: 'RESTAURANTE SABORES DEL SUR', direccion: 'Costanera 890, Punta Arenas', comuna: 'Punta Arenas', region: 'Magallanes', telefono: '612345732', correo: 'reservas@saboresdelsur.cl', img: 'imprcl_1025.jpg', fec_contrato: '07/04/2025', fec_termino_contrato: '07/10/2025', cant_ot: 6 },
    { id: 1026, rut: '77.556.667 - 9', nombre: 'ESTUDIO DE ARQUITECTURA MODERNA', direccion: 'Edificio Progreso 1001, Coquimbo', comuna: 'Coquimbo', region: 'Coquimbo', telefono: '512345743', correo: 'proyectos@arqmoderna.cl', img: 'imprcl_1026.png', fec_contrato: '15/05/2025', fec_termino_contrato: '15/11/2025', cant_ot: 11 },
    { id: 1027, rut: '77.667.778 - 1', nombre: 'SEGURIDAD INTEGRAL', direccion: 'Centro Empresarial 1120, Rancagua', comuna: 'Rancagua', region: 'O\'Higgins', telefono: '722345754', correo: 'soporte@seguridadintegral.cl', img: 'imprcl_1027.jpg', fec_contrato: '22/06/2025', fec_termino_contrato: '22/12/2025', cant_ot: 5 },
    { id: 1028, rut: '77.778.889 - 2', nombre: 'GASTRONOMÍA INTERNACIONAL LTDA.', direccion: 'Boulevard Gourmet 2023, Chillán', comuna: 'Chillán', region: 'Ñuble', telefono: '422345765', correo: 'contacto@gastronomiaint.cl', img: 'imprcl_1028.jpg', fec_contrato: '29/07/2025', fec_termino_contrato: '29/01/2026', cant_ot: 7 },
    { id: 1029, rut: '77.889.990 - 3', nombre: 'RENOVACIONES Y CONSTRUCCIONES ECO', direccion: 'EcoParque 345, Antofagasta', comuna: 'Antofagasta', region: 'Antofagasta', telefono: '552345776', correo: 'info@renovaconstrueco.cl', img: 'imprcl_1029.png', fec_contrato: '12/08/2025', fec_termino_contrato: '12/02/2026', cant_ot: 14 },
    { id: 1030, rut: '77.990.001 - 4', nombre: 'MODA Y DISEÑO TROPICAL', direccion: 'Avenida Moda 2345, Osorno', comuna: 'Osorno', region: 'Los Lagos', telefono: '642345787', correo: 'ventas@modatropical.cl', img: 'imprcl_1030.jpg', fec_contrato: '20/09/2025', fec_termino_contrato: '20/03/2026', cant_ot: 9 },
    { id: 1031, rut: '78.001.112 - 5', nombre: 'ACADEMIA DE DANZA Y MOVIMIENTO', direccion: 'DanzaActiva 4321, Temuco', comuna: 'Temuco', region: 'Araucanía', telefono: '452345798', correo: 'admisiones@academiadanza.cl', img: 'imprcl_1031.jpg', fec_contrato: '05/10/2025', fec_termino_contrato: '05/04/2026', cant_ot: 10 },
    { id: 1032, rut: '78.112.223 - 6', nombre: 'CENTRO HOLÍSTICO VIDA', direccion: 'Sendero de la Salud 123, Coyhaique', comuna: 'Coyhaique', region: 'Aysén', telefono: '672345809', correo: 'info@centroholisticovida.cl', img: 'imprcl_1032.jpg', fec_contrato: '01/11/2025', fec_termino_contrato: '01/05/2026', cant_ot: 6 },
    { id: 1033, rut: '78.223.334 - 7', nombre: 'FERRETERÍA EL CONSTRUCTOR', direccion: 'Avenida de los Artesanos 456, Valdivia', comuna: 'Valdivia', region: 'Los Ríos', telefono: '632345820', correo: 'ventas@ferreteriaconstructor.cl', img: 'imprcl_1033.png', fec_contrato: '18/12/2025', fec_termino_contrato: '18/06/2026', cant_ot: 12 },
    { id: 1034, rut: '78.334.445 - 8', nombre: 'TECNOLOGÍAS DE INFORMACIÓN GIGATECH', direccion: 'Tech Park 789, Rancagua', comuna: 'Rancagua', region: 'O\'Higgins', telefono: '722345831', correo: 'support@gigatech.cl', img: 'imprcl_1034.jpg', fec_contrato: '10/01/2026', fec_termino_contrato: '10/07/2026', cant_ot: 15 },
    { id: 1035, rut: '78.445.556 - 9', nombre: 'BOUTIQUE DEL PAN', direccion: 'Calle del Sabor 890, Punta Arenas', comuna: 'Punta Arenas', region: 'Magallanes', telefono: '612345842', correo: 'contacto@boutiquedelpan.cl', img: 'imprcl_1035.jpg', fec_contrato: '25/02/2026', fec_termino_contrato: '25/08/2026', cant_ot: 7 },
    { id: 1036, rut: '78.556.667 - 1', nombre: 'CLÍNICA DENTAL SONRISA', direccion: 'Sonrisas Avenida 1001, La Serena', comuna: 'La Serena', region: 'Coquimbo', telefono: '512345853', correo: 'recepcion@clinicasonrisa.cl', img: 'imprcl_1036.png', fec_contrato: '15/03/2026', fec_termino_contrato: '15/09/2026', cant_ot: 9 },
    { id: 1037, rut: '78.667.778 - 2', nombre: 'ACADEMIA DE MÚSICA NOTAS', direccion: 'Melodía 1120, Iquique', comuna: 'Iquique', region: 'Tarapacá', telefono: '572345864', correo: 'info@musicnotas.cl', img: 'imprcl_1037.jpg', fec_contrato: '03/04/2026', fec_termino_contrato: '03/10/2026', cant_ot: 10 },
    { id: 1038, rut: '78.778.889 - 3', nombre: 'EXPORTADORA FRUTOS DEL SUR', direccion: 'Camino al Valle 2023, Chillán', comuna: 'Chillán', region: 'Ñuble', telefono: '422345875', correo: 'export@frutosdelsur.cl', img: 'imprcl_1038.jpg', fec_contrato: '20/05/2026', fec_termino_contrato: '20/11/2026', cant_ot: 8 },
    { id: 1039, rut: '78.889.990 - 4', nombre: 'AGENCIA DE VIAJES EXPLORA', direccion: 'Aventura 345, Arica', comuna: 'Arica', region: 'Arica y Parinacota', telefono: '582345886', correo: 'reservas@viajesexplora.cl', img: 'imprcl_1039.png', fec_contrato: '07/06/2026', fec_termino_contrato: '07/12/2026', cant_ot: 12 },
    { id: 1040, rut: '78.990.001 - 5', nombre: 'JARDINERÍA VERDE VIDA', direccion: 'Naturaleza 2345, Osorno', comuna: 'Osorno', region: 'Los Lagos', telefono: '642345897', correo: 'ventas@verdevida.cl', img: 'imprcl_1040.jpg', fec_contrato: '25/07/2026', fec_termino_contrato: '25/01/2027', cant_ot: 7 },
    { id: 1041, rut: '79.001.112 - 6', nombre: 'CONSULTORA ECO SOSTENIBLE', direccion: 'Eco Avenida 4321, Temuco', comuna: 'Temuco', region: 'Araucanía', telefono: '452345908', correo: 'consultas@ecoconsultora.cl', img: 'imprcl_1041.jpg', fec_contrato: '10/08/2026', fec_termino_contrato: '10/02/2027', cant_ot: 6 },
    { id: 1042, rut: '79.112.223 - 7', nombre: 'TIENDAS DEPORTIVAS RUNFAST', direccion: 'Carrera Rápida 123, Valdivia', comuna: 'Valdivia', region: 'Los Ríos', telefono: '632345919', correo: 'ventas@runfast.cl', img: 'imprcl_1042.png', fec_contrato: '20/09/2026', fec_termino_contrato: '20/03/2027', cant_ot: 14 },
    { id: 1043, rut: '79.223.334 - 8', nombre: 'PRODUCTOS NATURALES HERBOLIFE', direccion: 'Vida Sana 456, Copiapó', comuna: 'Copiapó', region: 'Atacama', telefono: '522345930', correo: 'info@herbolife.cl', img: 'imprcl_1043.jpg', fec_contrato: '05/10/2026', fec_termino_contrato: '05/04/2027', cant_ot: 9 },
    { id: 1044, rut: '79.334.445 - 9', nombre: 'ESTUDIO JURÍDICO LEGALMIND', direccion: 'Justicia 789, La Calera', comuna: 'La Calera', region: 'Valparaíso', telefono: '332345941', correo: 'contacto@legalmind.cl', img: 'imprcl_1044.png', fec_contrato: '25/11/2026', fec_termino_contrato: '25/05/2027', cant_ot: 11 },
    { id: 1045, rut: '79.445.556 - 1', nombre: 'EMPRESA DE TRANSPORTES RÁPIDO', direccion: 'Ruta Rápida 890, Punta Arenas', comuna: 'Punta Arenas', region: 'Magallanes', telefono: '612345952', correo: 'servicio@transporterapido.cl', img: 'imprcl_1045.jpg', fec_contrato: '15/12/2026', fec_termino_contrato: '15/06/2027', cant_ot: 8 },
    { id: 1046, rut: '79.556.667 - 2', nombre: 'CERVECERÍA ARTESANAL BEERHOUSE', direccion: 'Barrio Cervecero 1001, La Serena', comuna: 'La Serena', region: 'Coquimbo', telefono: '512345963', correo: 'info@beerhouse.cl', img: 'imprcl_1046.jpg', fec_contrato: '01/01/2027', fec_termino_contrato: '01/07/2027', cant_ot: 10 }
];


export const TablaClientes = () => {
    const [data, setData] = useState(dataInicial);
    const [filtroCampo, setFiltroCampo] = useState('');
    const [filtroValor, setFiltroValor] = useState('');
    const [cantClientes, setCantClientes] = useState(data.length);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

    useEffect(() => {
        setCantClientes(data.length);
    }, [data.length]);

    const aplicarFiltro = () => {
        if (filtroCampo && filtroValor) {
            setData(dataInicial.filter(cliente =>
                cliente[filtroCampo].toString().toLowerCase().includes(filtroValor.toLowerCase())
            ));
        }
    };

    const deshacerFiltro = () => {
        setData(dataInicial);
        setFiltroValor('');
    };

    const seleccionarCliente = cliente => {
        setClienteSeleccionado(cliente);
    };

    return (
        <div className='clientes-container-1'>

            <h2>Listado de Clientes</h2>

            <div className="clientes-container-1-1">

                <div className='clientes-container-1-1-1'>

                    <div className='filter-container'>

                        <div className='tittle-filter-container'>
                            <p>Filtrar</p>
                        </div>

                        <div className='input-filter-container'>

                            <select value={filtroCampo} onChange={e => setFiltroCampo(e.target.value)}>
                                <option value="">Selecciona un campo</option>
                                <option value="rut">RUT</option>
                                <option value="direccion">Dirección</option>
                                <option value="telefono">Teléfono</option>
                                <option value="correo">Correo Electrónico</option>
                            </select>

                            <input
                                type="text"
                                value={filtroValor}
                                onChange={e => setFiltroValor(e.target.value)}
                                placeholder="Ingresa valor a filtrar"
                            />

                        </div>

                        <div className='button-filter-container'>

                            <button onClick={aplicarFiltro}>Filtrar</button>
                            <button onClick={deshacerFiltro}>Deshacer</button>

                        </div>

                    </div>


                    <div className='action-container'>
                        <button >Exportar a Excel</button>
                        <button >Imprimir</button>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>N° de Cliente</th>
                                <th>RUT</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((cliente) => (
                                <tr key={cliente.id} onClick={() => seleccionarCliente(cliente)} className="table-row">
                                    <td>{cliente.id}</td>
                                    <td>{cliente.rut}</td>
                                    <td>{cliente.nombre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='clientes-container-1-1-2'>

                    {clienteSeleccionado && (

                        <div className='info-cliente'>

                            <div className='info-cliente-2'>

                                <div className='data-cliente'>
                                    <h2>Información del Cliente</h2>
                                    <p><strong>RUT:</strong> {clienteSeleccionado.rut}</p>
                                    <p><strong>Nombre:</strong> {clienteSeleccionado.nombre}</p>
                                    <p><strong>Dirección:</strong> {clienteSeleccionado.direccion}</p>
                                    <p><strong>Comuna:</strong> {clienteSeleccionado.comuna}</p>
                                    <p><strong>Región:</strong> {clienteSeleccionado.region}</p>
                                    <p><strong>Teléfono:</strong> {clienteSeleccionado.telefono}</p>
                                    <p><strong>Correo Electrónico:</strong> {clienteSeleccionado.correo}</p>
                                    <p><strong>Fecha de Contrato:</strong> {clienteSeleccionado.fec_contrato}</p>
                                    <p><strong>Fecha de Término de Contrato:</strong> {clienteSeleccionado.fec_termino_contrato}</p>
                                    <p><strong>Cantidad de OT:</strong> {clienteSeleccionado.cant_ot}</p>
                                </div>

                                <div className='buttons-data-cliente'>
                                    <button>Imprimir</button>
                                    <button>Editar</button>
                                </div>

                            </div>

                            <div className='info-cliente-1'>
                                <h2>Cliente # {clienteSeleccionado.id}</h2>
                                <img src={`./img/${clienteSeleccionado.img}`} alt="Descripción" />
                            </div>

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};