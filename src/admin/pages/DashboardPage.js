import React, { useState } from "react";
import { Typography, Button, Card, Space, message } from "antd";
import { SyncOutlined, DatabaseOutlined } from "@ant-design/icons";
import { syncEnrollmentEvents, syncNews } from "../../utils/updateBlog";
import logger from "../../utils/logger";

const { Title } = Typography;

const DashboardPage = () => {
  const [loading, setLoading] = useState({
    enrollment: false,
    news: false,
  });

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
      <Title level={2}>儀表板</Title>
      <p>歡迎來到管理後台！</p>

      <Card
        title={
          <span>
            <DatabaseOutlined style={{ marginRight: 8 }} />
            資料同步管理
          </span>
        }
        style={{ marginTop: 24 }}
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
              全部同步
            </Button>
          </Space>

          <div style={{ fontSize: "12px", color: "#666" }}>
            ⚠️ 注意：同步操作會覆蓋 Firebase 中現有的資料，請謹慎操作
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default DashboardPage;
