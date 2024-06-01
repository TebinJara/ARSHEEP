import React from "react";
import "../comp-layout/LayoutHeader.css";

export const LayoutHeader = () => {

  return (
    <header className="header">
      <div className="logo-empresa">
        <img src="../img/logo-empresa.png" alt="Descripción" />
      </div>
      <div className="user-data-container">
        <label>Nombre del usuario aquí</label>
        <div className="user-image">

          {/* Aquí podrías añadir la imagen del usuario si está disponible */}
        </div>
      </div>
    </header>
  );
};
