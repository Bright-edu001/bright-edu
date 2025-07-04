import React, { useState, useEffect } from "react";
import { Menu, Drawer } from "antd";
import { Link } from "react-router-dom";
import { menuItems } from "../../config/menuConfig"; // Import the menu items
import "./Header.scss"; // Import the new SCSS file

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(
    window.innerWidth <= 500 ? "100%" : 500
  );

  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(window.innerWidth <= 500 ? "100%" : 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <header className="header" role="banner">
      <div className="header-center-wrapper">
        <div className="container">
          <div className="logo">
            <Link to="/" title="Bright Education 首頁">
              <img
                src={`${process.env.PUBLIC_URL}/images/header/logo.webp`}
                className="logo-img responsive-img"
                alt="Bright Education Logo"
                width="150"
                height="60"
                loading="lazy"
              />
            </Link>
          </div>

          <div className="header-nav">
            <Menu mode="horizontal" theme="light" items={menuItems} />
          </div>

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

          <Drawer
            placement="right"
            onClose={toggleMobileMenu}
            open={mobileMenu}
            className="mobile-drawer"
            width={drawerWidth}
          >
            <Menu
              mode="inline"
              theme="light"
              items={menuItems}
              onClick={toggleMobileMenu} // Add this line
            />
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
