import React from 'react';
import './style.css';

const Modal = ({ onClose, children }) => {
    return (
        <div className="ModalBackdrop" onClick={onClose}>
            <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
