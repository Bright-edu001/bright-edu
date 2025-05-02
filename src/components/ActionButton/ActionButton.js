import React from "react";
import "./ActionButton.scss";

const ActionButton = ({ text, link, className, ...props }) => {
  return (
    <a href={link} className={`action-btn ${className || ""}`} {...props}>
      {text}
    </a>
  );
};

export default ActionButton;
