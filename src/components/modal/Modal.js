import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-content">
          {children}
        </div>
        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
