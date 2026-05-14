import React, { lazy, Suspense, useEffect } from "react";
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
  <div className="app-loading" role="status" aria-label="載入中">
    <span className="app-loading__spinner" aria-hidden="true" />
    <span className="app-loading__text">載入中...</span>
  </div>
);

// 最小化骨架屏組件
const MinimalSkeleton = () => (
  <div className="app-minimal-skeleton" role="status" aria-label="載入中">
    <span className="app-loading__spinner" aria-hidden="true" />
    <span className="app-loading__text">載入中...</span>
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
    <>
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
    </>
  );
}

export default App;
