import React, { useEffect, Suspense, lazy } from "react";
import { BlogProvider } from "./context/BlogContext";
import { SearchProvider } from "./context/SearchContext";
import { NavProvider } from "./context/NavContext";
import "./App.css";

// components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FloatingButtons from "./components/FloatingButtons/FloatingButtons";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// react-router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// 載入指示器組件
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
      fontSize: "1.2rem",
      color: "#c71432",
    }}
  >
    <div
      className="loading-skeleton"
      style={{
        width: "200px",
        height: "20px",
        borderRadius: "4px",
      }}
    >
      載入中...
    </div>
  </div>
);

// pages - Home & Blog - 修改：使用 React.lazy 動態匯入
const Home = lazy(() => import("./pages/Home/Home"));
const Contact = lazy(() => import("./pages/Home/Contact.js"));
const Blog = lazy(() => import("./pages/Home/Blog.js"));
const BlogDetail = lazy(() => import("./pages/Blog/BlogDetail"));
const BlogSearch = lazy(() => import("./pages/Blog/BlogSearch"));

// pages - UIC - 修改：使用 React.lazy 動態匯入
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
const MsAnalttics = lazy(() => import("./pages/Uic/Ms/MsAnalytics.js")); // 修正錯字 MsAnalytics
const MsApplication = lazy(() => import("./pages/Uic/Ms/MsApplication.js"));
const MsInformation = lazy(() => import("./pages/Uic/Ms/MsInformation.js"));
const MsAccounting = lazy(() => import("./pages/Uic/Ms/MsAccounting.js"));

// pages - MSU - 修改：使用 React.lazy 動態匯入
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

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      window.history.replaceState({}, "", redirect);
    }
  }, []);
  return (
    <Router>
      <NavProvider>
        <BlogProvider>
          <SearchProvider>
            <ErrorBoundary>
              <div className="App">
                <Header />
                <main className="main-content">
                  {/* 修改：使用 Suspense 包裹 Routes */}
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/uic-business-school/uic/about-uic"
                        element={<AboutUic />}
                      />
                      <Route
                        path="/uic-business-school/uic/career-resources"
                        element={<CareerResources />}
                      />
                      <Route
                        path="/uic-business-school/mba/areas"
                        element={<Areas />}
                      />
                      <Route
                        path="/uic-business-school/mba/advantages"
                        element={<Advantages />}
                      />
                      <Route
                        path="/uic-business-school/mba/core-courses"
                        element={<CoreCourses />}
                      />
                      <Route
                        path="/uic-business-school/uic/chicago/food-attractions"
                        element={<FoodAttractions />}
                      />
                      <Route
                        path="/uic-business-school/uic/faq"
                        element={<FAQ />}
                      />
                      <Route
                        path="/uic-business-school/uic/rankings-awards"
                        element={<RankingsAwards />}
                      />
                      <Route
                        path="/uic-business-school/uic/uic_school/ranking/aacsb"
                        element={<AacsbPage />}
                      />
                      <Route
                        path="/uic-business-school/uic/uic_school/ranking/heed"
                        element={<HeedPage />}
                      />
                      <Route
                        path="/uic-business-school/uic/uic_school/ranking/ranking"
                        element={<RankingPage />}
                      />
                      <Route
                        path="/uic-business-school/mba/areas/management"
                        element={<Management />}
                      />
                      <Route
                        path="/uic-business-school/mba/areas/finance"
                        element={<Finance />}
                      />
                      <Route
                        path="/uic-business-school/mba/areas/analytics"
                        element={<Analytics />}
                      />
                      <Route
                        path="/uic-business-school/mba/areas/marketing"
                        element={<Marketing />}
                      />
                      <Route
                        path="/uic-business-school/mba/areas/human-resource"
                        element={<HRManagement />}
                      />
                      <Route
                        path="/uic-business-school/uic/chicago"
                        element={<Chicago />}
                      />
                      <Route
                        path="/uic-business-school/uic/chicago/economy"
                        element={<Economy />}
                      />
                      <Route
                        path="/uic-business-school/mba/dual-degree"
                        element={<DualDegree />}
                      />
                      <Route
                        path="/uic-business-school/mba/application"
                        element={<Application />}
                      />
                      <Route
                        path="/uic-business-school/ms/finance"
                        element={<MSFinance />}
                      />
                      <Route
                        path="/uic-business-school/ms/marketing"
                        element={<MsMarketing />}
                      />
                      <Route
                        path="/uic-business-school/ms/supply-chain-operation-management"
                        element={<MsManagement />}
                      />
                      <Route
                        path="/uic-business-school/ms/business-analytics"
                        element={<MsAnalttics />}
                      />
                      <Route
                        path="/uic-business-school/ms/application"
                        element={<MsApplication />}
                      />
                      <Route
                        path="/uic-business-school/ms/management-information-systems"
                        element={<MsInformation />}
                      />
                      <Route
                        path="/uic-business-school/ms/accounting"
                        element={<MsAccounting />}
                      />
                      <Route
                        path="/msu-business-school/msf/application"
                        element={<MsfApplication />}
                      />
                      <Route
                        path="/msu-business-school/msf/master"
                        element={<MsuMaster />}
                      />
                      <Route
                        path="/msu-business-school/msu/about-msu"
                        element={<AboutMsu />}
                      />
                      <Route
                        path="/msu-business-school/msu/rankings-awards"
                        element={<MsRankingsAwards />}
                      />
                      <Route
                        path="/msu-business-school/msu/career-resources"
                        element={<MsCareerResources />}
                      />
                      <Route
                        path="/msu-business-school/msu/east-lansing"
                        element={<Michigan />}
                      />
                      <Route
                        path="/msu-business-school/msu/east-lansing/transportation"
                        element={<Transportation />}
                      />
                      <Route
                        path="/msu-business-school/msu/east-lansing/east-lansing-food-attractions"
                        element={<MicFoodAttractions />}
                      />
                      <Route
                        path="/uic-business-school"
                        element={
                          <Navigate
                            to="/uic-business-school/uic/about-uic"
                            replace
                          />
                        }
                      />
                      <Route
                        path="/msu-business-school"
                        element={
                          <Navigate
                            to="/msu-business-school/msu/about-msu"
                            replace
                          />
                        }
                      />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogDetail />} />
                      <Route
                        path="/blog/search/:keyword"
                        element={<BlogSearch />}
                      />{" "}
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
            </ErrorBoundary>
            <FloatingButtons />
          </SearchProvider>
        </BlogProvider>
      </NavProvider>
    </Router>
  );
}

export default App;
