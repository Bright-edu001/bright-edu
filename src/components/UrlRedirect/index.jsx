import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { buildChineseUrl } from "../../config/urlMapping";
import { getExactRedirectTarget } from "../../config/legacyRedirectMap";

/**
 * URL重定向組件
 * 將英文URL重定向到對應的中文URL
 * 優先使用 exact mapping；若未收錄則 fallback 到 segment-based buildChineseUrl。
 */
const UrlRedirect = () => {
  const location = useLocation();

  const chineseUrl =
    getExactRedirectTarget(location.pathname) ??
    buildChineseUrl(location.pathname.slice(1));

  useEffect(() => {
    // 記錄重定向日誌
    console.log(`重定向: ${location.pathname} -> ${chineseUrl}`);
  }, [location.pathname, chineseUrl]);

  return <Navigate to={chineseUrl} replace />;
};

export default UrlRedirect;
