import React from "react";
import { Link } from "react-router-dom";
import { getMenuItemText, getMenuItemTo } from "./headerMenuHelpers";

function MobileMenuItem({ item, expandedKeys, onToggle, onClose }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const to = getMenuItemTo(item.label);
  const text = getMenuItemText(item.label);

  if (hasChildren) {
    const isExpanded = expandedKeys.has(item.key);
    const submenuId = `mobile-submenu-${item.key}`;

    if (to) {
      // Item has both a route and children: split into parent link + expand toggle
      return (
        <li className="mobile-menu__item" role="none">
          <div className="mobile-menu__parent-row">
            <Link
              className="mobile-menu__link"
              to={to}
              onClick={onClose}
              role="menuitem"
            >
              {text}
            </Link>
            <button
              className="mobile-menu__expand-btn"
              aria-expanded={isExpanded}
              aria-controls={submenuId}
              onClick={() => onToggle(item.key)}
              type="button"
              aria-label={`展開 ${text} 子選單`}
            >
              <span className="mobile-menu__chevron" aria-hidden="true" />
            </button>
          </div>
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

    // Item has children but no route: standard trigger button
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
