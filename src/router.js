import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import commonRoutes from "./routes/commonRoutes";
import uicRoutes from "./routes/uicRoutes";
import msuRoutes from "./routes/msuRoutes";

const AdminApp = lazy(() => import("./admin/App"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [...commonRoutes, ...uicRoutes, ...msuRoutes],
    },
    {
      path: "/admin/*",
      element: (
        <React.Suspense fallback={null}>
          <AdminApp />
        </React.Suspense>
      ),
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
