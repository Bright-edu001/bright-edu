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
  const menuLeaveTimersRef = useRef({}); // 新增：用於存儲選單離開的計時器

  // 定義完整的選單層級結構
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

  // 輔助函數：獲取所有後代選單（子選單、孫選單等）
  const getAllDescendants = useCallback((parentKey, hierarchy) => {
    let descendants = new Set();
    const children = hierarchy[parentKey] || [];
    children.forEach(child => {
      descendants.add(child);
      const grandchildren = getAllDescendants(child, hierarchy); // 遞歸調用自身
      grandchildren.forEach(gc => descendants.add(gc));
    });
    return descendants;
  }, []); // 移除了 fullMenuHierarchy，因為它在 useMemo 中且依賴為 []，不會改變

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
  const toggleDropdown = useCallback(
    (menuKey, closeOthers = [], childMenus = []) =>
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setDropdownStates((prevStates) => {
        const newDropdownStates = { ...prevStates };
        const menuKeyIsCurrentlyOpen = prevStates[menuKey];

        // 切換主要選單的狀態
        newDropdownStates[menuKey] = !menuKeyIsCurrentlyOpen;

        // 判斷哪些父選單正在被關閉（menuKey 本身或 closeOthers 中的選單）
        // 它們的子選單也需要被關閉。
        const parentMenusBeingClosed = new Set();

        closeOthers.forEach(otherKey => {
          // 如果它之前是開啟的，或者在此邏輯之前仍標記為開啟
          if (newDropdownStates[otherKey] === true || prevStates[otherKey] === true) { 
            parentMenusBeingClosed.add(otherKey);
          }
        });

        // 如果主要選單 (menuKey) 原本是開啟的，現在要被關閉
        if (menuKeyIsCurrentlyOpen && !newDropdownStates[menuKey]) {
          parentMenusBeingClosed.add(menuKey);
        }
        
        const finalKeysToSetFalse = new Set();
        parentMenusBeingClosed.forEach(parentToClose => {
          finalKeysToSetFalse.add(parentToClose); // 將父選單本身加入待關閉列表
          const descendants = getAllDescendants(parentToClose, fullMenuHierarchy);
          descendants.forEach(descendant => finalKeysToSetFalse.add(descendant));
        });

        finalKeysToSetFalse.forEach(keyToClose => {
          // 如果 keyToClose 是我們剛決定要開啟的 menuKey，則不要將其設為 false。
          if (keyToClose === menuKey && newDropdownStates[menuKey] === true) {
            // 不執行任何操作，保持開啟狀態
          } else {
            newDropdownStates[keyToClose] = false;
          }
        });
        
        // 如果 menuKey 正在被開啟，確保其直接子選單（來自 childMenus 參數）被關閉（重置）。
        if (newDropdownStates[menuKey]) { // 如果 menuKey 現在是開啟狀態
          (childMenus || []).forEach(directChildKey => {
            newDropdownStates[directChildKey] = false;
          });
        }
        return newDropdownStates;
      });
    },
    [getAllDescendants, fullMenuHierarchy] // 新增：useCallback 及依賴項
  );

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
  const toggleMSSubDropdown = toggleDropdown("MSSub", ["UICSub", "MBASub"]); // 假設 MSSub 根據原始結構沒有子選單
  const toggleMSUMainSubDropdown = toggleDropdown("msuMainSub", [
    "msfProgramsSub",
  ], ["eastLansingSub"]); // 已修正：將 ["eastLansingSub"] 作為子選單加入
  const toggleMSFProgramsSubDropdown = toggleDropdown("msfProgramsSub", [
    "msuMainSub",
  ]); // 假設 msfProgramsSub 沒有子選單
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
    (menuKey, closeKey = null) => // 移除內部回呼函數的 () =>
      () => { // 保留外部的 () => 以便在 JSX 中使用
        if (window.innerWidth >= 1025) {
          // 清除可能存在的關閉計時器
          if (menuLeaveTimersRef.current[menuKey]) {
            clearTimeout(menuLeaveTimersRef.current[menuKey]);
            menuLeaveTimersRef.current[menuKey] = null;
          }

          setDropdownStates((prev) => {
            const newState = {
              ...prev,
              [menuKey]: true,
            };
            if (closeKey && prev[closeKey]) { // 如果 closeKey 存在且之前是打開的
              newState[closeKey] = false;
              // 遞歸關閉 closeKey 的子孫選單
              const descendantsToClose = getAllDescendants(closeKey, fullMenuHierarchy);
              descendantsToClose.forEach(desc => {
                newState[desc] = false;
                // 如果子孫選單也有計時器，一併清除
                if (menuLeaveTimersRef.current[desc]) {
                  clearTimeout(menuLeaveTimersRef.current[desc]);
                  menuLeaveTimersRef.current[desc] = null;
                }
              });
            }
            return newState;
          });
          setPendingLink(null);
        }
      },
    [getAllDescendants, fullMenuHierarchy] // 更新：將 fullMenuHierarchy 加回依賴項
  );

  const handleMouseLeave = useCallback(
    (menuKey) => 
      () => { 
        if (window.innerWidth >= 1025) {
          // 清除已有的計時器，以防重複設置
          if (menuLeaveTimersRef.current[menuKey]) {
            clearTimeout(menuLeaveTimersRef.current[menuKey]);
          }
          menuLeaveTimersRef.current[menuKey] = setTimeout(() => {
            // 在關閉時，也遞歸關閉其所有子選單
            setDropdownStates((prev) => {
              const newState = { ...prev, [menuKey]: false };
              const descendantsToClose = getAllDescendants(menuKey, fullMenuHierarchy);
              descendantsToClose.forEach(desc => {
                newState[desc] = false;
                if (menuLeaveTimersRef.current[desc]) {
                  clearTimeout(menuLeaveTimersRef.current[desc]);
                  menuLeaveTimersRef.current[desc] = null;
                }
              });
              return newState;
            });
            menuLeaveTimersRef.current[menuKey] = null;
          }, 200); // 200ms 延遲
        }
      },
    [getAllDescendants, fullMenuHierarchy] // 更新：將 fullMenuHierarchy 加回依賴項
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
