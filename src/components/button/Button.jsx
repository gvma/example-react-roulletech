import React from "react";

function Button({ onClick, children, type = "button", className = "" }) {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick} >
      { children }
    </button>
  );
}

export default Button;
