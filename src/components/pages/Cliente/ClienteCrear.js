import React, { useEffect, useState } from 'react';
import './ClienteFicha.css';
import { getComunasByRegion, getRegiones } from '../../../services/RegionComunaService';
import { getTiposClientes, createCliente, subirImgenCliente } from '../../../services/ClienteService';
import { formatInputText, formatRUT } from '../../../helpers/format';

export const ClienteCrear = () => {

    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [appaterno, setAppaterno] = useState('');
    const [apmaterno, setApmaterno] = useState('');
    const [email, setEmail] = useState('');
    const [numTelefono, setNumTelefono] = useState('');
    const [comuna, setComuna] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [tipoCliente, setTipoCliente] = useState('');
    const [fechaInicioContrato, setFechaInicioContrato] = useState('');
    const [fechaTerminoContrato, setFechaTerminoContrato] = useState('');
    const [region, setRegion] = useState('');
    const [direccion, setDireccion] = useState('');
    const [regionesList, setRegionesList] = useState([]);
    const [comunasList, setComunasList] = useState([]);
    const [tiposClienteList, setTiposClienteList] = useState([]);



    useEffect(() => {
        const fetchRegiones = async () => {
            try {
                const regiones = await getRegiones();
                setRegionesList(regiones);
            } catch (error) {
                console.error('Error al obtener las regiones:', error);
            }
        };

        const fetchComunas = async () => {
            try {
                const comunas = await getComunasByRegion(region);
                setComunasList(comunas);
            } catch (error) {
                console.error('Error al obtener las comunas:', error);
            }
        };

        const fetchTiposCliente = async () => {
            try {
                const tiposCliente = await getTiposClientes();
                setTiposClienteList(tiposCliente);
            } catch (error) {
                console.error('Error al obtener los tipos de cliente:', error);
            }
        };

        fetchRegiones();
        fetchComunas();
        fetchTiposCliente();
    }, [region]);



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const [numrun_cliente, dvrun_cliente] = rut.split('-');
            const formattedNumrun = numrun_cliente.replace(/\./g, '');

            let clienteData = {
                numrun_cliente: formattedNumrun,
                dvrun_cliente: dvrun_cliente,
                nombre_cliente: nombre,
                appaterno_cliente: appaterno,
                apmaterno_cliente: apmaterno,
                email_cliente: email,
                direccion_cliente: direccion,
                id_comuna: comuna,
                numtelefono_cliente: numTelefono,
                fecnac_cliente: fechaNacimiento,
                id_tipo_cliente: tipoCliente,
                id_region: region
            };

            const response = await createCliente(clienteData);
            console.log(clienteData);
            if (response) {
                alert("Datos del cliente creados con éxito");
                console.log(clienteData);
            } else {
                alert("No se pudieron crear los datos del cliente");
            }
        } catch (error) {
            alert("No se pudieron crear los datos del cliente");
            console.error(error);
        }
    };



    return (
        <div className='principal-container'>
            <div className='secondary-container'>
                <div className='container-header'>
                    <h1>Crear Cliente</h1>
                </div>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-level'>
                            <div className='form-group'>
                                <label htmlFor="rut" className="label-rut">RUT</label>
                                <input
                                    id="rut"
                                    className="input-rut"
                                    type="text"
                                    value={rut}
                                    onChange={(e) => setRut(formatRUT(e.target.value))}
                                    required
                                />
                            </div> 
                        </div>
                        <div className='form-level'>
                            <div className='form-group'>
                                <label htmlFor="firstName" className="label-name">NOMBRE</label>
                                <input
                                    id="firstName"
                                    className="input-name"
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(formatInputText(e.target.value, 30))}
                                    required
                                />
                            </div>
                        </div>
                        <div className='form-level'>
                            <div className='form-group'>
                                <label htmlFor="lastName" className="label-name">APELLIDO</label>
                                <input
                                    id="lastName"
                                    className="input-name"
                                    type="text"
                                    value={appaterno}
                                    onChange={(e) => setAppaterno(formatInputText(e.target.value, 30))}
                                    required
                                />
                            </div>
                        </div>
                        <div className='form-level'>
                            <div className='form-group'>
                                <label htmlFor="secondLastName" className="label-name">SEGUNDO APELLIDO</label>
                                <input
                                    id="secondLastName"
                                    className="input-name"
                                    type="text"
                                    value={apmaterno}
                                    onChange={(e) => setApmaterno(formatInputText(e.target.value, 30))}
                                />
                            </div>
                        </div>
                        <div className='form-level'>
                            <div className='form-group'>
                                <label htmlFor="birthDate" className="label-birthDate">FECHA DE NACIMIENTO</label>
                                <input
                                    id="birthDate"
                                    className="input-birthDate"
                                    type="date"
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='form-level'>
                            <div className='form-group'>
                                <label htmlFor="address" className="label-address">DIRECCIÓN</label>
                                <input
                                    id="address"
                                    className="input-address"
                                    type="text"
                                    value={direccion}
                                    onChange={(e) => setDireccion(formatInputText(e.target.value, 60))}
                                    required
                                />
                            </div>
                        </div>
                        <div className='form-level'>
                            <div className='form-group'>
                                <label htmlFor="region" className="label-region">REGIÓN</label>
                                <select
                                    id="region"
                                    className="input-region"
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione una región</option>
                                    {regionesList.map((region) => (
                                        <option key={region.id_region} value={region.id_region}>
                                            {region.desc_region}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='form-level'>
                            <div className='form-group'>
                                <label htmlFor="comuna" className="label-comuna">COMUNA</label>
                                <select
                                    id="comuna"
                                    className="input-comuna"
                                    value={comuna}
                                    onChange={(e) => setComuna(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione una comuna</option>
                                    {comunasList.map((comuna) => (
                                        <option key={comuna.id_comuna} value={comuna.id_comuna}>
                                            {comuna.desc_comuna}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='form-level'>
                            <div className='form-group'>
                                <label htmlFor="email" className="label-email">EMAIL</label>
                                <input
                                    id="email"
                                    className="input-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='form-level'>
                            <div className='form-group'>
                                <label htmlFor="phone" className="label-phone">TELÉFONO</label>
                                <input
                                    id="phone"
                                    className="input-phone"
                                    type="text"
                                    value={numTelefono}
                                    
                                    onChange={(e) => setNumTelefono(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='form-level'>
                            <div className='form-group'>
                                <label htmlFor="startDate" className="label-startDate">INICIO DE CONTRATO</label>
                                <input
                                    id="startDate"
                                    className="input-startDate"
                                    type="date"
                                    value={fechaInicioContrato}
                                    onChange={(e) => setFechaInicioContrato(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='form-level'>
                            <div className='form-group'>
                                <label htmlFor="endDate" className="label-endDate">TÉRMINO DE CONTRATO</label>
                                <input
                                    id="endDate"
                                    className="input-endDate"
                                    type="date"
                                    value={fechaTerminoContrato}
                                    onChange={(e) => setFechaTerminoContrato(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit">Guardar Datos</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
