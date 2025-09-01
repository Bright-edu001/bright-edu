import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, Divider } from "antd";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, isProduction } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (isProduction) {
        await login(values.email, values.password);
      } else {
        await login(values.username || values.email, values.password);
      }
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate("/admin");
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setGoogleLoading(false);
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
      <Card
        title={`管理後台登入 ${isProduction ? "(正式環境)" : "(開發環境)"}`}
        style={{ width: 400 }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name={isProduction ? "email" : "username"}
            rules={[
              {
                required: true,
                message: isProduction ? "請輸入電子郵件!" : "請輸入使用者名稱!",
              },
              ...(isProduction
                ? [
                    {
                      type: "email",
                      message: "請輸入有效的電子郵件格式!",
                    },
                  ]
                : []),
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={
                isProduction ? "電子郵件 (@bright-edu.com)" : "使用者名稱"
              }
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "請輸入密碼!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密碼"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
              loading={loading}
            >
              登入
            </Button>
          </Form.Item>
        </Form>

        {isProduction && (
          <>
            <Divider>或</Divider>
            <Button
              icon={<GoogleOutlined />}
              onClick={handleGoogleLogin}
              loading={googleLoading}
              style={{ width: "100%" }}
            >
              使用 Google 帳號登入
            </Button>
          </>
        )}

        {!isProduction && (
          <div
            style={{
              marginTop: 16,
              fontSize: 12,
              color: "#666",
              textAlign: "center",
            }}
          >
            開發環境：使用 admin/0000 登入
          </div>
        )}
      </Card>
    </div>
  );
};

export default LoginPage;
