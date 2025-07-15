import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const DashboardPage = () => {
  return (
    <div>
      <Title level={2}>儀表板</Title>
      <p>歡迎來到管理後台！</p>
    </div>
  );
};

export default DashboardPage;
