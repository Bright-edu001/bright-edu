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
  FormOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import DashboardPage from "../pages/DashboardPage";
import ArticlesPage from "../pages/ArticlesPage";
import ContactFormsPage from "../pages/ContactFormsPage";
import UserManagePage from "../pages/UserManagePage";
import { useAuth } from "../../context/AuthContext";
import UserProfile from "../components/UserProfile";
import PermissionGuard from "../components/PermissionGuard";
import { PERMISSIONS } from "../../config/permissions";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, permission = null) {
  return { key, icon, children, label, permission };
}

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, checkPermission } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 根據權限過濾選單項目
  const getFilteredMenuItems = () => {
    const allItems = [
      getItem(
        <Link to=".">儀表板</Link>,
        "dashboard",
        <PieChartOutlined />,
        null,
        PERMISSIONS.VIEW_DASHBOARD
      ),
      getItem(
        <Link to="articles">文章管理</Link>,
        "articles",
        <DesktopOutlined />,
        null,
        PERMISSIONS.VIEW_ARTICLES
      ),
      getItem(
        <Link to="contact-forms">聯絡表單</Link>,
        "contact-forms",
        <FormOutlined />,
        null,
        PERMISSIONS.VIEW_CONTACT_FORMS
      ),
      getItem(
        <Link to="users">用戶管理</Link>,
        "users",
        <TeamOutlined />,
        null,
        PERMISSIONS.VIEW_USERS
      ),
    ];

    // 過濾掉沒有權限的項目
    return allItems.filter((item) => {
      if (!item.permission) return true; // 沒有權限要求的項目總是顯示
      return checkPermission(item.permission);
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
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
              : location.pathname.includes("/contact-forms")
              ? ["contact-forms"]
              : location.pathname.includes("/users")
              ? ["users"]
              : ["dashboard"]
          }
          mode="inline"
          items={getFilteredMenuItems()}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <UserProfile size="small" />
          </div>
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
                  : location.pathname.includes("/contact-forms")
                  ? "聯絡表單"
                  : location.pathname.includes("/users")
                  ? "用戶管理"
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
              <Route
                path="/"
                element={
                  <PermissionGuard
                    permission={PERMISSIONS.VIEW_DASHBOARD}
                    showNoPermissionMessage
                  >
                    <DashboardPage />
                  </PermissionGuard>
                }
              />
              <Route
                path="/articles"
                element={
                  <PermissionGuard
                    permission={PERMISSIONS.VIEW_ARTICLES}
                    showNoPermissionMessage
                  >
                    <ArticlesPage />
                  </PermissionGuard>
                }
              />
              <Route
                path="/contact-forms"
                element={
                  <PermissionGuard
                    permission={PERMISSIONS.VIEW_CONTACT_FORMS}
                    showNoPermissionMessage
                  >
                    <ContactFormsPage />
                  </PermissionGuard>
                }
              />
              <Route
                path="/users"
                element={
                  <PermissionGuard
                    permission={PERMISSIONS.VIEW_USERS}
                    showNoPermissionMessage
                  >
                    <UserManagePage />
                  </PermissionGuard>
                }
              />
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
