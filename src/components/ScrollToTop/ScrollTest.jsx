/**
 * 測試 ScrollToTop 功能
 * 這個組件可以用來驗證路由切換時的滾動行為
 */
import React, { useEffect, useEffectEvent } from "react";
import { useLocation } from "react-router-dom";

const ScrollTest = () => {
  const location = useLocation();
  const onScroll = useEffectEvent(() => {
    console.log("📏 滾動位置:", window.scrollY);
  });

  useEffect(() => {
    // 在開發環境下顯示滾動位置信息
    if (process.env.NODE_ENV === "development") {
      console.log("🔄 路由變更:", location.pathname);
      console.log("📍 當前滾動位置:", window.scrollY);

      // 監聽滾動事件
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [location]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>ScrollToTop 功能測試</h2>
      <p>當前路由: {location.pathname}</p>
      <p>當前滾動位置: {window.scrollY}px</p>

      <div
        style={{
          height: "2000px",
          background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)",
        }}
      >
        <p style={{ padding: "2rem" }}>
          這是一個長頁面，用於測試滾動功能。
          <br />
          請滾動到頁面底部，然後點擊導航鏈接測試 ScrollToTop 是否正常工作。
        </p>

        <div style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>
          <p>頁面底部 - 請從這裡點擊其他頁面鏈接測試滾動功能</p>
        </div>
      </div>
    </div>
  );
};

export default ScrollTest;
