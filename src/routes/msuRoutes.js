import React from "react";
import { Navigate } from "react-router-dom";
import UrlRedirect from "../components/UrlRedirect";

const msuRoutes = [
  { path: "msu-business-school/msf/application", element: <UrlRedirect /> },
  { path: "msu-business-school/msf/master", element: <UrlRedirect /> },
  { path: "msu-business-school/msu/about-msu", element: <UrlRedirect /> },
  {
    path: "msu-business-school/msu/rankings-awards",
    element: <UrlRedirect />,
  },
  {
    path: "msu-business-school/msu/career-resources",
    element: <UrlRedirect />,
  },
  { path: "msu-business-school/msu/east-lansing", element: <UrlRedirect /> },
  {
    path: "msu-business-school/msu/east-lansing/transportation",
    element: <UrlRedirect />,
  },
  {
    path: "msu-business-school/msu/east-lansing/east-lansing-food-attractions",
    element: <UrlRedirect />,
  },
  {
    path: "msu-business-school",
    element: <Navigate to="/密西根州立大學/MSU商學院/學校介紹" replace />,
  },
];

export default msuRoutes;
