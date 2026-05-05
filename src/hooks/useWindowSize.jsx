import { useState, useLayoutEffect } from "react";

/**
 * 自定義 hook 用於響應式處理窗口大小變化
 * 支援 SSR 和測試環境的安全初始化
 */
export const useWindowSize = () => {
  // 懶初始化：避免在 SSR 或測試環境中直接存取 window
  const [windowSize, setWindowSize] = useState(() => {
    // 檢查是否在瀏覽器環境
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    // SSR 或測試環境的預設值
    return {
      width: 1024, // 預設桌面寬度
      height: 768, // 預設桌面高度
    };
  });

  useLayoutEffect(() => {
    // 確保在瀏覽器環境中執行
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 監聽窗口大小變化
    window.addEventListener("resize", handleResize);

    // 清理事件監聽器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

/**
 * 計算 Drawer 寬度的 helper function
 */
export const calculateDrawerWidth = (windowWidth) => {
  return windowWidth <= 500 ? "100%" : 500;
};

/**
 * 檢查是否為行動裝置寬度
 */
export const isMobileWidth = (windowWidth) => {
  return windowWidth <= 768;
};
