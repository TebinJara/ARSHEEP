import React from "react";
import { useNavigate } from 'react-router-dom';
import "../comp-layout/LayoutHeader.css";

export const LayoutHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Elimina el estado de autenticación del almacenamiento local
    navigate('/'); // Redirige al usuario a la página de login
  };

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
        <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
      </div>
    </header>
  );
};
