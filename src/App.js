import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AboutUic from "./pages/Uic/Uic_school/AboutUic";
import CareerResources from "./pages/Uic/Uic_school/CareerResources";
import Areas from "./pages/Uic/Mba/Areas";
import Advantages from "./pages/Uic/Mba/Advantages";
import CoreCourses from "./pages/Uic/Mba/CoreCourses";
import FoodAttractions from "./pages/Uic/Uic_school/Chicago/FoodAttractions";
import FAQ from "./pages/Uic/Uic_school/FAQ";
import RankingsAwards from "./pages/Uic/Uic_school/RankingsAwards";
import AacsbPage from "./pages/Uic/Uic_school/Ranking/AacsbPage";
import HeedPage from "./pages/Uic/Uic_school/Ranking/HeedPage";
import RankingPage from "./pages/Uic/Uic_school/Ranking/RankingPage";
import Management from "./pages/Uic/Mba/areas/Management";
import Finance from "./pages/Uic/Mba/areas/Finance";
import Analytics from "./pages/Uic/Mba/areas/Analytics";
import Marketing from "./pages/Uic/Mba/areas/Marketing";
import HRManagement from "./pages/Uic/Mba/areas/HR-Management.js";
import Chicago from "./pages/Uic/Uic_school/Chicago.js";
import Economy from "./pages/Uic/Uic_school/Chicago/Economy.js";
import DualDegree from "./pages/Uic/Mba/DualDegree.js";
import Application from "./pages/Uic/Mba/Application.js";
import MSFinance from "./pages/Uic/Ms/MSFinance.js";
import MsMarketing from "./pages/Uic/Ms/MsMarketing.js";
import MsManagement from "./pages/Uic/Ms/MsManagement.js";
import MsAnalttics from "./pages/Uic/Ms/MsAnalytics.js";
import MsApplication from "./pages/Uic/Ms/MsApplication.js";
import MsInformation from "./pages/Uic/Ms/MsInformation.js";
import MsAccounting from "./pages/Uic/Ms/MsAccounting.js";
import MsfApplication from "./pages/Msu/Msf/MsfApplication.js";
import MsuMaster from "./pages/Msu/Msf//MsMaster.js";
import AboutMsu from "./pages/Msu/Msu_school/AboutMsu.js";
import MsRankingsAwards from "./pages/Msu/Msu_school/RankingsAwards.js";
import MsCareerResources from "./pages/Msu/Msu_school/CareerResources.js";
import Michigan from "./pages/Msu/Msu_school/Michigan.js";
import Transportation from "./pages/Msu/Msu_school/Michigan/Transportation.js";
import MicFoodAttractions from "./pages/Msu/Msu_school/Michigan/FoodAttractions.js";
import Contact from "./pages/Home/Contact.js";
import Blog from "./pages/Home/Blog.js";
import BlogDetail from "./pages/Blog/BlogDetail";
import BlogSearch from "./pages/Blog/BlogSearch";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <BrowserRouter>
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
            <Route path="/uic-business-school/mba/areas" element={<Areas />} />
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
            <Route path="/uic-business-school/uic/faq" element={<FAQ />} />
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
            <Route path="/Contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/blog/search/:keyword" element={<BlogSearch />} />
            {/* Add more routes as needed */}
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
}

export default App;
