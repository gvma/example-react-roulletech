import React, { useState } from "react";

import '../../css/TextArea.css';

function TextArea({ placeholder, text, handleTextChange, label }) {
  return (
    <div className="textarea-container">
      {label && <label className="textarea-label">{label}</label>}
      <textarea
        className="textarea"
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextArea;
