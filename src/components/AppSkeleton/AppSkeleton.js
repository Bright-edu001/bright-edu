import React from "react";
import { useFirebaseInit } from "../../context/FirebaseInitContext";
import "./AppSkeleton.scss";

// 骨架畫面組件
const AppSkeleton = () => {
  const { isInitializing, initError, retryInitialization } = useFirebaseInit();

  if (initError) {
    return (
      <div className="init-error">
        <div className="error-content">
          <h2>初始化失敗</h2>
          <p>Firebase 服務初始化時發生錯誤，某些功能可能無法正常使用。</p>
          <button onClick={retryInitialization} className="retry-button">
            重試
          </button>
        </div>
      </div>
    );
  }

  if (isInitializing) {
    return (
      <div className="app-skeleton">
        {/* Header 骨架 */}
        <div className="skeleton-header">
          <div className="skeleton-nav">
            <div className="skeleton-logo"></div>
            <div className="skeleton-menu">
              <div className="skeleton-menu-item"></div>
              <div className="skeleton-menu-item"></div>
              <div className="skeleton-menu-item"></div>
              <div className="skeleton-menu-item"></div>
            </div>
          </div>
        </div>

        {/* Main content 骨架 */}
        <div className="skeleton-content">
          <div className="skeleton-hero">
            <div className="skeleton-hero-title"></div>
            <div className="skeleton-hero-subtitle"></div>
            <div className="skeleton-hero-button"></div>
          </div>

          <div className="skeleton-sections">
            <div className="skeleton-section">
              <div className="skeleton-section-title"></div>
              <div className="skeleton-cards">
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer 骨架 */}
        <div className="skeleton-footer">
          <div className="skeleton-footer-content">
            <div className="skeleton-footer-section"></div>
            <div className="skeleton-footer-section"></div>
            <div className="skeleton-footer-section"></div>
          </div>
        </div>

        {/* 載入指示器 */}
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
          <span>正在初始化...</span>
        </div>
      </div>
    );
  }

  return null; // Firebase 已初始化，不顯示骨架
};

export default AppSkeleton;
