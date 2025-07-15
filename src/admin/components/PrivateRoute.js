import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // 模擬的認證檢查，實際應用中應替換為真實的認證邏輯
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated ? (
    children ?? <div>元件載入失敗</div>
  ) : (
    <Navigate to="login" />
  );
};

export default PrivateRoute;
