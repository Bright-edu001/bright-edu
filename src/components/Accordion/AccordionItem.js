import React from "react";
import "./Accordion.scss";

const AccordionItem = ({ id, title, isExpanded, onToggle, children }) => (
  <div className="faq-item">
    <div
      className={`question ${isExpanded ? "expanded" : ""}`}
      onClick={() => onToggle(id)}
    >
      <h3>{title}</h3>
      <span className="toggle-icon">{isExpanded ? "−" : "+"}</span>
    </div>
    <div className={`answer ${isExpanded ? "expanded" : ""}`}>{children}</div>
  </div>
);

export default AccordionItem;
