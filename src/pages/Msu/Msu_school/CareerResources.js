import React from "react";
import "./CareerResources.scss";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

function MsCareerResources() {
  return (
    <div className="career-resources-page">
      <MbaAreasHero />
      <SectionContainer>
        <section className="career-resources">
          <h3>職涯管理中心</h3>
          <h4>The Russell Palmer Career Management Center</h4>
          <p>
            Russell Palmer 職涯管理中心隸屬於 Broad 商學院，為 MBA
            及專業碩士（Specialty Master’s）學生
            提供世界級的職涯指導與規劃。我們的使命是幫助學生建立完整的求職策略，將職業目標轉化為現實。
          </p>
        </section>
        <section className="career-services">
          <h3>提供的服務與資源 | Services and Resources Offered</h3>
          <h4>一對一職涯諮詢 | One-on-One Career Advising</h4>
          <p>
            每位 Broad
            商學院碩士生都將獲得專屬職涯顧問，依據學生的專業背景、職涯目標與職能興趣提供個人化支持，包括：
          </p>
          <ul className="career-services-list">
            <li>
              探索職涯選擇與目標設定（Exploring career options and establishing
              goals）
            </li>
            <li>履歷與求職信修改（Resume and cover letter review）</li>
            <li>模擬面試（Mock interviews）</li>
            <li>
              工作機會管理與薪資談判（Job offer management and negotiation）
            </li>
          </ul>
          <h4>職涯管理課程 | Career Management Coursework</h4>
          <p>
            透過講座、業界專業人士座談、工作坊及學分制職涯管理課程（僅適用於全日制
            MBA），幫助學生掌握求職技巧。這些內容將在
            新生迎新活動（Orientation） 及學期間持續進行，涵蓋：
          </p>
          <ul className="career-services-list">
            <li>
              校內及校外求職策略（Navigating on-campus and off-campus job
              searches）
            </li>
            <li>個人職業價值定位（Developing a personal value proposition）</li>
            <li>
              履歷、求職信與 LinkedIn 個人品牌建置（Resumes, cover letters, and
              LinkedIn）
            </li>
            <li>模擬面試（Mock interviews）</li>
            <li>產業與職能探索（Function and industry exploration）</li>
          </ul>
          <h4>面試服裝租借 | Empowerment Closet</h4>
          <p>
            職涯中心與多元文化商業計畫(Multicultural Business
            Programs)為所有MSU學生提供專業服裝租借服務，透過 Empowerment Closet
            讓學生可以輕鬆租借適合的求職服裝。
          </p>
        </section>
        <section className="employer-engagement">
          <h3>僱主與企業連結 | Employer Engagement Services</h3>
          <p>
            Palmer
            職涯管理中心透過多元機會，幫助學生與企業建立聯繫，提供線上與實體的就業與職涯發展活動，幫助
            MSF 學生順利進入職場並拓展專業人脈！
          </p>
          <h4>校園就業博覽會 | Career Fairs / Job Fairs</h4>
          <p>
            密西根州立大學（MSU）商學院專屬職涯博覽會及校園招聘活動由 Palmer
            中心舉辦，僅開放給 MSU 學生參加。
          </p>
          <h4>
            Deloitte Foundation 面試套房 | Deloitte Foundation Interview Suite
          </h4>
          <p>
            學生可預約 Deloitte Foundation Interview Suite
            進行正式面試，開放時間為 週一至週五 08:00 AM - 05:00 PM。
          </p>
          <div className="interview-list">
            <p>預約時需提供：</p>
            <ul className="interview-list-item">
              <li>面試日期與時間（Date/Time of Interview）</li>
              <li>公司名稱（Company Name）</li>
            </ul>
          </div>
        </section>
        <section className="career-virtual">
          <h3>線上職涯資源 | Virtual Resources</h3>
          <p>
            Broad 商學院提供多項線上職涯支援，讓學生隨時獲取求職相關資訊與工具：
          </p>
          <div className="virtual-resource-row">
            <div>
              <h5>職涯影片與線上研討會（Videos and webinars）</h5>
              <p>涵蓋各種職業發展議題，由業界專業人士講解。</p>
            </div>
            <div>
              <h5>Handshake（求職平台）</h5>
              <p>可透過此系統申請職缺、上傳履歷並搜尋招聘機會。</p>
            </div>
            <div>
              <h5>CareerLeader（職業自我評估工具）</h5>
              <p>幫助學生分析職涯興趣，鎖定合適的職涯發展方向。</p>
            </div>
            <div>
              <h5>VMock（AI 履歷優化平台）</h5>
              <p>
                透過人工智慧技術，在與職涯顧問一對一討論前，先行調整履歷內容，提高求職成功率。
              </p>
            </div>
          </div>
        </section>
      </SectionContainer>
    </div>
  );
}

export default MsCareerResources;
