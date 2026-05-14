import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useEffectEvent,
} from "react";
import { Menu, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import { menuItems } from "../../config/menuConfig";
import { getMenuItemText, getMenuItemTo } from "./headerMenuHelpers";
import "./Header.scss";
import getImageUrl from "../../utils/getImageUrl";

const desktopSubmenuPopupClassName = "header-submenu-popup";

const addSubmenuPopupClassName = (items) =>
  items.map((item) => {
    if (!item || typeof item !== "object") {
      return item;
    }

    const nextItem = { ...item };

    if (Array.isArray(item.children) && item.children.length > 0) {
      nextItem.popupClassName = [
        item.popupClassName,
        desktopSubmenuPopupClassName,
      ]
        .filter(Boolean)
        .join(" ");
      nextItem.children = addSubmenuPopupClassName(item.children);
    }

    return nextItem;
  });

// ---- Native mobile menu components ----

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

  // Leaf item
  const to = getMenuItemTo(item.label);
  const text = getMenuItemText(item.label);

  if (to) {
    return (
      <li className="mobile-menu__item" role="none">
        <Link
          className="mobile-menu__link"
          to={to}
          onClick={onClose}
          role="menuitem"
        >
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

// ---- Header component ----

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileExpandedKeys, setMobileExpandedKeys] = useState(new Set());
  const [animationDuration, setAnimationDuration] = useState("0.2s");
  const closeButtonRef = useRef(null);
  const desktopMenuItems = useMemo(
    () => addSubmenuPopupClassName(menuItems),
    [],
  );

  const onMenuMouseEnter = useEffectEvent((e) => {
    if (e.target.closest(".ant-menu-submenu")) {
      setAnimationDuration("0.2s");
    }
  });

  const onMenuMouseLeave = useEffectEvent((e) => {
    if (e.target.closest(".ant-menu-submenu")) {
      setAnimationDuration("0.7s");
    }
  });

  // 監聽滑鼠事件來控制動畫時間
  useEffect(() => {
    const headerNav = document.querySelector(".header-nav");
    if (headerNav) {
      headerNav.addEventListener("mouseenter", onMenuMouseEnter, true);
      headerNav.addEventListener("mouseleave", onMenuMouseLeave, true);
    }

    return () => {
      if (headerNav) {
        headerNav.removeEventListener("mouseenter", onMenuMouseEnter, true);
        headerNav.removeEventListener("mouseleave", onMenuMouseLeave, true);
      }
    };
  }, []);

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
                  width="300"
                  height="80"
                  fetchPriority="high"
                />
              </Link>
            </div>

            <div className="header-nav">
              <Menu mode="horizontal" theme="light" items={desktopMenuItems} />
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
          </div>
        </div>
      </header>

      {mobileMenu && (
        <div className="mobile-drawer" role="presentation">
          <button
            className="mobile-drawer__backdrop"
            aria-label="關閉選單"
            onClick={closeMobileMenu}
            tabIndex={-1}
            type="button"
          />
          <aside
            className="mobile-drawer__panel"
            role="dialog"
            aria-modal="true"
            aria-label="手機導覽選單"
          >
            <div className="mobile-drawer__header">
              <button
                ref={closeButtonRef}
                className="mobile-drawer__close"
                aria-label="關閉選單"
                onClick={closeMobileMenu}
                type="button"
              >
                ✕
              </button>
            </div>
            <nav aria-label="手機導覽">
              <ul className="mobile-menu" role="menubar">
                {menuItems.map((item) => (
                  <MobileMenuItem
                    key={item.key}
                    item={item}
                    expandedKeys={mobileExpandedKeys}
                    onToggle={toggleMobileExpand}
                    onClose={closeMobileMenu}
                  />
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </ConfigProvider>
  );
};

export default Header;
