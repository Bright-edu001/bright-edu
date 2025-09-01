import React from "react";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  // 檢查是否已登入
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  // 生產環境時，檢查是否為允許的email域名
  const isProduction =
    process.env.NODE_ENV === "production" ||
    window.location.hostname !== "localhost";

  if (isProduction && user && !user.email?.endsWith("@bright-edu.com")) {
    // 如果不是允許的email域名，登出並跳轉到登入頁面
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
