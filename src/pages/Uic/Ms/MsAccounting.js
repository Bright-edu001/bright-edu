import ImageTextSection from "../../../components/ImageTextSection/ImageTextSection";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";
import { PageH2, PageP } from "./MS.styles";

function MsAccounting() {
  const whyTitle = "為什麼選擇在 UIC 商學院攻讀會計碩士？";
  const whyList = [
    {
      title: "助你備戰 CPA，通過率領先",
      desc: "面對不斷變化的規範、法律和法規，僅憑學士學位很難全面準備 CPA 考試。而 UIC 商學院的 MSA 將為你充分準備 CPA 考試，並且我們的通過率一直保持在高水平。",
    },
    {
      title: "靈活的課程設計",
      desc: "我們會考慮你之前所修的課程，因此不需要重複學習你已經掌握的知識，讓你的學習過程更加高效。",
    },
    {
      title: "緊跟新科技需求，提升競爭力",
      desc: "根據 美國註冊會計師協會（American Institute of CPAs, AICPA） 的研究，隨著企業對高技術會計服務的需求日益增長，會計行業的角色正在發生重大變化。UIC 商學院透過將最新的技術與方法融入課程中，確保你在職場中始終保持競爭優勢。",
    },
  ];

  const outcomesTitle = "MSA 職涯發展與成果";
  const outcomesDesc = {
    desc: "現代會計師不再只是記錄財務數據的角色，更是 企業顧問與財務顧問，透過數據分析為企業提供減少成本、提升營收的策略建議。我們的 MSA 課程將 研究與實務應用 結合，讓你具備在職場中脫穎而出的優勢，成為企業尋找的 未來領袖、合夥人及高層管理者。",
  };

  const companyTitle = "主要聘用 UIC 商學院 MSA 畢業生的頂尖企業";
  const companyLogos = [
    { src: "https://imgur.com/71PlcUk.png", alt: "RSM" },
    { src: "https://imgur.com/F6xQe3p.png", alt: "Deloitte" },
    { src: "https://imgur.com/bkTWA3F.png", alt: "PWC" },
    { src: "https://imgur.com/68hhxLe.png", alt: "Grant Thornton" },
    { src: "https://imgur.com/PjZgA8X.png", alt: "EY" },
    { src: "https://imgur.com/mrP1kpY.png", alt: "Michael Sliver" },
    { src: "https://imgur.com/YZ4ZMLw.png", alt: "Andersen" },
    { src: "https://imgur.com/eVXr82m.png", alt: "Bakertilly" },
    { src: "https://imgur.com/8nrAHBl.png", alt: "KMPG" },
    { src: "https://imgur.com/cF6aKzR.png", alt: "Plante Moran" },
  ];

  const courseArrangementTitle = "學分與課程安排";
  const courseArrangementList = [
    "MSA 課程：32 個學分（適用於會計本科背景的學生）。",
    "額外課程：如果你沒有會計本科學位，需要再修習 11 門補充課程，讓你具備 CPA 或其他專業考試所需的基礎知識。",
  ];

  const coreCoursesTitle = "MSA 課程特色";
  const coreCoursePragaph =
    "UIC 商學院的 MSA 課程為期 1 到 2 年，不僅為你提供專業會計領域的知識與技能，還能幫助你準備多項專業考試，包括：";
  const coreCoursesIntroList = [
    "CPA（Certified Public Accountant, 註冊會計師）考試",
    "CMA（Certificate in Management Accounting, 管理會計師證書）考試",
  ];
  const coreCoursesList = [];
  const coreCourseFoot =
    "此外，UIC 商學院的 MSA 課程符合所有 CPA 考試的教育要求，確保你在畢業後具備充分的資格申請考試。";
  const reasonsTitle = "為什麼選擇 UIC 的 MSA？";
  const reasonsDesc =
    "透過 UIC 的 MSA 課程，你不僅能取得專業會計知識，更能在瞬息萬變的會計領域中保持領先，成為企業中備受信賴的財務專家！";

  return (
    <div className="ms-accounting">
      <ImageTextSection
        title="Master of Science"
        subtitle="Accounting"
        imageUrl="https://imgur.com/rycQiyw.png"
        imageAlt="Accounting"
      />
      <PageH2>
        UIC 會計碩士學位（Master of Science in Accounting,
        MSA）——邁向專業會計職涯的關鍵一步
      </PageH2>
      <PageP>
        伊利諾大學芝加哥分校（University of Illinois Chicago, UIC） 提供的
        會計碩士學位（Master of Science in Accounting,
        MSA），距離芝加哥的商業中心僅幾步之遙。無論你未來希望成為
        註冊會計師（CPA）、財務主管、管理會計師，或是其他商業領域的專業人士，UIC
        商學院的 MSA 都能助你達成目標。
      </PageP>

      <MSFinanceSection
        whyTitle={whyTitle}
        whyList={whyList}
        outcomesTitle={outcomesTitle}
        outcomesDesc={outcomesDesc}
        companyTitle={companyTitle}
        companyLogos={companyLogos}
        courseArrangementTitle={courseArrangementTitle}
        courseArrangementList={courseArrangementList}
        coreCoursesTitle={coreCoursesTitle}
        coreCoursePragaph={coreCoursePragaph}
        coreCoursesIntroList={coreCoursesIntroList}
        coreCoursesList={coreCoursesList}
        coreCourseFoot={coreCourseFoot}
        reasonsTitle={reasonsTitle}
        reasonsDesc={reasonsDesc}
      />
    </div>
  );
}

export default MsAccounting;
