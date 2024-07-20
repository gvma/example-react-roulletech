import React, { useState } from "react";

import "../../css/CommentAccordionItem.css";

function CommentAccordionItem({ name, email, content }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleAccordion() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="comment-accordion-item">
      <div className="comment-accordion-item-header" onClick={toggleAccordion}>
        <h5>{name} ({email})</h5>
      </div>
      <div className="comment-accordion-item-content">
        <span><p>{content}</p></span>
      </div>
    </div>
  );
}

export default CommentAccordionItem;