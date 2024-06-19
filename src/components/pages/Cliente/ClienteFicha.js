import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ClienteFicha.css';
import { getComunasByRegion, getRegiones } from '../../../services/RegionComunaService';
import { getTiposClientes, updateCliente ,subirImgenCliente} from '../../../services/clienteService';

export const ClienteFicha = () => {

    const location = useLocation();
    const { cliente } = location.state || {};
    const [selectedImage, setSelectedImage] = useState(cliente.imagen_cliente || '../../img/no_photo_arsheep.png');
    const [fileImage, setFileImage] = useState();
    const [rut, setRut] = useState(cliente.numrun_cliente.toLocaleString('es-CL')+"-"+cliente.dvrun_cliente);
    const [dvrun, setDvrun] = useState(cliente.dvrun_cliente);
    const [nombre, setNombre] = useState(cliente.nombre_cliente);
    const [appaterno, setAppaterno] = useState(cliente.appaterno_cliente);
    const [apmaterno, setApmaterno] = useState(cliente.apmaterno_cliente);
    const [email, setEmail] = useState(cliente.email_cliente);
    const [numTelefono, setNumTelefono] = useState(cliente.numtelefono_cliente);
    const [comuna, setComuna] = useState(cliente.COMUNA.id_comuna);
    const [descComuna, setDescComuna] = useState(cliente.COMUNA.desc_comuna);
    const [fechaNacimiento, setFechaNacimiento] = useState(cliente.fecnac_cliente);
    const [tipoCliente, setTipoCliente] = useState(cliente.id_tipo_cliente);
    const [imagen, setImagen] = useState(cliente.imagen_cliente);
    const [fechaInicioContrato, setFechaInicioContrato] = useState(cliente.fec_inicio_contrato_cliente);
    const [fechaTerminoContrato, setFechaTerminoContrato] = useState(cliente.fec_termino_contrato_cliente);
    const [fechaCreacion, setFechaCreacion] = useState(cliente.fec_creacion_cliente);
    const [region, setRegion] = useState(cliente.COMUNA.id_region);
    const [direccion, setDireccion] = useState(cliente.direccion_cliente);


    const [regionesList, setRegionesList] = useState([]);
    const [comunasList, setComunasList] = useState([]);
    const [tiposClienteList, setTiposClienteList] = useState([]);


    const formatRUT = (input) => {
        // Eliminar todos los caracteres que no sean números o la letra K (o k)
        let value = input.replace(/[^0-9kK]/g, '');

        // Convertir la letra K a mayúscula
        value = value.toUpperCase();

        // Asegurarse de que la 'K' solo pueda ser el dígito verificador al final
        if (value.includes('K') && value.indexOf('K') !== value.length - 1) {
            value = value.replace(/K/g, '');
        }

        // Limitar el valor a máximo 8 caracteres numéricos más 1 dígito verificador
        if (value.length > 9) {
            value = value.slice(0, 8) + value.slice(8, 9);
        }

        // Insertar el guion antes del dígito verificador
        if (value.length > 1) {
            value = value.slice(0, -1) + '-' + value.slice(-1);
        }

        // Insertar los puntos en las posiciones correctas
        if (value.length > 5) {
            value = value.slice(0, -5) + '.' + value.slice(-5);
        }
        if (value.length > 9) {
            value = value.slice(0, -9) + '.' + value.slice(-9);
        }

        // Limitar el valor total a 12 caracteres (8 números + 2 puntos + 1 guion + 1 dígito verificador)
        if (value.length > 12) {
            value = value.slice(0, 12);
        }

        setRut(value);
    };

    useEffect(() => {

        const fetchRegiones = async () => {
            try {
                const regiones = await getRegiones();
                setRegionesList(regiones);
            } catch (error) {
                console.error('Error al obtener las regiones:', error);
            }
        };

        fetchRegiones();

        
        const fetchComunas = async () => {
            try {
                const comunas = await getComunasByRegion(region);
                setComunasList(comunas);
            } catch (error) {
                console.error('Error al obtener las comunas:', error);
            }
        };

        fetchComunas();

        const fetchTiposCliente = async () => {
            try {
                const tiposCliente = await getTiposClientes();
                setTiposClienteList(tiposCliente);
            } catch (error) {
                console.error('Error al obtener las tipos cliente:', error);
            }
        };

        fetchTiposCliente();
        console.log(tipoCliente)

    }, [region]);





    const formatInputText = (input, maxLength) => {
        // Convertir todo a mayúsculas
        let formattedName = input.toUpperCase();
        // Remover todas las letras minúsculas
        formattedName = formattedName.replace(/[a-z]/g, '');
        // Limitar la longitud del texto
        formattedName = formattedName.slice(0, maxLength);
        return formattedName;
    };



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
                numtelefono_cliente: numTelefono,
                id_comuna: comuna,
                fecnac_cliente: fechaNacimiento,
                id_tipo_cliente: tipoCliente,
                imagen_cliente: imagen,
                fec_inicio_contrato_cliente: fechaInicioContrato,
                fec_termino_contrato_cliente: fechaTerminoContrato,
                fec_creacion_cliente: fechaCreacion,
                id_region: region,
                direccion_cliente: direccion
            };
            clienteData = await updateCliente(formattedNumrun, clienteData);
            alert("Datos del cliente actualizados con éxito")
            console.log(clienteData);

        } catch (error) {
            alert("No se pudieron actualizar los datos del cliente")
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validImageTypes.includes(file.type)) {
                alert("Solo se permiten archivos de imagen (jpeg, png, gif).");
                return;
            }
    
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setFileImage(file); // Actualiza el estado fileImage
                handleImageUpload(file); // Sube la imagen directamente después de actualizar el estado
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleImageUpload = async (file) => {
        if (!file) return;
    
        const formData = new FormData();
        formData.append('image', file);
        formData.append('id_cliente', cliente.numrun_cliente);
        formData.append('imagen_antigua', cliente.imagen_cliente);
    
        try {
            const response = await subirImgenCliente(formData);
            if (response && response.newImageUrl) {
                setImagen(response.newImageUrl); // Actualiza el estado de la URL de la imagen si es necesario
                console.log('Imagen subida con éxito:', response.newImageUrl);
            } else {
                console.error('La respuesta del servidor no contiene la URL de la imagen');
            }
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    };

    return (
        <div className='principal-container'>
            <div className='secondary-container'>
                <div className='container-header'>
                    <h1>Ficha del Cliente</h1>
                </div>
                <div className='form-container'>

                    {cliente ? (
                        <form onSubmit={handleSubmit}>
                            <div className='card-image'>
                                <img
                                    src={selectedImage}
                                    alt={`Imagen de ${cliente.nombre_usuario}`}
                                    onClick={() => document.getElementById('imageUpload').click()}
                                />
                                <input
                                    type="file"
                                    id="imageUpload"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className='form-level'>
                                <div className='form-group'>
                                    <label htmlFor="rut" className="label-rut">RUT</label>
                                    <input
                                        id="rut"
                                        className="input-rut"
                                        type="text"
                                        value={rut}
                                        onChange={(e) => formatRUT(e.target.value)}
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
                    ) : (
                        <p>No se ha seleccionado ningún cliente.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

