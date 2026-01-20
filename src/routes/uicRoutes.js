import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
const UrlRedirect = lazy(() => import("../components/UrlRedirect"));

const uicRoutes = [
  { path: "uic-business-school/uic/about-uic", element: <UrlRedirect /> },
  {
    path: "uic-business-school/uic/career-resources",
    element: <UrlRedirect />,
  },
  { path: "uic-business-school/mba/areas", element: <UrlRedirect /> },
  { path: "uic-business-school/mba/advantages", element: <UrlRedirect /> },
  { path: "uic-business-school/mba/core-courses", element: <UrlRedirect /> },
  {
    path: "uic-business-school/uic/chicago/food-attractions",
    element: <UrlRedirect />,
  },
  {
    path: "uic-business-school/uic/chicago/chicago-city",
    element: <UrlRedirect />,
  },
  { path: "uic-business-school/uic/faq", element: <UrlRedirect /> },
  {
    path: "uic-business-school/uic/rankings-awards",
    element: <UrlRedirect />,
  },
  {
    path: "uic-business-school/uic/uic_school/ranking/aacsb",
    element: <UrlRedirect />,
  },
  {
    path: "uic-business-school/uic/uic_school/ranking/heed",
    element: <UrlRedirect />,
  },
  {
    path: "uic-business-school/uic/uic_school/ranking/ranking",
    element: <UrlRedirect />,
  },
  {
    path: "uic-business-school/mba/areas/management",
    element: <UrlRedirect />,
  },
  { path: "uic-business-school/mba/areas/finance", element: <UrlRedirect /> },
  { path: "uic-business-school/mba/areas/analytics", element: <UrlRedirect /> },
  { path: "uic-business-school/mba/areas/marketing", element: <UrlRedirect /> },
  {
    path: "uic-business-school/mba/areas/human-resource",
    element: <UrlRedirect />,
  },
  { path: "uic-business-school/uic/chicago", element: <UrlRedirect /> },
  { path: "uic-business-school/uic/chicago/economy", element: <UrlRedirect /> },
  { path: "uic-business-school/mba/dual-degree", element: <UrlRedirect /> },
  { path: "uic-business-school/mba/application", element: <UrlRedirect /> },
  { path: "uic-business-school/mba", element: <UrlRedirect /> },
  {
    path: "uic-business-school/ms/MS-in-Finance-MSF",
    element: <UrlRedirect />,
  },
  {
    path: "uic-business-school/ms/MS-in-Marketing-MSM",
    element: <UrlRedirect />,
  },
  {
    path: "uic-business-school/ms/MS-in-Supply-Chain-and-Operation-Management-MSSCOM",
    element: <UrlRedirect />,
  },
  {
    path: "uic-business-school/ms/MS-in-Business-Analytics-MSBA",
    element: <UrlRedirect />,
  },
  { path: "uic-business-school/ms/application", element: <UrlRedirect /> },
  {
    path: "uic-business-school/ms/MS-in-Management-Information-Systems-MSMIS",
    element: <UrlRedirect />,
  },
  {
    path: "uic-business-school/ms/MS-in-Accounting-MSA",
    element: <UrlRedirect />,
  },
  {
    path: "uic-business-school/ms/msprograms",
    element: <UrlRedirect />,
  },
  {
    path: "uic-business-school/ms/programs",
    element: <Navigate to="/伊利諾大學芝加哥分校/碩士課程/課程介紹" replace />,
  },
  {
    path: "uic-business-school/ms",
    element: <Navigate to="/伊利諾大學芝加哥分校/碩士課程/課程介紹" replace />,
  },
  {
    path: "uic-business-school",
    element: (
      <Navigate to="/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹" replace />
    ),
  },
];

export default uicRoutes;
