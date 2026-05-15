import React from "react";
import { Link } from "react-router-dom";
import { getMenuItemText, getMenuItemTo } from "./headerMenuHelpers";

function MobileMenuItem({ item, expandedKeys, onToggle, onClose }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  if (hasChildren) {
    const text = getMenuItemText(item.label);
    const isExpanded = expandedKeys.has(item.key);
    const submenuId = `mobile-submenu-${item.key}`;

    return (
      <li className="mobile-menu__item" role="none">
        <button
          className={`mobile-menu__trigger${isExpanded ? " mobile-menu__trigger--expanded" : ""}`}
          aria-expanded={isExpanded}
          aria-controls={submenuId}
          onClick={() => onToggle(item.key)}
          role="menuitem"
          type="button"
        >
          <span>{text}</span>
          <span className="mobile-menu__chevron" aria-hidden="true" />
        </button>
        {isExpanded && (
          <ul id={submenuId} className="mobile-menu__submenu" role="menu">
            {item.children.map((child) => (
              <MobileMenuItem
                key={child.key}
                item={child}
                expandedKeys={expandedKeys}
                onToggle={onToggle}
                onClose={onClose}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  const to = getMenuItemTo(item.label);
  const text = getMenuItemText(item.label);

  if (to) {
    return (
      <li className="mobile-menu__item" role="none">
        <Link className="mobile-menu__link" to={to} onClick={onClose} role="menuitem">
          {text}
        </Link>
      </li>
    );
  }

  return (
    <li className="mobile-menu__item" role="none">
      <span className="mobile-menu__link" role="menuitem">
        {text}
      </span>
    </li>
  );
}

export default MobileMenuItem;
