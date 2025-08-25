import React, { useState, useEffect, useMemo } from "react";
import { Menu, Drawer, ConfigProvider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { menuItems } from "../../config/menuConfig";
import "./Header.scss";
import getImageUrl from "../../utils/getImageUrl";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(
    window.innerWidth <= 500 ? "100%" : 500
  );
  const [animationDuration, setAnimationDuration] = useState("0.2s");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(window.innerWidth <= 500 ? "100%" : 500);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 監聽滑鼠事件來控制動畫時間
  useEffect(() => {
    const handleMouseEnter = (e) => {
      // 檢查是否是選單項目的 mouseenter
      if (e.target.closest(".ant-menu-submenu")) {
        setAnimationDuration("0.2s"); // 展開時間
      }
    };

    const handleMouseLeave = (e) => {
      // 檢查是否是選單項目的 mouseleave
      if (e.target.closest(".ant-menu-submenu")) {
        setAnimationDuration("0.7s"); // 關閉時間
      }
    };

    // 添加事件監聽器到 header-nav
    const headerNav = document.querySelector(".header-nav");
    if (headerNav) {
      headerNav.addEventListener("mouseenter", handleMouseEnter, true);
      headerNav.addEventListener("mouseleave", handleMouseLeave, true);
    }

    return () => {
      if (headerNav) {
        headerNav.removeEventListener("mouseenter", handleMouseEnter, true);
        headerNav.removeEventListener("mouseleave", handleMouseLeave, true);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenu((prev) => !prev);
  };

  const handleMenuClick = ({ key }) => {
    // 同原本邏輯：透過 key 找到 path，navigate 並關閉 drawer
    const findItem = (items, key) => {
      for (const item of items) {
        if (item.key === key) return item;
        if (item.children) {
          const found = findItem(item.children, key);
          if (found) return found;
        }
      }
      return null;
    };
    const clicked = findItem(menuItems, key);
    if (clicked?.path) {
      navigate(clicked.path);
      setMobileMenu(false);
    }
  };

  // --- 新增：在 Drawer 裡的 Menu，所有 <Link> 點擊都自動關閉 drawer ---
  const mobileMenuItems = useMemo(() => {
    const wrapClose = (items) =>
      items.map((item) => {
        const newItem = { ...item };
        // 如果 label 是 React Element 而且 type === Link，就 clone 注入 onClick
        if (React.isValidElement(item.label) && item.label.type === Link) {
          newItem.label = React.cloneElement(item.label, {
            onClick: () => setMobileMenu(false),
          });
        }
        if (item.children) {
          newItem.children = wrapClose(item.children);
        }
        return newItem;
      });
    return wrapClose(menuItems);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          motionDurationMid: animationDuration, // 動態控制展開(0.2s)和關閉(0.5s)時間
        },
      }}
    >
      <header className="header" role="banner">
        <div className="header-center-wrapper">
          <div className="container">
            <div className="logo">
              <Link to="/" title="Bright Education 首頁">
                <img
                  src={getImageUrl("/images/header/logo.webp")}
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
                items={mobileMenuItems}
                onClick={handleMenuClick}
              />
            </Drawer>
          </div>
        </div>
      </header>
    </ConfigProvider>
  );
};

export default Header;
