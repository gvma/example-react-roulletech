import React, { useState } from "react";

import '../../css/Input.css';

function Input({ id, label, type, value, onChange, placeholder, className }) {
  return (
    <div className={`input-container ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
}

export default Input;
