import React from "react";

import { IoCloseOutline } from "react-icons/io5";

import "../../css/Modal.css";

function Modal({ show, header, children }) {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        {header}
        <span className="close">
          {children}
        </span>
      </div>
    </div>
  );
}

export default Modal;
