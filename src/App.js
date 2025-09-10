import React, { useEffect, Suspense } from "react";
import { App as AntdApp, ConfigProvider, Spin } from "antd"; // 引入 Antd 的 App 與 Spin 組件
import { BlogProvider } from "./context/BlogContext";
import { SearchProvider } from "./context/SearchContext";
import "./App.scss";

// 組件引入
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FloatingButtons from "./components/FloatingButtons/FloatingButtons";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// react-router 用於路由嵌套
import { Outlet } from "react-router-dom";

// 載入指示器組件，顯示「載入中...」
// 使用 Ant Design 的 Spin 作為載入指示器
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

// App 主組件
function App() {
  useEffect(() => {
    // 監聽網址參數，若有 redirect 則導向指定路徑
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      window.history.replaceState({}, "", redirect);
    }
  }, []);

  return (
    // 使用 ConfigProvider 提供全域配置
    <ConfigProvider
      theme={{
        token: {
          // 你可以在這裡自訂主題色彩
          // colorPrimary: '#1890ff',
        },
      }}
    >
      {/* 使用 Antd 的 App 組件包裹應用程式 */}
      <AntdApp>
        {/* 提供部落格與搜尋的 context */}
        <BlogProvider>
          <SearchProvider>
            {/* 錯誤邊界，捕捉子組件錯誤 */}
            <ErrorBoundary>
              <div className="App">
                {/* 頁首 */}
                <Header />
                <main className="main-content">
                  {/* 使用 Suspense 包裹 Outlet，顯示載入指示器 */}
                  <Suspense fallback={<LoadingSpinner />}>
                    <Outlet />
                  </Suspense>
                </main>
                {/* 頁尾 */}
                <Footer />
              </div>
            </ErrorBoundary>
            {/* 浮動按鈕 */}
            <FloatingButtons />
          </SearchProvider>
        </BlogProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
