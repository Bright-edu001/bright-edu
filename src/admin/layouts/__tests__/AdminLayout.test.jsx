import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminLayout from "../AdminLayout";

vi.mock("../../pages/DashboardPage", () => ({
  default: () => <div>Dashboard</div>,
}));

vi.mock("../../pages/ArticlesPage", () => ({
  default: () => <div>Articles</div>,
}));

vi.mock("../../pages/ContactFormsPage", () => ({
  default: () => <div>Contact Forms</div>,
}));

vi.mock("../../pages/UserManagePage", () => ({
  default: () => <div>Users</div>,
}));

vi.mock("../../components/UserProfile", () => ({
  default: () => <div>User Profile</div>,
}));

vi.mock("../../components/PermissionGuard", () => ({
  default: ({ children }) => children,
}));

vi.mock("../../../context/AuthContext", () => ({
  useAuth: () => ({
    logout: vi.fn(),
    checkPermission: () => true,
  }),
}));

vi.mock("@ant-design/icons", () => ({
  DesktopOutlined: () => <span />,
  PieChartOutlined: () => <span />,
  LogoutOutlined: () => <span />,
  FormOutlined: () => <span />,
  TeamOutlined: () => <span />,
}));

vi.mock("antd", () => {
  const Layout = ({ children }) => <div>{children}</div>;
  Layout.Header = ({ children }) => <header>{children}</header>;
  Layout.Content = ({ children }) => <main>{children}</main>;
  Layout.Footer = ({ children }) => <footer>{children}</footer>;
  Layout.Sider = ({ children }) => <aside>{children}</aside>;

  return {
    Breadcrumb: () => <nav />,
    Button: ({ children, onClick }) => (
      <button onClick={onClick}>{children}</button>
    ),
    Layout,
    Menu: ({ items = [] }) => (
      <nav>
        {items.map((item) => (
          <div key={item.key}>{item.label}</div>
        ))}
      </nav>
    ),
    theme: {
      useToken: () => ({
        token: {
          colorBgContainer: "#fff",
          borderRadiusLG: 8,
        },
      }),
    },
  };
});

describe("AdminLayout", () => {
  it("renders a branded footer without placeholder author text", async () => {
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AdminLayout />
      </MemoryRouter>,
    );

    await screen.findByText("Dashboard");
    expect(screen.getByText(/Bright Edu Admin/i)).toBeInTheDocument();
    expect(screen.queryByText(/Created by YourName/i)).not.toBeInTheDocument();
  });

  it("uses stable absolute admin sidebar links", async () => {
    render(
      <MemoryRouter
        initialEntries={["/admin/articles"]}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AdminLayout />
      </MemoryRouter>,
    );

    await screen.findByText("Dashboard");
    expect(screen.getByRole("link", { name: "儀表板" })).toHaveAttribute(
      "href",
      "/admin",
    );
    expect(screen.getByRole("link", { name: "文章管理" })).toHaveAttribute(
      "href",
      "/admin/articles",
    );
    expect(screen.getByRole("link", { name: "聯絡表單" })).toHaveAttribute(
      "href",
      "/admin/contact-forms",
    );
    expect(screen.getByRole("link", { name: "用戶管理" })).toHaveAttribute(
      "href",
      "/admin/users",
    );
  });
});
