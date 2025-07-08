import React from "react";
import { Table } from "antd";
import "antd/dist/reset.css";
import "./CoreCourses.css";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

const coreCoursesData = [
  {
    key: 1,
    title: "財務會計導論\nIntroduction to Financial Accounting",
    desc: "財務會計: 編制和評估內外部財務報告和財務報表，學習財務會計重要基本概念和會計原則，學習專業財務會計相關使用字詞及會計知識運用，學習如何透過財務會計看懂公司營運，會計資訊可以提供經營管理、投資決策、稅務申報等，了解會計知識對企業成功的影響力。",
  },
  {
    key: 2,
    title: "商業決策的微觀經濟學\nMicroeconomics",
    desc: "以基本經濟學為指導知識重點，市場需求與供給，如何影響個人經濟，達成經濟交易，並形成市場中的均衡價格。了解消費者、營利性和非營利性公司以及政府對資源的有效經濟配置，學習市場壟斷和不完全競爭等各種可能的經濟情況、另有商業道德和市場、效率與公平、社會福利對經濟案例相關探討。",
  },
  {
    key: 3,
    title: "公司財務概論\nIntroduction to Corporate Finance",
    desc: "公司財務理論：公司目標、貨幣時間價值、投資決策（在確定性和不確定性下）、淨現值、資本市場和公司融資決策之間的關係；還有財務方面的盈利比率等的基本公式計算和表達，及其他相關的財務重要運算還有影響企業經營的相關專業知識，提升學生對財務理論的敏感度及知識力。",
  },
  {
    key: 4,
    title: "運營管理概論\nIntroduction to Operations Management",
    desc: "運營管理是對業務實踐的管理，以在組織內創造最高水平的效率。商品和交付貨物及服務的運營過程管理，主題包括項目管理、生產、供應鏈、庫存和質量，了解企業整體的每一個環節運作上的管理，用最有效的方式控制生產過程和業務運營，提高利潤及效率。",
  },
  {
    key: 5,
    title: "組織行為\nOrganizational Behavior",
    desc: "組織為一個社會系統，學習組織行為是相當重要的管理知識。課程主題包括領導力、人際效率、群體行為、管理變革、衝突管理、動機和行為以及人際溝通，學習了解組織行為及如何運用適當的管理決策，讓組織行為產生變化；或是透過組織行為，擬定對應的管理模式。",
  },
  {
    key: 6,
    title: "市場營銷概論\nIntroduction to Marketing",
    desc: "學習行銷組合、市場分析等等行銷知識，並了解市場的各種影響因素，客戶/消費者行為以及公司商品和服務的規劃、促銷和分銷、甚至通路選擇，因而產生各種市場情況，再透過報告及實際案例分析學習實務行銷知識。/消費者行為以及公司商品和服務的規劃、促銷和分銷、甚至通路選擇，因而產生各種市場情況，再透過報告及實際案例分析學習實務行銷知識。",
  },
  {
    key: 7,
    title: "企業戰略\nEnterprise Strategy",
    desc: "提供體系結構和決策工具，將先前的課程與知識整合在一組，進而分析和解決問題，努力解決公司的戰略和企業層面的挑戰，學習如何擬定正確策略適當應對市場情況。",
  },
];

const columns = [
  {
    title: <span className="core-table-title">課程名稱</span>,
    dataIndex: "title",
    key: "title",
    render: (text) => <span className="core-table-title-value">{text}</span>,
    width: 260,
  },
  {
    title: <span className="core-table-desc">課程說明</span>,
    dataIndex: "desc",
    key: "desc",
    render: (text) => <span className="core-table-desc-value">{text}</span>,
  },
];

function CoreCourses() {
  return (
    <div className="mba-courses-page">
      <MbaAreasHero />
      <SectionContainer className="courses-content">
        <h3 className="intro-title">核心課程</h3>
        <p className="intro">
          核心課程中包括七門必修課程，課程內容涵蓋商業學科的基本知識。以下是各課程的簡要說明:
        </p>
        <Table
          columns={columns}
          dataSource={coreCoursesData}
          pagination={false}
          bordered
          style={{ background: "transparent", marginBottom: "2rem" }}
        />
      </SectionContainer>
      <SectionContainer className="courses-class">
        <div className="course">
          <h3>MBA核心課程 - 26學分</h3>
          <ul>
            <li>
              ACTG 500 Introduction to Financial Accounting (4) 財務會計導論
            </li>
            <li>ECON 520 Microeconomics (4) 商業決策的微觀經濟學</li>
            <li>FIN 500 Introduction to Corporate Finance (4) 公司財務概論</li>
            <li>
              IDS 532 Introduction to Operations Management (4) 運營管理概論
            </li>
            <li>MGMT 541 Organizational Behavior (4) 組織行為</li>
            <li>MKTG 500 Introduction to Marketing (4) 市場營銷概論</li>
            <li>MBA 570 Enterprise Strategy (2) 企業戰略</li>
          </ul>
        </div>
      </SectionContainer>
    </div>
  );
}

export default CoreCourses;
