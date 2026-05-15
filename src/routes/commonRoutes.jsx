import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import {
  BlogDetailRouteElement,
  BlogRouteElement,
  BlogSearchRouteElement,
} from "./BlogRouteBoundaries";
import { COMMON_ROUTE_PATHS } from "./publicRoutePaths";

const Home = lazy(() => import("../pages/Home/Home"));
const Contact = lazy(() => import("../pages/Home/Contact.jsx"));
const Blog = lazy(() => import("../pages/Home/Blog.jsx"));
const BlogDetail = lazy(() => import("../pages/Blog/BlogDetail"));
const BlogSearch = lazy(() => import("../pages/Blog/BlogSearch"));

const commonRoutes = [
  { index: true, element: <Home /> },
  {
    path: COMMON_ROUTE_PATHS.contactRedirect,
    element: <Navigate to={COMMON_ROUTE_PATHS.contactLink} replace />,
  },
  { path: COMMON_ROUTE_PATHS.contact, element: <Contact /> },
  { path: COMMON_ROUTE_PATHS.blog, element: <BlogRouteElement Component={Blog} /> },
  {
    path: COMMON_ROUTE_PATHS.blogDetail,
    element: <BlogDetailRouteElement Component={BlogDetail} />,
  },
  {
    path: COMMON_ROUTE_PATHS.blogSearch,
    element: <BlogSearchRouteElement Component={BlogSearch} />,
  },
];

export default commonRoutes;
