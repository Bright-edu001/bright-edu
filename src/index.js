import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/reset.css";

// 引入性能監控
import performanceMonitor from "./utils/performanceMonitor";

// 引入關鍵 CSS
import "./styles/critical.css";

// 移除舊的 Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    })
    .catch(function (err) {
      console.log("Service Worker unregistration failed: ", err);
    });
}

// 初始化性能監控
performanceMonitor.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
