import React from "react";
// import "./MS.scss"; // Commented out
import "./MsApplication.scss";
import ApplicationForm from "../../../components/Application/ApplicationForm";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";

// Import styled components as needed. For now, assuming only PageP might be relevant if h3/h4/ul are styled globally or via MsApplication.scss
import { PageP } from "./MS.styles";

function MsApplication() {
  return (
    <div className="ms-application-page">
      <MbaAreasHero />
      <SectionContainer>
        <div className="ms-application-intro">
          {/* Assuming h3 is styled by MsApplication.scss or globally */}
          <h3>申請資訊</h3>
          <PageP>
            {" "}
            {/* Using PageP for the paragraph */}
            申請者將根據個別情況進行審核。除了研究生學院的基本要求之外，申請者還必須滿足以下課程要求：
          </PageP>
        </div>
        <section className="ms-application-requirements">
          {/* Assuming h4 and ul are styled by MsApplication.scss or globally */}
          <h4>最低學歷要求</h4>
          <PageP>需具備學士學位（Bachelor's degree）</PageP>

          <h4>平均成績要求（GPA）</h4>
          <ul>
            <li>
              大學最後60學期學分（90 季度學分）需保持至少 3.00/4.00的 GPA。
            </li>
            <li>
              若申請者已獲得碩士學位，其碩士課程的GPA也需維持至少 3.00/4.00。
            </li>
          </ul>

          <h4>英語語言能力要求</h4>
          <PageP>申請者必須滿足以下任一英語能力考試的最低標準:</PageP>
          <div className="english-requirements">
            <div>
              <strong>TOEFL iBT：總分 80，各部分最低分數：</strong>
              <ul className="horizontal-list">
                <li>閱讀 (Reading) ≥ 19</li>
                <li>聽力 (Listening) ≥ 17</li>
                <li>口說 (Speaking) ≥ 20</li>
                <li>寫作 (Writing) ≥ 21</li>
              </ul>
            </div>
            <div>
              <strong>IELTS Academic：</strong>總分 6.5，且四個部分分數不低於6.0
            </div>
            <div>
              <strong>PTE Academic：</strong>總分 54，各部分分數低於標準：
              <ul className="horizontal-list">
                <li>閱讀 (Reading) ≥ 51</li>
                <li>聽力 (Listening) ≥ 47</li>
                <li>口說 (Speaking) ≥ 53</li>
                <li>寫作 (Writing) ≥ 56</li>
              </ul>
            </div>
          </div>

          <h4>推薦信</h4>
          <PageP>需提交2封推薦信</PageP>

          <h4>文件要求</h4>
          <ul>
            <li>CV/履歷（Resume）</li>
            <li>個人陳述（Personal Statement）</li>
          </ul>

          <div className="reminder">
            確保提交完整且符合要求的文件，以提升錄取機會！
          </div>
        </section>
        <ApplicationForm />
      </SectionContainer>

      {/* 申請表單 */}
    </div>
  );
}

export default MsApplication;
