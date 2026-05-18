import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import {
  MSU_SCHOOL_ROUTE_PATHS,
  MSU_SCHOOL_LINKS,
  MSU_MSF_ROUTE_PATHS,
} from "./publicRoutePaths";

const MsfApplication = lazy(
  () => import("../pages/Msu/Msf/MsfApplication.jsx"),
);
const MsuMaster = lazy(() => import("../pages/Msu/Msf/MsMaster.jsx"));
const AboutMsu = lazy(() => import("../pages/Msu/Msu_school/AboutMsu.jsx"));
const MsRankingsAwards = lazy(
  () => import("../pages/Msu/Msu_school/RankingsAwards.jsx"),
);
const MsCareerResources = lazy(
  () => import("../pages/Msu/Msu_school/CareerResources.jsx"),
);
const Michigan = lazy(() => import("../pages/Msu/Msu_school/Michigan.jsx"));
const Transportation = lazy(
  () => import("../pages/Msu/Msu_school/Michigan/Transportation.jsx"),
);
const MicFoodAttractions = lazy(
  () => import("../pages/Msu/Msu_school/Michigan/FoodAttractions.jsx"),
);

// MSU 中文路由配置
const msuChineseRoutes = [
  { path: MSU_MSF_ROUTE_PATHS.msfApplication, element: <MsfApplication /> },
  { path: MSU_MSF_ROUTE_PATHS.msfMaster, element: <MsuMaster /> },
  { path: MSU_SCHOOL_ROUTE_PATHS.aboutMsu, element: <AboutMsu /> },
  {
    path: MSU_SCHOOL_ROUTE_PATHS.rankingsAwards,
    element: <MsRankingsAwards />,
  },
  {
    path: MSU_SCHOOL_ROUTE_PATHS.careerResources,
    element: <MsCareerResources />,
  },
  { path: MSU_SCHOOL_ROUTE_PATHS.michigan, element: <Michigan /> },
  {
    path: MSU_SCHOOL_ROUTE_PATHS.michiganTransportation,
    element: <Transportation />,
  },
  {
    path: MSU_SCHOOL_ROUTE_PATHS.michiganFoodAttractions,
    element: <MicFoodAttractions />,
  },
  {
    // legacy redirect — path kept hard-coded intentionally
    path: "密西根州立大學/MSU商學院/MSU學校介紹",
    element: <Navigate to={MSU_SCHOOL_LINKS.aboutMsu} replace />,
  },
  {
    path: MSU_SCHOOL_ROUTE_PATHS.root,
    element: <Navigate to={MSU_SCHOOL_LINKS.aboutMsu} replace />,
  },
];

export default msuChineseRoutes;
