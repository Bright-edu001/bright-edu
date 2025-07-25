import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import commonRoutes from "./routes/commonRoutes";
import uicRoutes from "./routes/uicRoutes";
import msuRoutes from "./routes/msuRoutes";

// 後台主程式採用懶載入
const AdminApp = lazy(() => import("./admin/App"));

// 建立前台與後台路由
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      // 前台路由，合併三個 route 陣列
      children: [...commonRoutes, ...uicRoutes, ...msuRoutes],
    },
    {
      path: "/admin/*",
      // 後台路由，使用懶載入與 Suspense
      element: (
        <React.Suspense fallback={null}>
          <AdminApp />
        </React.Suspense>
      ),
      // 後台錯誤頁面
      errorElement: <div>後台頁面不存在或載入失敗，請聯絡管理員。</div>,
    },
  ],
  {
    future: {
      // 啟用 v7_startTransition，讓導航具有非同步特性，提升使用者體驗
      v7_startTransition: true,
    },
  }
);

export default router;
