import React from "react";
import "./Advantages.css";
import ImageTextSection from "../../../components/ImageTextSection/ImageTextSection";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

function Advantages() {
  return (
    <div className="mba-advantages">
      <ImageTextSection
        title="一年制MBA"
        subtitle="課程優勢"
        imageUrl="/media/MBA_Programs/Learning-rafiki.png"
        imageAlt="課程優勢"
      />

      <SectionContainer className="intro" ariaLabel="課程優勢">
        <p>
          UIC 一年制MBA的商業分析課程是商業決策領域中新興的前沿學科，隨著大數據時代的到來，商務活動的全球化和數字化促使企業向數據驅動型轉型。
          越來越多的企業青睞既有良好的商業素養和業務知識，又具備紮實的數據分析技能的管理者和員工。
        </p>
        <p>
          為適應市場需求，UIC商學院推出了以商業分析為方向的一年制MBA項目，旨在培養具有紮實的工商管理知識、同時能將數據分析技能應用於商業運營、業績提升以及管理決策的複合型人才。
        </p>
        <p>
          本項目依託UIC商學院商業分析、管理資訊系統等優勢學科，打好穩固的商業知識基礎後，慢慢到進階分析課程。將商務專業核心課程與數據分析方向課程無縫銜接，一方面幫助學生掌握商業運營和企業戰略知識，分析科技和工業生產前沿資訊;
          另一方面培養學生大數據應用能力，熟悉定量分析方法，如大數據分析及機器學習等，掌握資料庫管理、程式設計和統計分析的實用技巧。
        </p>
      </SectionContainer>
      <SectionContainer className="learn" ariaLabel="體驗式學習">
        <h3>體驗式學習</h3>
        <p>
          UIC的商業碩士有著豐富的體驗式學習機會與資源，一年MBA學生既學習了書本知識，又可掌握了實踐技能，得以在全球化職場競爭中立於不敗之地，體驗式學習，技能開發是我們項目的立足之本。學生不僅僅是通過案例教學和課題研究來學習，更多的是通過商業企劃、商業模式、商業諮詢、市場調研、管理角色演練、參觀考察以及創業計劃競賽等來開發技能。以下是幾個體驗式學習的例子：
        </p>
        <ul className="experience-list">
          <li>
            <strong>全球商場競賽</strong>
            <div>
              一個網絡上進行的國際商業模擬賽競賽，世界各國的商科學生在商業技能以及商業策略方面一競高低。
            </div>
          </li>
          <li>
            <strong>UIC自己的「概念到風頭」項目</strong>
            <div>
              一年一度的「概念到風頭」創業計劃競賽中，學生運用自己、教員、校友或項目資助方的創意和技術來開發新的風險投資項目，進而贏得項目啟動金。
            </div>
          </li>
          <li>
            <strong>市場營銷策略模擬</strong>
            <div>
              國際著名的市場營銷策略模擬訓練軟件，市場營銷專業人員與MBA學員在複雜而逼真的市場環境中充分運用各種營銷策略與技能，鍛鍊市場營銷決策能力。
            </div>
          </li>
          <li>
            <strong>斯坦福銀行運營爭霸賽</strong>
            <div>
              商業銀行運營管理模擬競賽，學生組成銀行管理團隊，綜合評估其下模擬銀行的財務狀況以及競爭優勢，據此制定相應營運策略。
            </div>
          </li>
        </ul>
        <h4>
          應各行各業具體要求，我們學生隨時可以為各行業提供諮詢服務，利用專業知識與技能為商界排憂解難。請聯繫我們！
        </h4>
      </SectionContainer>

      <SectionContainer className="case-study" ariaLabel="CASE STUDY">
        <h3>CASE STUDY</h3>
        <p>
          在MBA課程中，Case
          Study是能夠將學生管理經驗值拉高的學習模式，同時也是讓許多畢業生畢業後還會印象深刻的學習經歷，透過分析國際或全球等大規模公司的行銷策略、物流及生產管理、財務金融、人力管理等領域，並由小組方式進行深度討論理解或找出管理解決方案。由此方法學生可學習國際格局，並且突破個人或舊有的管理思維，透過小組探討不同意見及想法，可相互激勵且培養創造力，增加團隊分工及合作的能力カ。許多校友甚至畢業後，還運用所學，在職場上有著突破以往的表現。
        </p>
      </SectionContainer>
      <SectionContainer className="networking" ariaLabel="國際人才交流學習">
        <h3>國際人才交流學習</h3>
        <p>
          在MBA就讀過程中，學生也可以在課堂中認識許多各行各業的人才，並自由參與許多各式校內外的課程活動，進而培養人脈網（Network），學習不同工作經驗及文化交流。同時，二十多年來，UIC商學院一直致力於提供教育服務各行業人才，培養具有國際化視野、扎實的西方先進管理理論與經驗、良好溝通技巧的複合型人才。我們已經培養了一大批市場管理層需求的"開拓型管理人才"畢業生們就職於行政機關、跨國公司、高等院校、醫療機構、私營企業、金融機構及諮詢公司，同時也構成了一個龐大的校友網絡，讓學生畢業後可以相互交流。
        </p>
      </SectionContainer>
      <SectionContainer
        className="speech-skills"
        ariaLabel="英文演講溝通表達能力"
      >
        <h3>英文演講溝通表達能力</h3>
        <p>
          西方文化的勇於表達與創造力是與東方文化的保守及謹慎截然不同的部分，在課堂中，教授會鼓勵學生勇於有著"Open-mind"的精神表達想法，且採開放式的討論模式，讓我們有機會增強英文溝通表達能力，同時提高亞洲學生較弱的Speaking
          Skill。同時，商學院的課程中，有許多需要個人或團體上台演講報告的機會，學生可訓練出專業的英文演講實力，教授也都會給出專業的反饋，提升學生信心，畢業後無論參與國際展覽、國際會議、商務餐會或甚至發表專案，都可以有邏輯且明確流利的用英文表達溝通。
        </p>
      </SectionContainer>
    </div>
  );
}

export default Advantages;
