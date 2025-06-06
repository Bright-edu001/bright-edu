import React, { useEffect } from "react";
import MbaAreasHero from "../../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../../components/SectionContainer/SectionContainer";
import CourseList from "../../../../components/CourseList/CourseList";

const Analytics = () => {
  useEffect(() => {
    import("./MBA-Programs.scss");
  }, []);

  // 各區塊課程資料

  const featuredCourses = [
    "分析策略與實踐（Analytics Strategy and Practice）：學習如何制定並執行數據分析策略，幫助企業做出明智決策。",
    "商業數據挖掘（Business Data Mining）：掌握挖掘大型數據集的技術，發現潛在的市場機會與風險。",
    "社交媒體與網絡分析（Social Media and Network Analysis）：研究社交媒體平台上的數據，分析品牌影響力及消費者行為。",
    "管理統計學（Statistics for Management）：透過統計數據進行分析和預測，支持管理層決策。",
    "網頁分析（Web Analytics）：理解網站流量、用戶行為和數據驅動的行銷策略。",
  ];
  const outcomesCourses = [
    "運用大數據與分析技術，取得競爭優勢 – 熟悉各類數據工具，為企業決策提供有力的數據支持。",
    "培養有效的溝通與談判技巧 – 具備領導團隊的能力，在追求結果的過程中引導並協調各方資源。",
    "識別並優化企業流程，推動組織變革 – 透過數據分析發現業務流程中的不足，並提出實際可行的解決方案。",
  ];
  const careerCourses = [
    "財務 / 商業分析師（Financial/Business Analyst） – 透過數據分析提供財務規劃和業務決策建議。",
    "報價分析師（Quotation Analyst） – 評估市場數據並進行價格策略分析。",
    "經濟學家（Economist） – 分析市場趨勢並預測經濟動態，為企業提供戰略規劃建議。",
    "數據庫管理員（Database Manager） – 負責管理與維護企業數據庫，確保數據的安全與有效性。",
    "供應鏈分析師（Supply Chain Analyst） – 透過數據分析優化供應鏈流程，提升物流運營效率。",
  ];

  return (
    <div className="management-container">
      {/* 頂部標題和圖示部分 */}
      <MbaAreasHero />
      <SectionContainer>
        {/* UIC MBA 管理專業簡介 */}
        <div className="section">
          <h2 className="section-title">
            提升你的職涯，邁向
            企業財務、經濟學、供應鏈分析、數據庫管理和企業諮詢 等領導角色
          </h2>
          <div className="section-content">
            <p>
              透過
              伊利諾大學芝加哥分校（UIC）MBA學位的商業分析領域，你將具備強大的
              數據分析與決策能力，為自己的職涯開啟多元的發展機會，進入企業財務、經濟分析、供應鏈管理、數據庫管理以及企業諮詢等高薪領域。
            </p>
          </div>
        </div>

        {/* 學位概述部分 */}
        <div className="section">
          <h3 className="section-subtitle">學位概述</h3>
          <div className="section-content">
            <p>
              完成這個碩士學位後，你將能夠運用 大數據工具（Big Data Tools）
              來協助業務決策，推動企業流程改進，辨別現有流程中的缺陷，並提出具備數據證據的解決方案，幫助組織不斷向前發展。
            </p>
            <p>
              我們獲得AACSB認證的MBA商業分析課程，專注授予你如何利用
              數據驅動的決策方法、管理策略 和 有效溝通
              來解決問題並提升運營效率。同時，你將深化對 組織行為、行銷、會計
              等商業核心領域的基礎知識，滿足市場對數據分析專業人才日益增長的需求。
            </p>
          </div>
        </div>

        {/* 特色課程項目 */}
        <div className="section">
          <h3 className="section-subtitle">特色課程範例</h3>
          <CourseList items={featuredCourses} />
        </div>

        {/* 學習成果 */}
        <div className="section">
          <h3 className="section-subtitle">學習成果</h3>
          <div className="section-content">
            <p>完成課程後，你將具備以下核心能力：</p>
            <CourseList items={outcomesCourses} />
          </div>
        </div>
        {/* 職業發展方向 */}
        <div className="section">
          <h3 className="section-subtitle">職涯發展方向</h3>
          <div className="section-content">
            <p>
              取得商業分析方向的 MBA
              學位後，你將具備在以下職位中脫穎而出的能力：
            </p>
            <CourseList items={careerCourses} />
          </div>
        </div>
        {/* 結束語 */}
        <div className="conclusion">
          透過這個課程，你將具備企業急需的數據分析與決策技能，在瞬息萬變的商業環境中保持競爭優勢！
        </div>
      </SectionContainer>
    </div>
  );
};

export default Analytics;
