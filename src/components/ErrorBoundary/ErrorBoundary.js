import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // 在生產環境中，將錯誤傳送到 Sentry
    if (process.env.NODE_ENV === "production") {
      const Sentry = require("@sentry/react");
      Sentry.captureException(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "#c71432", marginBottom: "1rem" }}>
            抱歉，頁面發生錯誤
          </h2>
          <p style={{ color: "#666", marginBottom: "2rem" }}>
            我們已經記錄了這個問題，請稍後再試或聯繫客服。
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: "#c71432",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            重新載入頁面
          </button>

          {process.env.NODE_ENV === "development" && (
            <details style={{ marginTop: "2rem", textAlign: "left" }}>
              <summary style={{ cursor: "pointer", marginBottom: "1rem" }}>
                查看錯誤詳情
              </summary>
              <pre
                style={{
                  backgroundColor: "#f4f4f4",
                  padding: "1rem",
                  overflow: "auto",
                  fontSize: "0.8rem",
                  color: "#e74c3c",
                }}
              >
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
