import React, { useState } from "react";

import { FcPlus } from "react-icons/fc";
import { Tooltip } from "react-tooltip";

import "../../css/OverlayButton.css";

function OverlayButton({ onClick, tooltip }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    // <button className="overlay-button" onClick={onClick}>
      <div 
        className="overlay-button-wrapper"
        onMouseEnter={() => {
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setShowTooltip(false);
        }}
      >
        <FcPlus className="overlay-button-icon" size={48} onClick={onClick}/>
        {showTooltip && (
            <div className="overlay-button-tooltip">
              {tooltip}
            </div>
        )}
      </div>
    // </button>
  );
}

export default OverlayButton;
