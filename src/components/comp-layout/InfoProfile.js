import React from "react";
import "../comp-layout/InfoProfile.css";

export const InfoProfile = () => {
  return (
    <div className="info-profile-contain">
      <div className="img-profile" background-image="../img/logo-arsheep.png" alt="Descripción" >
        <img src="../img/prim_tec.png" alt="Descripción" />
      </div>
        <div className="info-profile">
        <p>Nombre del Colaborador</p>
        <p>Cargo del Colaborador</p>
      </div>
      
    </div>
  );
};
