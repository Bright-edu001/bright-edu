import React, { lazy } from "react";
import { Navigate, useParams } from "react-router-dom";

const Home = lazy(() => import("../pages/Home/Home"));
const Contact = lazy(() => import("../pages/Home/Contact.js"));
const Blog = lazy(() => import("../pages/Home/Blog.js"));
const BlogDetail = lazy(() => import("../pages/Blog/BlogDetail"));
const BlogSearch = lazy(() => import("../pages/Blog/BlogSearch"));

// 自定義重導向組件處理動態路由
const BlogDetailRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/活動與文章/${id}`} replace />;
};

const BlogSearchRedirect = () => {
  const { keyword } = useParams();
  return <Navigate to={`/活動與文章/search/${keyword}`} replace />;
};

const commonRoutes = [
  { index: true, element: <Home /> },

  // 中文路由
  { path: "聯絡我們", element: <Contact /> },
  { path: "活動與文章", element: <Blog /> },
  { path: "活動與文章/:id", element: <BlogDetail /> },
  { path: "活動與文章/search/:keyword", element: <BlogSearch /> },

  // 舊英文路由重導向到中文路由
  { path: "contact", element: <Navigate to="/聯絡我們" replace /> },
  { path: "blog", element: <Navigate to="/活動與文章" replace /> },
  { path: "blog/:id", element: <BlogDetailRedirect /> },
  { path: "blog/search/:keyword", element: <BlogSearchRedirect /> },
];

export default commonRoutes;
