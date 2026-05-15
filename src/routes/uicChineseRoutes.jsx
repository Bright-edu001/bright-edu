import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import { UIC_MBA_ROUTE_PATHS } from "./publicRoutePaths";

const AboutUic = lazy(() => import("../pages/Uic/Uic_school/AboutUic"));
const CareerResources = lazy(
  () => import("../pages/Uic/Uic_school/CareerResources"),
);
const Areas = lazy(() => import("../pages/Uic/Mba/Areas"));
const Advantages = lazy(() => import("../pages/Uic/Mba/Advantages"));
const CoreCourses = lazy(() => import("../pages/Uic/Mba/CoreCourses"));
const FoodAttractions = lazy(
  () => import("../pages/Uic/Uic_school/Chicago/FoodAttractions"),
);
const FAQ = lazy(() => import("../pages/Uic/Uic_school/FAQ"));
const RankingsAwards = lazy(
  () => import("../pages/Uic/Uic_school/RankingsAwards"),
);
const AacsbPage = lazy(
  () => import("../pages/Uic/Uic_school/Ranking/AacsbPage"),
);
const HeedPage = lazy(() => import("../pages/Uic/Uic_school/Ranking/HeedPage"));
const RankingPage = lazy(
  () => import("../pages/Uic/Uic_school/Ranking/RankingPage"),
);
const Management = lazy(() => import("../pages/Uic/Mba/areas/Management"));
const Finance = lazy(() => import("../pages/Uic/Mba/areas/Finance"));
const Analytics = lazy(() => import("../pages/Uic/Mba/areas/Analytics"));
const Marketing = lazy(() => import("../pages/Uic/Mba/areas/Marketing"));
const HRManagement = lazy(
  () => import("../pages/Uic/Mba/areas/HR-Management.jsx"),
);
const ChicagoCity = lazy(
  () => import("../pages/Uic/Uic_school/Chicago/Chicago.jsx"),
);
const Economy = lazy(
  () => import("../pages/Uic/Uic_school/Chicago/Economy.jsx"),
);
const DualDegree = lazy(() => import("../pages/Uic/Mba/DualDegree.jsx"));
const Application = lazy(() => import("../pages/Uic/Mba/Application.jsx"));
const MbaPrograms = lazy(() => import("../pages/Uic/Mba/MbaPrograms.jsx"));
const MSFinance = lazy(() => import("../pages/Uic/Ms/MSFinance.jsx"));
const MsMarketing = lazy(() => import("../pages/Uic/Ms/MsMarketing.jsx"));
const MsManagement = lazy(() => import("../pages/Uic/Ms/MsManagement.jsx"));
const MsAnalytics = lazy(() => import("../pages/Uic/Ms/MsAnalytics.jsx"));
const MsApplication = lazy(() => import("../pages/Uic/Ms/MsApplication.jsx"));
const MsInformation = lazy(() => import("../pages/Uic/Ms/MsInformation.jsx"));
const MsAccounting = lazy(() => import("../pages/Uic/Ms/MsAccounting.jsx"));
const MsPrograms = lazy(() => import("../pages/Uic/Ms/MsPrograms.jsx"));

// 中文路由配置
const uicChineseRoutes = [
  {
    path: "伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹",
    element: <AboutUic />,
  },
  {
    path: "伊利諾大學芝加哥分校/UIC商學院碩士/職涯資源",
    element: <CareerResources />,
  },
  { path: UIC_MBA_ROUTE_PATHS.areas, element: <Areas /> },
  {
    path: UIC_MBA_ROUTE_PATHS.advantages,
    element: <Advantages />,
  },
  {
    path: UIC_MBA_ROUTE_PATHS.coreCourses,
    element: <CoreCourses />,
  },
  {
    path: "伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/景點與美食",
    element: <FoodAttractions />,
  },
  { path: "伊利諾大學芝加哥分校/UIC商學院碩士/常見問題", element: <FAQ /> },
  {
    path: "伊利諾大學芝加哥分校/UIC商學院碩士/排名與獎項",
    element: <RankingsAwards />,
  },
  {
    path: "伊利諾大學芝加哥分校/UIC商學院碩士/學校資訊/排名/AACSB認證",
    element: <AacsbPage />,
  },
  {
    path: "伊利諾大學芝加哥分校/UIC商學院碩士/學校資訊/排名/HEED獎項",
    element: <HeedPage />,
  },
  {
    path: "伊利諾大學芝加哥分校/UIC商學院碩士/學校資訊/排名/排名",
    element: <RankingPage />,
  },
  {
    path: UIC_MBA_ROUTE_PATHS.management,
    element: <Management />,
  },
  {
    path: UIC_MBA_ROUTE_PATHS.finance,
    element: <Finance />,
  },
  {
    path: UIC_MBA_ROUTE_PATHS.analytics,
    element: <Analytics />,
  },
  {
    path: UIC_MBA_ROUTE_PATHS.analyticsLegacy,
    element: (
      <Navigate
        to={`/${UIC_MBA_ROUTE_PATHS.analytics}`}
        replace
      />
    ),
  },
  {
    path: UIC_MBA_ROUTE_PATHS.marketing,
    element: <Marketing />,
  },
  {
    path: UIC_MBA_ROUTE_PATHS.humanResource,
    element: <HRManagement />,
  },
  {
    path: UIC_MBA_ROUTE_PATHS.humanResourceLegacy,
    element: (
      <Navigate
        to={`/${UIC_MBA_ROUTE_PATHS.humanResource}`}
        replace
      />
    ),
  },
  {
    path: "伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市",
    element: (
      <Navigate
        to="/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/Chicago-city"
        replace
      />
    ),
  },
  {
    path: "伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/Chicago-city",
    element: <ChicagoCity />,
  },
  {
    path: "伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/芝加哥經濟",
    element: <Economy />,
  },
  {
    path: UIC_MBA_ROUTE_PATHS.dualDegree,
    element: <DualDegree />,
  },
  {
    path: UIC_MBA_ROUTE_PATHS.application,
    element: <Application />,
  },
  { path: UIC_MBA_ROUTE_PATHS.programs, element: <MbaPrograms /> },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/MS-in-Finance-MSF",
    element: <MSFinance />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/MS-in-Marketing-MSM",
    element: <MsMarketing />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/MS-in-Supply-Chain-and-Operation-Management-MSSCOM",
    element: <MsManagement />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/MS-in-Business-Analytics-MSBA",
    element: <MsAnalytics />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/申請資訊",
    element: <MsApplication />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/MS-in-Management-Information-Systems-MSMIS",
    element: <MsInformation />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/MS-in-Accounting-MSA",
    element: <MsAccounting />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/課程介紹",
    element: <MsPrograms />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs",
    element: (
      <Navigate to="/伊利諾大學芝加哥分校/MS-Programs/課程介紹" replace />
    ),
  },
  {
    path: "伊利諾大學芝加哥分校",
    element: (
      <Navigate to="/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹" replace />
    ),
  },
];

export default uicChineseRoutes;
