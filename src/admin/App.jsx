import React, { lazy, Suspense } from "react";
import { ConfigProvider, App as AntdApp } from "antd";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "../context/AuthContext";
import "./App.css";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));

const adminLoadingFallback = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <span>載入中...</span>
  </div>
);

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <AuthProvider>
          <Suspense fallback={adminLoadingFallback}>
            <Routes>
              <Route path="login" element={<LoginPage />} />
              <Route
                path="*"
                element={
                  <PrivateRoute>
                    <AdminLayout />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </AuthProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
