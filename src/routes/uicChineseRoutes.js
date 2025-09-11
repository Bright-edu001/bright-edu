import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const AboutUic = lazy(() => import("../pages/Uic/Uic_school/AboutUic"));
const CareerResources = lazy(() =>
  import("../pages/Uic/Uic_school/CareerResources")
);
const Areas = lazy(() => import("../pages/Uic/Mba/Areas"));
const Advantages = lazy(() => import("../pages/Uic/Mba/Advantages"));
const CoreCourses = lazy(() => import("../pages/Uic/Mba/CoreCourses"));
const FoodAttractions = lazy(() =>
  import("../pages/Uic/Uic_school/Chicago/FoodAttractions")
);
const FAQ = lazy(() => import("../pages/Uic/Uic_school/FAQ"));
const RankingsAwards = lazy(() =>
  import("../pages/Uic/Uic_school/RankingsAwards")
);
const AacsbPage = lazy(() =>
  import("../pages/Uic/Uic_school/Ranking/AacsbPage")
);
const HeedPage = lazy(() => import("../pages/Uic/Uic_school/Ranking/HeedPage"));
const RankingPage = lazy(() =>
  import("../pages/Uic/Uic_school/Ranking/RankingPage")
);
const Management = lazy(() => import("../pages/Uic/Mba/areas/Management"));
const Finance = lazy(() => import("../pages/Uic/Mba/areas/Finance"));
const Analytics = lazy(() => import("../pages/Uic/Mba/areas/Analytics"));
const Marketing = lazy(() => import("../pages/Uic/Mba/areas/Marketing"));
const HRManagement = lazy(() =>
  import("../pages/Uic/Mba/areas/HR-Management.js")
);
const Chicago = lazy(() => import("../pages/Uic/Uic_school/Chicago.js"));
const Economy = lazy(() =>
  import("../pages/Uic/Uic_school/Chicago/Economy.js")
);
const DualDegree = lazy(() => import("../pages/Uic/Mba/DualDegree.js"));
const Application = lazy(() => import("../pages/Uic/Mba/Application.js"));
const MbaPrograms = lazy(() => import("../pages/Uic/Mba/MbaPrograms.js"));
const MSFinance = lazy(() => import("../pages/Uic/Ms/MSFinance.js"));
const MsMarketing = lazy(() => import("../pages/Uic/Ms/MsMarketing.js"));
const MsManagement = lazy(() => import("../pages/Uic/Ms/MsManagement.js"));
const MsAnalttics = lazy(() => import("../pages/Uic/Ms/MsAnalytics.js"));
const MsApplication = lazy(() => import("../pages/Uic/Ms/MsApplication.js"));
const MsInformation = lazy(() => import("../pages/Uic/Ms/MsInformation.js"));
const MsAccounting = lazy(() => import("../pages/Uic/Ms/MsAccounting.js"));
const MsPrograms = lazy(() => import("../pages/Uic/Ms/MsPrograms.js"));

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
  { path: "伊利諾大學芝加哥分校/MBA-Programs/五大領域", element: <Areas /> },
  {
    path: "伊利諾大學芝加哥分校/MBA-Programs/課程優勢",
    element: <Advantages />,
  },
  {
    path: "伊利諾大學芝加哥分校/MBA-Programs/核心課程",
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
    path: "伊利諾大學芝加哥分校/MBA-Programs/五大領域/Management",
    element: <Management />,
  },
  {
    path: "伊利諾大學芝加哥分校/MBA-Programs/五大領域/Finance",
    element: <Finance />,
  },
  {
    path: "伊利諾大學芝加哥分校/MBA-Programs/五大領域/Business Analytics",
    element: <Analytics />,
  },
  {
    path: "伊利諾大學芝加哥分校/MBA-Programs/五大領域/Marketing",
    element: <Marketing />,
  },
  {
    path: "伊利諾大學芝加哥分校/MBA-Programs/五大領域/Human Resource Management",
    element: <HRManagement />,
  },
  {
    path: "伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市",
    element: <Chicago />,
  },
  {
    path: "伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/芝加哥經濟",
    element: <Economy />,
  },
  {
    path: "伊利諾大學芝加哥分校/MBA-Programs/雙碩士銜接課程",
    element: <DualDegree />,
  },
  {
    path: "伊利諾大學芝加哥分校/MBA-Programs/申請資訊",
    element: <Application />,
  },
  { path: "伊利諾大學芝加哥分校/MBA-Programs", element: <MbaPrograms /> },
  { path: "伊利諾大學芝加哥分校/MS-Programs/金融碩士", element: <MSFinance /> },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/行銷碩士",
    element: <MsMarketing />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/供應鏈營運管理碩士",
    element: <MsManagement />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/商業分析碩士",
    element: <MsAnalttics />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/申請資訊",
    element: <MsApplication />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/管理資訊系統碩士",
    element: <MsInformation />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/會計碩士",
    element: <MsAccounting />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/課程介紹",
    element: <MsPrograms />,
  },
  {
    path: "伊利諾大學芝加哥分校/MS-Programs/課程介紹",
    element: (
      <Navigate to="/伊利諾大學芝加哥分校/MS-Programs/課程介紹" replace />
    ),
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
