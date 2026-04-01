import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { buildChineseUrl } from "../../config/urlMapping";

/**
 * URL重定向組件
 * 將英文URL重定向到對應的中文URL
 */
const UrlRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    // 記錄重定向日誌
    console.log(
      `重定向: ${location.pathname} -> ${buildChineseUrl(
        location.pathname.slice(1)
      )}`
    );
  }, [location.pathname]);

  // 移除開頭的 / 並轉換為中文URL
  const chineseUrl = buildChineseUrl(location.pathname.slice(1));

  return <Navigate to={chineseUrl} replace />;
};

export default UrlRedirect;
