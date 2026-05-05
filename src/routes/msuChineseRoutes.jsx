import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const MsfApplication = lazy(() => import("../pages/Msu/Msf/MsfApplication.jsx"));
const MsuMaster = lazy(() => import("../pages/Msu/Msf/MsMaster.jsx"));
const AboutMsu = lazy(() => import("../pages/Msu/Msu_school/AboutMsu.jsx"));
const MsRankingsAwards = lazy(() =>
  import("../pages/Msu/Msu_school/RankingsAwards.jsx")
);
const MsCareerResources = lazy(() =>
  import("../pages/Msu/Msu_school/CareerResources.jsx")
);
const Michigan = lazy(() => import("../pages/Msu/Msu_school/Michigan.jsx"));
const Transportation = lazy(() =>
  import("../pages/Msu/Msu_school/Michigan/Transportation.jsx")
);
const MicFoodAttractions = lazy(() =>
  import("../pages/Msu/Msu_school/Michigan/FoodAttractions.jsx")
);

// MSU 中文路由配置
const msuChineseRoutes = [
  { path: "密西根州立大學/金融碩士課程/申請資訊", element: <MsfApplication /> },
  { path: "密西根州立大學/金融碩士課程/MSF金融碩士", element: <MsuMaster /> },
  { path: "密西根州立大學/MSU商學院/學校介紹", element: <AboutMsu /> },
  {
    path: "密西根州立大學/MSU商學院/排名與獎項",
    element: <MsRankingsAwards />,
  },
  {
    path: "密西根州立大學/MSU商學院/職涯資源",
    element: <MsCareerResources />,
  },
  { path: "密西根州立大學/MSU商學院/東蘭辛市", element: <Michigan /> },
  {
    path: "密西根州立大學/MSU商學院/東蘭辛市/交通",
    element: <Transportation />,
  },
  {
    path: "密西根州立大學/MSU商學院/東蘭辛市/景點與美食",
    element: <MicFoodAttractions />,
  },
  {
    path: "密西根州立大學/MSU商學院/MSU學校介紹",
    element: <Navigate to="/密西根州立大學/MSU商學院/學校介紹" replace />,
  },
  {
    path: "密西根州立大學",
    element: <Navigate to="/密西根州立大學/MSU商學院/學校介紹" replace />,
  },
];

export default msuChineseRoutes;
