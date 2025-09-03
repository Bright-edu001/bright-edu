import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Tag,
  Button,
  Modal,
  Form,
  Select,
  Input,
  message,
  Space,
  Descriptions,
  Alert,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  CrownOutlined,
  EyeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  USER_ROLES,
  ROLE_DISPLAY_NAMES,
  PERMISSIONS,
  DEFAULT_USER_ROLES,
  getRolePermissions,
  getEnvironmentInfo,
} from "../../config/permissions";
import { useAuth } from "../../context/AuthContext";
import PermissionGuard from "../components/PermissionGuard";

const { Option } = Select;

const UserManagePage = () => {
  const { userRole } = useAuth();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  // 獲取環境資訊
  const environmentInfo = getEnvironmentInfo();

  // 開發環境測試函數
  const handleEnvironmentTest = () => {
    if (process.env.NODE_ENV === "development") {
      console.group("🔧 環境資訊測試");
      console.log("📍 當前環境:", environmentInfo.environment);
      console.log("🚀 是否為正式環境:", environmentInfo.isProduction);
      console.log("👥 可用帳號數量:", environmentInfo.availableAccounts.length);
      console.log("📧 可用帳號列表:");
      environmentInfo.availableAccounts.forEach((account, index) => {
        const role = environmentInfo.userRoles[account];
        console.log(`  ${index + 1}. ${account} (${role})`);
      });
      console.groupEnd();
      message.info("環境資訊已輸出到控制台，請按 F12 查看");
    }
  };

  // 初始模擬用戶數據
  const getInitialUsers = () => {
    const saved = localStorage.getItem(
      `bright-edu-users-${environmentInfo.environment}`
    );
    if (saved) {
      return JSON.parse(saved);
    }

    // 如果沒有保存的數據，使用當前環境的默認數據
    return Object.entries(DEFAULT_USER_ROLES).map(([email, role]) => ({
      id: email,
      email,
      role,
      displayName: email.split("@")[0],
      lastLogin: new Date().toISOString(),
      status: "active",
    }));
  };

  const [users, setUsers] = useState(getInitialUsers);

  // 當用戶數據變化時保存到 localStorage（按環境分別儲存）
  useEffect(() => {
    localStorage.setItem(
      `bright-edu-users-${environmentInfo.environment}`,
      JSON.stringify(users)
    );
  }, [users, environmentInfo.environment]);

  // 重置用戶數據到初始狀態
  const handleResetUsers = () => {
    Modal.confirm({
      title: "確認重置",
      content: `確定要重置所有用戶數據到初始狀態嗎？這將恢復${environmentInfo.environment}的所有被刪除的用戶並重置角色。`,
      okType: "danger",
      onOk() {
        const initialUsers = Object.entries(DEFAULT_USER_ROLES).map(
          ([email, role]) => ({
            id: email,
            email,
            role,
            displayName: email.split("@")[0],
            lastLogin: new Date().toISOString(),
            status: "active",
          })
        );
        setUsers(initialUsers);
        message.success(
          `${environmentInfo.environment}用戶數據已重置到初始狀態`
        );
      },
    });
  };

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

  // 編輯用戶角色
  const handleEditUser = (user) => {
    setSelectedUser(user);
    form.setFieldsValue({
      email: user.email,
      role: user.role,
    });
    setEditModalVisible(true);
  };

  // 新增用戶
  const handleAddUser = () => {
    addForm.resetFields();
    setAddModalVisible(true);
  };

  // 保存新增用戶
  const handleSaveNewUser = async () => {
    try {
      const values = await addForm.validateFields();

      // 檢查 email 是否已存在
      const emailExists = users.some((user) => user.email === values.email);
      if (emailExists) {
        message.error("此電子郵件已存在");
        return;
      }

      // 創建新用戶
      const newUser = {
        id: values.email,
        email: values.email,
        role: values.role,
        displayName: values.email.split("@")[0],
        lastLogin: new Date().toISOString(),
        status: "active",
      };

      setUsers((prevUsers) => [...prevUsers, newUser]);
      message.success("用戶新增成功！");
      setAddModalVisible(false);
      addForm.resetFields();
    } catch (error) {
      console.error("新增失敗:", error);
      message.error("新增失敗，請稍後再試");
    }
  };

  // 保存用戶角色變更
  const handleSaveUser = async () => {
    try {
      const values = await form.validateFields();

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, role: values.role } : user
        )
      );

      message.success("用戶角色更新成功！");
      setEditModalVisible(false);
      setSelectedUser(null);
      form.resetFields();
    } catch (error) {
      console.error("保存失敗:", error);
      message.error("保存失敗，請稍後再試");
    }
  };

  // 刪除用戶
  const handleDeleteUser = (user) => {
    Modal.confirm({
      title: "確認刪除",
      content: `確定要刪除用戶 ${user.email} 嗎？此操作無法撤銷。`,
      okType: "danger",
      onOk() {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
        message.success("用戶已刪除");
      },
    });
  };

  // 查看用戶權限
  const showUserPermissions = (user) => {
    const permissions = getRolePermissions(user.role);

    Modal.info({
      title: `${user.email} 的權限`,
      width: 600,
      content: (
        <div>
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="角色">
              <Tag
                icon={getRoleIcon(user.role)}
                color={getRoleColor(user.role)}
              >
                {ROLE_DISPLAY_NAMES[user.role]}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="權限數量">
              {permissions.length} 項
            </Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: 16 }}>
            <h4>具體權限：</h4>
            <Space wrap>
              {permissions.map((permission) => (
                <Tag key={permission} size="small">
                  {permission}
                </Tag>
              ))}
            </Space>
          </div>
        </div>
      ),
    });
  };

  const columns = [
    {
      title: "用戶",
      dataIndex: "email",
      key: "email",
      render: (email, record) => (
        <Space>
          <UserOutlined />
          <div>
            <div style={{ fontWeight: 500 }}>{record.displayName}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>{email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag icon={getRoleIcon(role)} color={getRoleColor(role)}>
          {ROLE_DISPLAY_NAMES[role]}
        </Tag>
      ),
    },
    {
      title: "權限數量",
      key: "permissions",
      render: (_, record) => {
        const permissions = getRolePermissions(record.role);
        return (
          <Button
            type="link"
            size="small"
            onClick={() => showUserPermissions(record)}
          >
            {permissions.length} 項權限
          </Button>
        );
      },
    },
    {
      title: "操作",
      key: "actions",
      render: (_, record) => (
        <Space>
          <PermissionGuard permission={PERMISSIONS.EDIT_USERS}>
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEditUser(record)}
            >
              編輯
            </Button>
          </PermissionGuard>

          <PermissionGuard permission={PERMISSIONS.DELETE_USERS}>
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteUser(record)}
            >
              刪除
            </Button>
          </PermissionGuard>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title={
          <Space>
            <TeamOutlined />
            用戶管理
          </Space>
        }
        extra={
          <Space>
            <PermissionGuard permission={PERMISSIONS.CREATE_USERS}>
              <Button type="primary" onClick={handleAddUser}>
                新增用戶
              </Button>
            </PermissionGuard>
            <PermissionGuard permission={PERMISSIONS.MANAGE_USERS}>
              <Button onClick={handleResetUsers} danger>
                重置數據
              </Button>
            </PermissionGuard>
            {/* 開發環境測試按鈕 */}
            {!environmentInfo.isProduction && (
              <Button
                onClick={handleEnvironmentTest}
                type="dashed"
                size="small"
              >
                測試環境
              </Button>
            )}
          </Space>
        }
      >
        {/* 環境資訊顯示 */}
        <Alert
          message={`當前環境：${environmentInfo.environment}`}
          description={
            <div>
              <p>
                此環境共有 {environmentInfo.availableAccounts.length}{" "}
                個可用帳號。
              </p>
              <p>
                <strong>可用帳號：</strong>
                {environmentInfo.availableAccounts.join(", ")}
              </p>
            </div>
          }
          type={environmentInfo.isProduction ? "warning" : "success"}
          showIcon
          style={{ marginBottom: 16 }}
        />

        <Alert
          message="權限系統說明"
          description="此頁面展示基於角色的權限管理系統。不同角色擁有不同的權限，可以控制用戶對系統功能的訪問。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />

        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* 編輯用戶對話框 */}
      <Modal
        title="編輯用戶角色"
        open={editModalVisible}
        onOk={handleSaveUser}
        onCancel={() => {
          setEditModalVisible(false);
          setSelectedUser(null);
          form.resetFields();
        }}
        okText="保存"
        cancelText="取消"
        destroyOnHidden={true}
        forceRender={false}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="電子郵件" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: "請選擇角色" }]}
          >
            <Select>
              {Object.entries(ROLE_DISPLAY_NAMES).map(([role, displayName]) => (
                <Option
                  key={role}
                  value={role}
                  disabled={
                    // 非超級管理員不能設定超級管理員
                    role === USER_ROLES.SUPER_ADMIN &&
                    userRole !== USER_ROLES.SUPER_ADMIN
                  }
                >
                  <Space>
                    {getRoleIcon(role)}
                    {displayName}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.role !== currentValues.role
            }
          >
            {({ getFieldValue }) => {
              const selectedRole = getFieldValue("role");
              return selectedRole ? (
                <Alert
                  message={`${ROLE_DISPLAY_NAMES[selectedRole]} 擁有 ${
                    getRolePermissions(selectedRole).length
                  } 項權限`}
                  type="info"
                  size="small"
                />
              ) : null;
            }}
          </Form.Item>
        </Form>
      </Modal>

      {/* 新增用戶對話框 */}
      <Modal
        title="新增用戶"
        open={addModalVisible}
        onOk={handleSaveNewUser}
        onCancel={() => {
          setAddModalVisible(false);
          addForm.resetFields();
        }}
        okText="新增"
        cancelText="取消"
        destroyOnHidden={true}
        forceRender={false}
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            label="電子郵件"
            name="email"
            rules={[
              { required: true, message: "請輸入電子郵件" },
              { type: "email", message: "請輸入有效的電子郵件格式" },
              {
                pattern: /@bright-edu\.com$/,
                message: "電子郵件必須以 @bright-edu.com 結尾",
              },
            ]}
          >
            <Input placeholder="請輸入電子郵件 (例: user@bright-edu.com)" />
          </Form.Item>

          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: "請選擇角色" }]}
            initialValue={USER_ROLES.VIEWER}
          >
            <Select>
              {Object.entries(ROLE_DISPLAY_NAMES).map(([role, displayName]) => (
                <Option
                  key={role}
                  value={role}
                  disabled={
                    // 非超級管理員不能設定超級管理員
                    role === USER_ROLES.SUPER_ADMIN &&
                    userRole !== USER_ROLES.SUPER_ADMIN
                  }
                >
                  <Space>
                    {getRoleIcon(role)}
                    {displayName}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.role !== currentValues.role
            }
          >
            {({ getFieldValue }) => {
              const selectedRole = getFieldValue("role");
              return selectedRole ? (
                <Alert
                  message={`${ROLE_DISPLAY_NAMES[selectedRole]} 擁有 ${
                    getRolePermissions(selectedRole).length
                  } 項權限`}
                  type="info"
                  size="small"
                />
              ) : null;
            }}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagePage;
