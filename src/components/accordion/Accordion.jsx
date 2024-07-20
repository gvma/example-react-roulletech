import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import "../../css/Accordion.css";

function Accordion({ title, children, isOpen, toggleAccordion }) {
  return (
    <div className="accordion">
      <div className="accordion-toggle" onClick={toggleAccordion}>
        <h4>{ title }</h4>
        <FiChevronDown/>
      </div>
      {
        isOpen && children
      }
    </div>
  );
}

export default Accordion;