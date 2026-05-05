import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("../pages/Home/Home"));
const Contact = lazy(() => import("../pages/Home/Contact.jsx"));
const Blog = lazy(() => import("../pages/Home/Blog.jsx"));
const BlogDetail = lazy(() => import("../pages/Blog/BlogDetail"));
const BlogSearch = lazy(() => import("../pages/Blog/BlogSearch"));

const commonRoutes = [
  { index: true, element: <Home /> },
  { path: "contact", element: <Navigate to="/聯絡我們" replace /> },
  { path: "聯絡我們", element: <Contact /> },
  { path: "blog", element: <Blog /> },
  { path: "blog/:slug", element: <BlogDetail /> },
  { path: "blog/search/:keyword", element: <BlogSearch /> },
];

export default commonRoutes;
