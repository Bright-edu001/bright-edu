import React from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, message } from "antd";
import CryptoJS from "crypto-js"; // 新增：用於計算 SHA-256

const EXPECTED_USERNAME = "admin";
// 0000 的 SHA-256 雜湊（開發測試用；正式請改由後端比對）
const EXPECTED_PASSWORD_HASH =
  "9af15b336e6a9619928537df30b2e6a2376569fcf9d7e773eccede65606529a0";

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    // 前端模擬：用 SHA-256 將使用者輸入的密碼雜湊後比對
    const inputHash = CryptoJS.SHA256(values.password).toString();

    if (
      values.username === EXPECTED_USERNAME &&
      inputHash === EXPECTED_PASSWORD_HASH
    ) {
      localStorage.setItem("isAuthenticated", "true");
      message.success("登入成功！");
      navigate("/");
    } else {
      message.error("帳號或密碼錯誤！");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card title="管理後台登入" style={{ width: 400 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "請輸入使用者名稱!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="使用者名稱"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "請輸入密碼!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密碼 "
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              登入
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
