import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "antd";

/**
 * 權限控制組件
 * 根據用戶權限控制子組件的顯示
 */
const PermissionGuard = ({
  permission,
  permissions,
  fallback = null,
  showNoPermissionMessage = false,
  children,
}) => {
  const { checkPermission, checkAnyPermission, userRole } = useAuth();

  // 檢查單一權限
  if (permission && !checkPermission(permission)) {
    if (showNoPermissionMessage) {
      return (
        <Alert
          message="權限不足"
          description={`您需要「${permission}」權限才能檢視此內容`}
          type="warning"
          showIcon
        />
      );
    }
    return fallback;
  }

  // 檢查多個權限（滿足任一即可）
  if (permissions && !checkAnyPermission(permissions)) {
    if (showNoPermissionMessage) {
      return (
        <Alert
          message="權限不足"
          description="您需要相應權限才能檢視此內容"
          type="warning"
          showIcon
        />
      );
    }
    return fallback;
  }

  // 如果沒有設定權限要求，則檢查是否已登入
  if (!permission && !permissions && !userRole) {
    if (showNoPermissionMessage) {
      return (
        <Alert
          message="需要登入"
          description="請先登入後再檢視此內容"
          type="info"
          showIcon
        />
      );
    }
    return fallback;
  }

  return children;
};

export default PermissionGuard;
