import React from "react";
import DesktopNavItem from "./DesktopNavItem";

function DesktopNav({ items }) {
  return (
    <nav className="header-nav" aria-label="主要導覽">
      <ul className="desktop-menu" role="menubar">
        {items.map((item) => (
          <DesktopNavItem key={item.key} item={item} depth={0} />
        ))}
      </ul>
    </nav>
  );
}

export default DesktopNav;
