import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import {
  UIC_MBA_ROUTE_PATHS,
  UIC_SCHOOL_ROUTE_PATHS,
  UIC_SCHOOL_LINKS,
  UIC_MS_ROUTE_PATHS,
  UIC_MS_LINKS,
} from "./publicRoutePaths";

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
    path: UIC_SCHOOL_ROUTE_PATHS.aboutUic,
    element: <AboutUic />,
  },
  {
    path: UIC_SCHOOL_ROUTE_PATHS.careerResources,
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
    path: UIC_SCHOOL_ROUTE_PATHS.chicagoFoodAttractions,
    element: <FoodAttractions />,
  },
  { path: UIC_SCHOOL_ROUTE_PATHS.faq, element: <FAQ /> },
  {
    path: UIC_SCHOOL_ROUTE_PATHS.rankingsAwards,
    element: <RankingsAwards />,
  },
  {
    path: UIC_SCHOOL_ROUTE_PATHS.rankingAacsb,
    element: <AacsbPage />,
  },
  {
    path: UIC_SCHOOL_ROUTE_PATHS.rankingHeed,
    element: <HeedPage />,
  },
  {
    path: UIC_SCHOOL_ROUTE_PATHS.rankingPage,
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
    element: <Navigate to={`/${UIC_MBA_ROUTE_PATHS.analytics}`} replace />,
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
    element: <Navigate to={`/${UIC_MBA_ROUTE_PATHS.humanResource}`} replace />,
  },
  {
    path: UIC_SCHOOL_ROUTE_PATHS.chicago,
    element: <Navigate to={UIC_SCHOOL_LINKS.chicagoCity} replace />,
  },
  {
    path: UIC_SCHOOL_ROUTE_PATHS.chicagoCity,
    element: <ChicagoCity />,
  },
  {
    path: UIC_SCHOOL_ROUTE_PATHS.chicagoEconomy,
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
    path: UIC_MS_ROUTE_PATHS.msFinance,
    element: <MSFinance />,
  },
  {
    path: UIC_MS_ROUTE_PATHS.msMarketing,
    element: <MsMarketing />,
  },
  {
    path: UIC_MS_ROUTE_PATHS.msSupplyChain,
    element: <MsManagement />,
  },
  {
    path: UIC_MS_ROUTE_PATHS.msAnalytics,
    element: <MsAnalytics />,
  },
  {
    path: UIC_MS_ROUTE_PATHS.msApplication,
    element: <MsApplication />,
  },
  {
    path: UIC_MS_ROUTE_PATHS.msMIS,
    element: <MsInformation />,
  },
  {
    path: UIC_MS_ROUTE_PATHS.msAccounting,
    element: <MsAccounting />,
  },
  {
    path: UIC_MS_ROUTE_PATHS.programs,
    element: <MsPrograms />,
  },
  {
    path: UIC_MS_ROUTE_PATHS.root,
    element: <Navigate to={UIC_MS_LINKS.programs} replace />,
  },
  {
    path: UIC_SCHOOL_ROUTE_PATHS.root,
    element: <Navigate to={UIC_SCHOOL_LINKS.aboutUic} replace />,
  },
];

export default uicChineseRoutes;
