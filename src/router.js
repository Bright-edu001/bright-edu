import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "./App";

// pages - Home & Blog
const Home = lazy(() => import("./pages/Home/Home"));
const Contact = lazy(() => import("./pages/Home/Contact.js"));
const Blog = lazy(() => import("./pages/Home/Blog.js"));
const BlogDetail = lazy(() => import("./pages/Blog/BlogDetail"));
const BlogSearch = lazy(() => import("./pages/Blog/BlogSearch"));

// pages - UIC
const AboutUic = lazy(() => import("./pages/Uic/Uic_school/AboutUic"));
const CareerResources = lazy(() =>
  import("./pages/Uic/Uic_school/CareerResources")
);
const Areas = lazy(() => import("./pages/Uic/Mba/Areas"));
const Advantages = lazy(() => import("./pages/Uic/Mba/Advantages"));
const CoreCourses = lazy(() => import("./pages/Uic/Mba/CoreCourses"));
const FoodAttractions = lazy(() =>
  import("./pages/Uic/Uic_school/Chicago/FoodAttractions")
);
const FAQ = lazy(() => import("./pages/Uic/Uic_school/FAQ"));
const RankingsAwards = lazy(() =>
  import("./pages/Uic/Uic_school/RankingsAwards")
);
const AacsbPage = lazy(() =>
  import("./pages/Uic/Uic_school/Ranking/AacsbPage")
);
const HeedPage = lazy(() => import("./pages/Uic/Uic_school/Ranking/HeedPage"));
const RankingPage = lazy(() =>
  import("./pages/Uic/Uic_school/Ranking/RankingPage")
);
const Management = lazy(() => import("./pages/Uic/Mba/areas/Management"));
const Finance = lazy(() => import("./pages/Uic/Mba/areas/Finance"));
const Analytics = lazy(() => import("./pages/Uic/Mba/areas/Analytics"));
const Marketing = lazy(() => import("./pages/Uic/Mba/areas/Marketing"));
const HRManagement = lazy(() =>
  import("./pages/Uic/Mba/areas/HR-Management.js")
);
const Chicago = lazy(() => import("./pages/Uic/Uic_school/Chicago.js"));
const Economy = lazy(() => import("./pages/Uic/Uic_school/Chicago/Economy.js"));
const DualDegree = lazy(() => import("./pages/Uic/Mba/DualDegree.js"));
const Application = lazy(() => import("./pages/Uic/Mba/Application.js"));
const MSFinance = lazy(() => import("./pages/Uic/Ms/MSFinance.js"));
const MsMarketing = lazy(() => import("./pages/Uic/Ms/MsMarketing.js"));
const MsManagement = lazy(() => import("./pages/Uic/Ms/MsManagement.js"));
const MsAnalttics = lazy(() => import("./pages/Uic/Ms/MsAnalytics.js"));
const MsApplication = lazy(() => import("./pages/Uic/Ms/MsApplication.js"));
const MsInformation = lazy(() => import("./pages/Uic/Ms/MsInformation.js"));
const MsAccounting = lazy(() => import("./pages/Uic/Ms/MsAccounting.js"));

// pages - MSU
const MsfApplication = lazy(() => import("./pages/Msu/Msf/MsfApplication.js"));
const MsuMaster = lazy(() => import("./pages/Msu/Msf/MsMaster.js"));
const AboutMsu = lazy(() => import("./pages/Msu/Msu_school/AboutMsu.js"));
const MsRankingsAwards = lazy(() =>
  import("./pages/Msu/Msu_school/RankingsAwards.js")
);
const MsCareerResources = lazy(() =>
  import("./pages/Msu/Msu_school/CareerResources.js")
);
const Michigan = lazy(() => import("./pages/Msu/Msu_school/Michigan.js"));
const Transportation = lazy(() =>
  import("./pages/Msu/Msu_school/Michigan/Transportation.js")
);
const MicFoodAttractions = lazy(() =>
  import("./pages/Msu/Msu_school/Michigan/FoodAttractions.js")
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "uic-business-school/uic/about-uic",
          element: <AboutUic />,
        },
        {
          path: "uic-business-school/uic/career-resources",
          element: <CareerResources />,
        },
        { path: "uic-business-school/mba/areas", element: <Areas /> },
        { path: "uic-business-school/mba/advantages", element: <Advantages /> },
        {
          path: "uic-business-school/mba/core-courses",
          element: <CoreCourses />,
        },
        {
          path: "uic-business-school/uic/chicago/food-attractions",
          element: <FoodAttractions />,
        },
        { path: "uic-business-school/uic/faq", element: <FAQ /> },
        {
          path: "uic-business-school/uic/rankings-awards",
          element: <RankingsAwards />,
        },
        {
          path: "uic-business-school/uic/uic_school/ranking/aacsb",
          element: <AacsbPage />,
        },
        {
          path: "uic-business-school/uic/uic_school/ranking/heed",
          element: <HeedPage />,
        },
        {
          path: "uic-business-school/uic/uic_school/ranking/ranking",
          element: <RankingPage />,
        },
        {
          path: "uic-business-school/mba/areas/management",
          element: <Management />,
        },
        { path: "uic-business-school/mba/areas/finance", element: <Finance /> },
        {
          path: "uic-business-school/mba/areas/analytics",
          element: <Analytics />,
        },
        {
          path: "uic-business-school/mba/areas/marketing",
          element: <Marketing />,
        },
        {
          path: "uic-business-school/mba/areas/human-resource",
          element: <HRManagement />,
        },
        { path: "uic-business-school/uic/chicago", element: <Chicago /> },
        {
          path: "uic-business-school/uic/chicago/economy",
          element: <Economy />,
        },
        {
          path: "uic-business-school/mba/dual-degree",
          element: <DualDegree />,
        },
        {
          path: "uic-business-school/mba/application",
          element: <Application />,
        },
        { path: "uic-business-school/ms/finance", element: <MSFinance /> },
        { path: "uic-business-school/ms/marketing", element: <MsMarketing /> },
        {
          path: "uic-business-school/ms/supply-chain-operation-management",
          element: <MsManagement />,
        },
        {
          path: "uic-business-school/ms/business-analytics",
          element: <MsAnalttics />,
        },
        {
          path: "uic-business-school/ms/application",
          element: <MsApplication />,
        },
        {
          path: "uic-business-school/ms/management-information-systems",
          element: <MsInformation />,
        },
        {
          path: "uic-business-school/ms/accounting",
          element: <MsAccounting />,
        },
        {
          path: "msu-business-school/msf/application",
          element: <MsfApplication />,
        },
        { path: "msu-business-school/msf/master", element: <MsuMaster /> },
        { path: "msu-business-school/msu/about-msu", element: <AboutMsu /> },
        {
          path: "msu-business-school/msu/rankings-awards",
          element: <MsRankingsAwards />,
        },
        {
          path: "msu-business-school/msu/career-resources",
          element: <MsCareerResources />,
        },
        {
          path: "msu-business-school/msu/east-lansing",
          element: <Michigan />,
        },
        {
          path: "msu-business-school/msu/east-lansing/transportation",
          element: <Transportation />,
        },
        {
          path: "msu-business-school/msu/east-lansing/east-lansing-food-attractions",
          element: <MicFoodAttractions />,
        },
        {
          path: "uic-business-school",
          element: <Navigate to="/uic-business-school/uic/about-uic" replace />,
        },
        {
          path: "msu-business-school",
          element: <Navigate to="/msu-business-school/msu/about-msu" replace />,
        },
        { path: "contact", element: <Contact /> },
        { path: "blog", element: <Blog /> },
        { path: "blog/:id", element: <BlogDetail /> },
        { path: "blog/search/:keyword", element: <BlogSearch /> },
      ],
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
