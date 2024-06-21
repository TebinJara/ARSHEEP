import React from 'react';
import PropTypes from 'prop-types';
import'./VisitaTecnicaTile.css';

const VisitaTecnicaTile = ({ visita }) => {
    return (
        <div className='visita-tecnica-tile'>
            <div className='left'>
                <p>AGENDADA: {visita.fec_creacion_vt}</p>
                <h4>VT {visita.id_vt}</h4>
            </div>
            <div className='center'>
                <p>{visita.desc_vt}</p>
            </div>
            <div className='right'>
                <h4>TEC: {visita.id_empleado}</h4>
                <p>{visita.ESTADO_VISITA_TECNICA.desc_estado_vt}: {visita.fec_programacion_vt}</p>
                <p>{visita.ESTABLECIMIENTO.nombre_establecimiento}</p>
            </div>
        </div>
    );
};

VisitaTecnicaTile.propTypes = {
    visita: PropTypes.shape({
        fec_creacion_vt: PropTypes.string.isRequired,
        id_vt: PropTypes.number.isRequired,
        desc_vt: PropTypes.string.isRequired,
        id_empleado: PropTypes.number.isRequired,
        ESTADO_VISITA_TECNICA: PropTypes.shape({
            desc_estado_vt: PropTypes.string.isRequired,
        }).isRequired,
        fec_programacion_vt: PropTypes.string.isRequired,
        ESTABLECIMIENTO: PropTypes.shape({
            nombre_establecimiento: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default VisitaTecnicaTile;