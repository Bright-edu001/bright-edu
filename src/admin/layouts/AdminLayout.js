import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import DashboardPage from "../pages/DashboardPage";
import ArticlesPage from "../pages/ArticlesPage";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const items = [
  getItem(<Link to=".">儀表板</Link>, "dashboard", <PieChartOutlined />),
  getItem(<Link to="articles">文章管理</Link>, "articles", <DesktopOutlined />),
  // 依需求暫時移除「招生活動/最新消息」
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="demo-logo-vertical"
          style={{
            height: "32px",
            margin: "16px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "6px",
          }}
        />
        <Menu
          theme="dark"
          selectedKeys={
            location.pathname.includes("/articles")
              ? ["articles"]
              : ["dashboard"]
          }
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            登出
          </Button>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[
              { title: "後台" },
              {
                title: location.pathname.includes("/articles")
                  ? "文章管理"
                  : "儀表板",
              },
            ]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              {/* 在這裡新增更多後台頁面的路由 */}
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Bright EDU Admin ©{new Date().getFullYear()} Created by YourName
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
