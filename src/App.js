import React, { useEffect, Suspense } from "react";
import { BlogProvider } from "./context/BlogContext";
import { SearchProvider } from "./context/SearchContext";
import "./App.css";

// components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FloatingButtons from "./components/FloatingButtons/FloatingButtons";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// react-router
import { Outlet } from "react-router-dom";

// 載入指示器組件
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
      fontSize: "1.2rem",
      color: "#c71432",
    }}
  >
    <div
      className="loading-skeleton"
      style={{
        width: "200px",
        height: "20px",
        borderRadius: "4px",
      }}
    >
      載入中...
    </div>
  </div>
);

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      window.history.replaceState({}, "", redirect);
    }
  }, []);
  return (
    <BlogProvider>
      <SearchProvider>
        <ErrorBoundary>
          <div className="App">
            <Header />
            <main className="main-content">
              {/* 修改：使用 Suspense 包裹 Outlet */}
              <Suspense fallback={<LoadingSpinner />}>
                <Outlet />
              </Suspense>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
        <FloatingButtons />
      </SearchProvider>
    </BlogProvider>
  );
}

export default App;
