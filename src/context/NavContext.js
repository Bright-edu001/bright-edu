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

  // Define the full menu hierarchy
  const fullMenuHierarchy = useMemo(() => ({
    UIC: ["UICSub", "MBASub", "MSSub"],
    MSU: ["msuMainSub", "msfProgramsSub"],
    UICSub: ["chicagoSub", "rankingsSub"],
    MBASub: ["areasSub"],
    MSSub: [],
    msuMainSub: ["eastLansingSub"],
    msfProgramsSub: [],
    chicagoSub: [],
    rankingsSub: [],
    areasSub: [],
    eastLansingSub: [],
    mobileMenu: []
  }), []);

  // Helper to get all descendants (children, grandchildren, etc.)
  const getAllDescendants = useCallback((parentKey, hierarchy) => {
    let descendants = new Set();
    const children = hierarchy[parentKey] || [];
    children.forEach(child => {
      descendants.add(child);
      const grandchildren = getAllDescendants(child, hierarchy);
      grandchildren.forEach(gc => descendants.add(gc));
    });
    return descendants;
  }, []);

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
      setDropdownStates((prevStates) => {
        const newDropdownStates = { ...prevStates };
        const menuKeyIsCurrentlyOpen = prevStates[menuKey];

        // Toggle the state of the primary menu
        newDropdownStates[menuKey] = !menuKeyIsCurrentlyOpen;

        // Determine which parent menus are being closed (either menuKey itself or those in closeOthers)
        // Their children will also need to be closed.
        const parentMenusBeingClosed = new Set();

        closeOthers.forEach(otherKey => {
          if (newDropdownStates[otherKey] === true || prevStates[otherKey] === true) { // If it was open or is still marked open before this logic
            parentMenusBeingClosed.add(otherKey);
          }
        });

        // If the primary menu (menuKey) was open and is now being closed
        if (menuKeyIsCurrentlyOpen && !newDropdownStates[menuKey]) {
          parentMenusBeingClosed.add(menuKey);
        }
        
        const finalKeysToSetFalse = new Set();
        parentMenusBeingClosed.forEach(parentToClose => {
          finalKeysToSetFalse.add(parentToClose); // Add the parent itself to be closed
          const descendants = getAllDescendants(parentToClose, fullMenuHierarchy);
          descendants.forEach(descendant => finalKeysToSetFalse.add(descendant));
        });

        finalKeysToSetFalse.forEach(keyToClose => {
          // If keyToClose is the menuKey that we just decided to OPEN, don't set it to false.
          if (keyToClose === menuKey && newDropdownStates[menuKey] === true) {
            // Do nothing, keep it open
          } else {
            newDropdownStates[keyToClose] = false;
          }
        });
        
        // If menuKey is being OPENED, ensure its DIRECT children (from childMenus param) are closed (reset).
        if (newDropdownStates[menuKey]) { // If menuKey is now open
          (childMenus || []).forEach(directChildKey => {
            newDropdownStates[directChildKey] = false;
          });
        }
        return newDropdownStates;
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
  const toggleMSSubDropdown = toggleDropdown("MSSub", ["UICSub", "MBASub"]); // Assuming MSSub has no children based on original structure
  const toggleMSUMainSubDropdown = toggleDropdown("msuMainSub", [
    "msfProgramsSub",
  ], ["eastLansingSub"]); // Corrected: Added ["eastLansingSub"] as childMenu
  const toggleMSFProgramsSubDropdown = toggleDropdown("msfProgramsSub", [
    "msuMainSub",
  ]); // Assuming msfProgramsSub has no children
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
