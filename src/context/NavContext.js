import React, { createContext, useState, useEffect, useRef, useMemo, useCallback } from "react";

// 建立 NavContext，用於全站導航下拉選單狀態管理
export const NavContext = createContext();

// 全域初始下拉選單狀態，不會於渲染中改變
const initialStates = {
  UIC: false,
  MSU: false,
  UICSub: false,
  MBASub: false,
  MSSub: false,
  chicagoSub: false,
  rankingsSub: false,
  mobileMenu: false,
  areasSub: false,
  msuMainSub: false,
  msfProgramsSub: false,
  eastLansingSub: false,
};

export const NavProvider = ({ children }) => {
  const [dropdownStates, setDropdownStates] = useState(initialStates);
  const [pendingLink, setPendingLink] = useState(null);
  const headerRef = useRef(null);

  // 點擊選單外關閉所有下拉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setDropdownStates(initialStates);
        setPendingLink(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 通用切換函數
  const toggleDropdown =
    (menuKey, closeOthers = [], childMenus = []) =>
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setDropdownStates((prev) => {
        const next = { ...prev };
        closeOthers.forEach((key) => (next[key] = false));
        next[menuKey] = !prev[menuKey];
        if (prev[menuKey] && childMenus.length) {
          childMenus.forEach((key) => (next[key] = false));
        }
        return next;
      });
    };

  // 定義各選單 toggle
  const toggleUICDropdown = toggleDropdown(
    "UIC",
    ["MSU"],
    ["UICSub", "MBASub", "MSSub", "chicagoSub", "rankingsSub", "areasSub"]
  );
  const toggleMSUDropdown = toggleDropdown(
    "MSU",
    ["UIC"],
    ["msuMainSub", "msfProgramsSub"]
  );
  const toggleUICSubDropdown = toggleDropdown(
    "UICSub",
    ["MBASub", "MSSub"],
    ["chicagoSub", "rankingsSub"]
  );
  const toggleMBASubDropdown = toggleDropdown(
    "MBASub",
    ["UICSub", "MSSub"],
    ["areasSub"]
  );
  const toggleMSSubDropdown = toggleDropdown("MSSub", ["UICSub", "MBASub"]);
  const toggleMSUMainSubDropdown = toggleDropdown("msuMainSub", [
    "msfProgramsSub",
  ]);
  const toggleMSFProgramsSubDropdown = toggleDropdown("msfProgramsSub", [
    "msuMainSub",
  ]);
  const toggleMobileMenu = toggleDropdown("mobileMenu");

  // 處理含子選單連結點擊行為
  const handleDropdownLinkClick = useCallback(
    (menuKey, href, closeKey = null) => (e) => {
      const mobileCheck = window.innerWidth < 1025;
      if (mobileCheck) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdownStates[menuKey];
        const isPending = pendingLink === menuKey;
        if (!isOpen) {
          setDropdownStates((prev) => ({
            ...prev,
            [menuKey]: true,
            ...(closeKey ? { [closeKey]: false } : {}),
          }));
          setPendingLink(menuKey);
        } else if (isPending) {
          setPendingLink(null);
          window.location.href = href;
        } else {
          setPendingLink(menuKey);
        }
      }
    },
    [dropdownStates, pendingLink]
  );

  // 滑鼠懸停展開與離開（桌機）
  const handleMouseEnter = useCallback(
    (menuKey, closeKey) => () => {
      if (window.innerWidth >= 1025) {
        setDropdownStates((prev) => ({
          ...prev,
          [menuKey]: true,
          ...(closeKey ? { [closeKey]: false } : {}),
        }));
        setPendingLink(null);
      }
    },
    []
  );
  const handleMouseLeave = useCallback(
    (menuKey) => () => {
      if (window.innerWidth >= 1025) {
        setDropdownStates((prev) => ({ ...prev, [menuKey]: false }));
        setPendingLink(null);
      }
    },
    []
  );

  // 使用 useMemo 穩定 context value
  const contextValue = useMemo(
    () => ({
      dropdownStates,
      toggleUICDropdown,
      toggleMSUDropdown,
      toggleUICSubDropdown,
      toggleMBASubDropdown,
      toggleMSSubDropdown,
      toggleMSUMainSubDropdown,
      toggleMSFProgramsSubDropdown,
      toggleMobileMenu,
      handleDropdownLinkClick,
      handleMouseEnter,
      handleMouseLeave,
      headerRef,
    }),
    [
      dropdownStates,
      toggleUICDropdown,
      toggleMSUDropdown,
      toggleUICSubDropdown,
      toggleMBASubDropdown,
      toggleMSSubDropdown,
      toggleMSUMainSubDropdown,
      toggleMSFProgramsSubDropdown,
      toggleMobileMenu,
      handleDropdownLinkClick,
      handleMouseEnter,
      handleMouseLeave,
      headerRef,
    ]
  );
  return (
    <NavContext.Provider value={contextValue}>
      {children}
    </NavContext.Provider>
  );
};
