import React, { lazy } from "react";

const Home = lazy(() => import("../pages/Home/Home"));
const Contact = lazy(() => import("../pages/Home/Contact.js"));
const Blog = lazy(() => import("../pages/Home/Blog.js"));
const BlogDetail = lazy(() => import("../pages/Blog/BlogDetail"));
const BlogSearch = lazy(() => import("../pages/Blog/BlogSearch"));

const commonRoutes = [
  { index: true, element: <Home /> },
  { path: "contact", element: <Contact /> },
  { path: "blog", element: <Blog /> },
  { path: "blog/:id", element: <BlogDetail /> },
  { path: "blog/search/:keyword", element: <BlogSearch /> },
];

export default commonRoutes;
