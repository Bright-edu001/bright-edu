import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { menuItems } from "../../config/menuConfig";
import DesktopNav from "./DesktopNav";
import MobileNavPanel from "./MobileNavPanel";
import "./Header.scss";
import getImageUrl from "../../utils/getImageUrl";

// ---- Header component ----

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileExpandedKeys, setMobileExpandedKeys] = useState(new Set());
  const closeButtonRef = useRef(null);

  const closeMobileMenu = useCallback(() => {
    setMobileMenu(false);
    setMobileExpandedKeys(new Set());
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenu((prev) => !prev);
  }, []);

  const toggleMobileExpand = useCallback((key) => {
    setMobileExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // Body scroll lock while mobile panel is open
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  // Escape key closes mobile panel
  useEffect(() => {
    if (!mobileMenu) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenu, closeMobileMenu]);

  // Focus close button when mobile panel opens (minimal focus management)
  useEffect(() => {
    if (mobileMenu && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [mobileMenu]);

  return (
    <>
      <header className="header" role="banner">
        <div className="header-center-wrapper">
          <div className="container">
            <div className="logo">
              <Link to="/" title="Bright Education 首頁">
                <img
                  src={getImageUrl("/images/header/logo.webp")}
                  className="logo-img responsive-img"
                  alt="Bright Education Logo"
                  width="300"
                  height="80"
                  fetchPriority="high"
                />
              </Link>
            </div>

            <DesktopNav items={menuItems} />

            <div className="hamburger-menu">
              <div
                className={`mobile-nav-toggle ${mobileMenu ? "active" : ""}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle navigation"
                role="button"
                aria-expanded={mobileMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileNavPanel
        open={mobileMenu}
        items={menuItems}
        expandedKeys={mobileExpandedKeys}
        onToggle={toggleMobileExpand}
        onClose={closeMobileMenu}
        closeButtonRef={closeButtonRef}
      />
    </>
  );
};

export default Header;
