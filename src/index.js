import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 引入性能監控
import performanceMonitor from "./utils/performanceMonitor";

// 引入關鍵 CSS
import "./styles/critical.css";

// 初始化性能監控
performanceMonitor.init();

// 註冊 Service Worker
if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
