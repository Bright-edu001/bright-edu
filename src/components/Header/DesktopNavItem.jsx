import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getMenuItemText, getMenuItemTo } from "./headerMenuHelpers";

function DesktopNavItem({ item, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const isTopLevel = depth === 0;

  if (!hasChildren) {
    const to = getMenuItemTo(item.label);
    const text = getMenuItemText(item.label);
    if (!to) return null;
    return (
      <li
        className={
          isTopLevel ? "desktop-menu__item" : "desktop-menu__dropdown-item"
        }
        role="none"
      >
        <Link
          className={
            isTopLevel ? "desktop-menu__link" : "desktop-menu__dropdown-link"
          }
          to={to}
          role="menuitem"
        >
          {text}
        </Link>
      </li>
    );
  }

  const text = getMenuItemText(item.label);

  return (
    <li
      className={`${isTopLevel ? "desktop-menu__item" : "desktop-menu__dropdown-item"} desktop-menu__item--has-submenu${isOpen ? " desktop-menu__item--open" : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      role="none"
    >
      <button
        className={
          isTopLevel ? "desktop-menu__trigger" : "desktop-menu__subtrigger"
        }
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        role="menuitem"
      >
        <span>{text}</span>
        {!isTopLevel && (
          <span className="desktop-menu__chevron" aria-hidden="true" />
        )}
      </button>
      {isOpen && (
        <ul
          className={
            isTopLevel ? "desktop-menu__dropdown" : "desktop-menu__subdropdown"
          }
          role="menu"
        >
          {item.children.map((child) => (
            <DesktopNavItem key={child.key} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default DesktopNavItem;
