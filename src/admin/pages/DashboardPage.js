import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  Space,
  message,
  Descriptions,
  Tag,
  Alert,
} from "antd";
import {
  SyncOutlined,
  DatabaseOutlined,
  CrownOutlined,
  UserOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { syncEnrollmentEvents, syncNews } from "../../utils/updateBlog";
import logger from "../../utils/logger";
import { useAuth } from "../../context/AuthContext";
import { USER_ROLES, ROLE_DISPLAY_NAMES } from "../../config/permissions";

const { Title } = Typography;

const DashboardPage = () => {
  const { user, userRole, userPermissions, isProduction } = useAuth();
  const [loading, setLoading] = useState({
    enrollment: false,
    news: false,
  });

  // 角色圖示
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

  const handleSyncEnrollment = async () => {
    try {
      setLoading({ ...loading, enrollment: true });
      await syncEnrollmentEvents();
      message.success("招生活動資料同步完成！");
    } catch (err) {
      message.error("同步失敗：" + err.message);
      logger.error("同步招生活動失敗：", err);
    } finally {
      setLoading({ ...loading, enrollment: false });
    }
  };

  const handleSyncNews = async () => {
    try {
      setLoading({ ...loading, news: true });
      await syncNews();
      message.success("新聞資料同步完成！");
    } catch (err) {
      message.error("同步失敗：" + err.message);
      logger.error("同步新聞失敗：", err);
    } finally {
      setLoading({ ...loading, news: false });
    }
  };

  const handleSyncAll = async () => {
    try {
      setLoading({ enrollment: true, news: true });
      await Promise.all([syncEnrollmentEvents(), syncNews()]);
      message.success("所有資料同步完成！");
    } catch (err) {
      message.error("同步失敗：" + err.message);
      logger.error("同步失敗：", err);
    } finally {
      setLoading({ enrollment: false, news: false });
    }
  };

  return (
    <div>
      <Title level={2}>系統儀表板</Title>

      {/* 權限信息提示 */}
      <Alert
        message="歡迎使用後台管理系統"
        description={`您目前的角色是 ${ROLE_DISPLAY_NAMES[userRole]}，擁有 ${
          userPermissions.length
        } 項權限，運行在${isProduction ? "正式" : "開發"}環境。`}
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* 用戶信息卡片 */}
      <Card title="我的資訊" style={{ marginBottom: 24 }}>
        <Descriptions bordered>
          <Descriptions.Item label="電子郵件">
            {user?.email || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="角色">
            <Tag icon={getRoleIcon(userRole)} color={getRoleColor(userRole)}>
              {ROLE_DISPLAY_NAMES[userRole]}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="權限數量">
            {userPermissions.length} 項
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 數據同步功能 */}
      <Card
        title={
          <span>
            <DatabaseOutlined style={{ marginRight: 8 }} />
            資料同步管理
          </span>
        }
      >
        <p>將本地 JSON 檔案的資料同步到 Firebase 資料庫</p>

        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Space wrap>
            <Button
              type="primary"
              icon={<SyncOutlined />}
              loading={loading.enrollment}
              onClick={handleSyncEnrollment}
            >
              同步招生活動
            </Button>

            <Button
              type="primary"
              icon={<SyncOutlined />}
              loading={loading.news}
              onClick={handleSyncNews}
            >
              同步新聞資料
            </Button>

            <Button
              type="primary"
              danger
              icon={<SyncOutlined />}
              loading={loading.enrollment || loading.news}
              onClick={handleSyncAll}
            >
              同步所有資料
            </Button>
          </Space>

          <p style={{ color: "#666", fontSize: "14px" }}>
            注意：同步過程中請勿關閉頁面。大量資料同步可能需要幾分鐘時間。
          </p>
        </Space>
      </Card>
    </div>
  );
};

export default DashboardPage;
