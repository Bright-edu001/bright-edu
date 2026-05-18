import React from "react";
import { Link } from "react-router-dom";

function FooterSection({ className, title, links }) {
  return (
    <div className={`footer-section ${className}`}>
      <p className="section-title">{title}</p>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} title={link.title}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterSection;
