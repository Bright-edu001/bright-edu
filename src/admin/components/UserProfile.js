import React from "react";
import { Tag, Avatar, Space, Typography, Tooltip } from "antd";
import {
  UserOutlined,
  CrownOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { USER_ROLES, ROLE_DISPLAY_NAMES } from "../../config/permissions";

const { Text } = Typography;

const UserProfile = ({ showPermissions = false, size = "default" }) => {
  const { user, userRole, userPermissions } = useAuth();

  if (!user) return null;

  // 角色圖示對應
  const getRoleIcon = (role) => {
    switch (role) {
      case USER_ROLES.SUPER_ADMIN:
        return <CrownOutlined style={{ color: "#ff4d4f" }} />;
      case USER_ROLES.ADMIN:
        return <UserOutlined style={{ color: "#1890ff" }} />;
      case USER_ROLES.EDITOR:
        return <EditOutlined style={{ color: "#52c41a" }} />;
      case USER_ROLES.VIEWER:
        return <EyeOutlined style={{ color: "#faad14" }} />;
      default:
        return <UserOutlined />;
    }
  };

  // 角色標籤顏色
  const getRoleColor = (role) => {
    switch (role) {
      case USER_ROLES.SUPER_ADMIN:
        return "red";
      case USER_ROLES.ADMIN:
        return "blue";
      case USER_ROLES.EDITOR:
        return "green";
      case USER_ROLES.VIEWER:
        return "orange";
      default:
        return "default";
    }
  };

  return (
    <Space direction="vertical" size="small">
      <Space align="center">
        <Avatar
          size={size === "small" ? 24 : 32}
          src={user.photoURL}
          icon={<UserOutlined />}
        />
        <Space size="small" wrap>
          <Text strong>{user.displayName || user.email?.split("@")[0]}</Text>
          <Tooltip title={`角色：${ROLE_DISPLAY_NAMES[userRole]}`}>
            <Tag
              icon={getRoleIcon(userRole)}
              color={getRoleColor(userRole)}
              size={size}
            >
              {ROLE_DISPLAY_NAMES[userRole]}
            </Tag>
          </Tooltip>
          {user.isDevelopment && (
            <Tag color="purple" size={size}>
              開發環境
            </Tag>
          )}
        </Space>
      </Space>

      {showPermissions && userPermissions.length > 0 && (
        <div>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            權限數量：{userPermissions.length}
          </Text>
        </div>
      )}
    </Space>
  );
};

export default UserProfile;
