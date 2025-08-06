import React, { useEffect, Suspense, useRef } from "react";
import { App as AntdApp, ConfigProvider } from "antd"; // 引入 Antd 的 App 組件
import { BlogProvider } from "./context/BlogContext";
import { SearchProvider } from "./context/SearchContext";
import "./App.scss";

// 組件引入
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FloatingButtons from "./components/FloatingButtons/FloatingButtons";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// react-router 用於路由嵌套
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

// 載入指示器組件，顯示「載入中...」
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="loading-skeleton">載入中...</div>
  </div>
);

// App 主組件
function App() {
  const location = useLocation();
  const nodeRef = useRef(null);

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
                    <SwitchTransition>
                      <CSSTransition
                        key={location.pathname}
                        classNames="fade"
                        timeout={0}
                        unmountOnExit
                        nodeRef={nodeRef}
                      >
                        <div ref={nodeRef}>
                          <Outlet />
                        </div>
                      </CSSTransition>
                    </SwitchTransition>
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
