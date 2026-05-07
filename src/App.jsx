import React, { lazy, Suspense, useEffect } from "react";
import { App as AntdApp, ConfigProvider, Spin } from "antd";
import { BlogProvider } from "./context/BlogContext";
import { SearchProvider } from "./context/SearchContext";
import {
  useFirebaseInit,
  useFirebaseBasicReady,
} from "./context/FirebaseInitContext";
import "./App.scss";

// 組件引入
import Header from "./components/Header/Header";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// react-router 用於路由嵌套
import { Outlet } from "react-router-dom";

const Footer = lazy(() => import("./components/Footer/Footer"));
const FloatingButtons = lazy(
  () => import("./components/FloatingButtons/FloatingButtons"),
);

// 載入指示器組件，顯示「載入中...」
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        minHeight: "200px",
      }}
    >
      <Spin size="large" />
      <span style={{ fontSize: "18px", color: "#666" }}>載入中...</span>
    </div>
  </div>
);

// 最小化骨架屏組件
const MinimalSkeleton = () => (
  <div className="minimal-skeleton">
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px", fontSize: "16px", color: "#666" }}>
          載入中...
        </div>
      </div>
    </div>
  </div>
);

// App 主組件（優化版）
function App() {
  const { initError } = useFirebaseInit();
  const isBasicReady = useFirebaseBasicReady();

  useEffect(() => {
    // 監聽網址參數，若有 redirect 則導向指定路徑
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      window.history.replaceState({}, "", redirect);
    }
  }, []);

  // 如果有嚴重錯誤，顯示錯誤頁面
  if (initError) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <h2>載入失敗</h2>
          <p>請重新整理頁面或稍後再試</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "8px 16px",
              background: "#1890ff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            重新載入
          </button>
        </div>
      </div>
    );
  }

  // 如果基礎服務未就緒，顯示最小化骨架屏
  if (!isBasicReady) {
    return <MinimalSkeleton />;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          // 你可以在這裡自訂主題色彩
          // colorPrimary: '#1890ff',
        },
      }}
    >
      <AntdApp>
        <BlogProvider>
          <SearchProvider>
            <ErrorBoundary>
              <ScrollToTop />
              <div className="App">
                <Header />
                <main className="main-content">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Outlet />
                  </Suspense>
                </main>
                <Suspense fallback={null}>
                  <Footer />
                </Suspense>
              </div>
            </ErrorBoundary>
            <Suspense fallback={null}>
              <FloatingButtons />
            </Suspense>
          </SearchProvider>
        </BlogProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
