import React from 'react';
import './styles/Modal.css'; 
const Modal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-button" onClick={() => setIsOpen(false)}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
