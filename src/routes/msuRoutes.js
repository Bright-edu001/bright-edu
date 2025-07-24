import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const MsfApplication = lazy(() => import("../pages/Msu/Msf/MsfApplication.js"));
const MsuMaster = lazy(() => import("../pages/Msu/Msf/MsMaster.js"));
const AboutMsu = lazy(() => import("../pages/Msu/Msu_school/AboutMsu.js"));
const MsRankingsAwards = lazy(() =>
  import("../pages/Msu/Msu_school/RankingsAwards.js")
);
const MsCareerResources = lazy(() =>
  import("../pages/Msu/Msu_school/CareerResources.js")
);
const Michigan = lazy(() => import("../pages/Msu/Msu_school/Michigan.js"));
const Transportation = lazy(() =>
  import("../pages/Msu/Msu_school/Michigan/Transportation.js")
);
const MicFoodAttractions = lazy(() =>
  import("../pages/Msu/Msu_school/Michigan/FoodAttractions.js")
);

const msuRoutes = [
  { path: "msu-business-school/msf/application", element: <MsfApplication /> },
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
  { path: "msu-business-school/msu/east-lansing", element: <Michigan /> },
  {
    path: "msu-business-school/msu/east-lansing/transportation",
    element: <Transportation />,
  },
  {
    path: "msu-business-school/msu/east-lansing/east-lansing-food-attractions",
    element: <MicFoodAttractions />,
  },
  {
    path: "msu-business-school",
    element: <Navigate to="/msu-business-school/msu/about-msu" replace />,
  },
];

export default msuRoutes;
