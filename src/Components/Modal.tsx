import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div style={{position: 'fixed', top: '50px', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', backgroundColor: 'purple', padding: '20px'}}>{children}</div>,
    document.body
  )
}

export default Modal;