import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop 組件
 * 在路由變更時自動將頁面滾動到頂部
 *
 * 特殊處理：
 * - 如果 URL 包含錨點 (#)，不會滾動到頂部
 * - 如果是同一個頁面的不同參數，不會滾動到頂部
 */
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // 如果 URL 包含錨點，讓瀏覽器自然處理錨點滾動
    if (hash) {
      return;
    }

    // 使用 setTimeout 確保頁面完全渲染後再滾動
    const scrollTimer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // 立即滾動，不使用動畫
      });
    }, 0);

    // 清理 timer
    return () => clearTimeout(scrollTimer);
  }, [pathname, search, hash]);

  return null;
}

export default ScrollToTop;
