import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { getMenuItemText, getMenuItemTo } from "./headerMenuHelpers";

function DesktopNavItem({ item, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const isTopLevel = depth === 0;

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && isOpen) {
        e.stopPropagation();
        setIsOpen(false);
      }
    },
    [isOpen],
  );

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
  const to = getMenuItemTo(item.label);

  const liClassName = `${isTopLevel ? "desktop-menu__item" : "desktop-menu__dropdown-item"} desktop-menu__item--has-submenu${isOpen ? " desktop-menu__item--open" : ""}`;
  const submenuClassName = isTopLevel
    ? "desktop-menu__dropdown"
    : "desktop-menu__subdropdown";

  return (
    <li
      className={liClassName}
      onMouseEnter={open}
      onMouseLeave={close}
      onKeyDown={handleKeyDown}
      role="none"
    >
      {to ? (
        <>
          {/* Parent item has both a route and children: render link + toggle */}
          <Link
            className={
              isTopLevel
                ? "desktop-menu__link"
                : "desktop-menu__dropdown-link desktop-menu__dropdown-link--parent"
            }
            to={to}
            role="menuitem"
          >
            {text}
          </Link>
          <button
            className="desktop-menu__toggle"
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={toggle}
            type="button"
            aria-label={`展開 ${text} 子選單`}
          >
            <span className="desktop-menu__chevron" aria-hidden="true" />
          </button>
        </>
      ) : (
        /* Parent item has children but no route: standard trigger button */
        <button
          className={
            isTopLevel ? "desktop-menu__trigger" : "desktop-menu__subtrigger"
          }
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={toggle}
          type="button"
          role="menuitem"
        >
          <span>{text}</span>
          {!isTopLevel && (
            <span className="desktop-menu__chevron" aria-hidden="true" />
          )}
        </button>
      )}
      {isOpen && (
        <ul className={submenuClassName} role="menu">
          {item.children.map((child) => (
            <DesktopNavItem key={child.key} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default DesktopNavItem;
