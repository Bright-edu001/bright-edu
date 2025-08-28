import AreaCards from "../../../components/AreaCards/AreaCards";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import "./MsPrograms.scss";

const MsAreas = [
  {
    href: "/uic-business-school/ms/finance",
    title: "金融 Finance",
    desc: "讓你邁向金融領域的高階職位。",
  },
  {
    href: "/uic-business-school/ms/marketing",
    title: "行銷 Marketing",
    desc: "加強你的行銷專業，開啟更多職涯機會。",
  },
  {
    href: "/uic-business-school/ms/supply-chain-operation-management",
    title:
      "供應鏈與營運管理 Master of Science in Supply Chain and Operations Management",
    desc: "掌握供應鏈與營運領域的專業知識。",
  },
  {
    href: "/uic-business-school/ms/business-analytics",
    title: "商業分析 Master of Science in Business Analytics",
    desc: "掌握數據分析的核心競爭力。",
  },
  {
    href: "/uic-business-school/ms/management-information-systems",
    title: "管理資訊系統 Master of Science in Management Information Systems",
    desc: "將技術與商業決策完美結合。",
  },
  {
    href: "/uic-business-school/ms/accounting",
    title: "會計 Master of Science in Accounting",
    desc: "邁向專業會計職涯的關鍵一步。",
  },
];

function MsPrograms() {
  return (
    <div className="ms-programs">
      <MbaAreasHero />
      <SectionContainer className="programs" ariaLabel="MS Programs">
        <h3>MS Programs</h3>
        <div className="programs-content">
          <h4>為什麼選擇UIC商學院？</h4>
          <p>
            無論你是想在職場中晉升、轉換跑道，還是創業，伊利諾大學芝加哥分校（UIC）商學院都能提供你成功所需的技能、實務經驗與人脈。
          </p>
          <p>
            透過我們獨特的Business學位，你可以根據自己的目標與生活步調，靈活設計最適合你的課程計畫。
          </p>
        </div>
        <div className="programs-reasons">
          <h4>選擇UIC商學院的三大理由：</h4>
          <ul>
            <li>
              ✅ 高性價比（Best Value）
              <span>
                UIC被評為伊利諾州「最佳價值商學院第一名」（Wall Street Journal
                2025），提供優質教育，同時維持合理學費，投資報酬高。
              </span>
            </li>
            <li>
              ✅ #1 Best Value in Illinois — Wall Street Journal 2025
              <span>
                這項榮譽證明了UIC商學院在學費、教學品質與職涯回報上的優勢，是你追求碩士學位的聰明選擇。
              </span>
            </li>
            <li>
              ✅ 強大人脈資源（Powerful Network）
              <span>
                我們位於芝加哥，擁有超過 52,000 名校友
                的商業人脈網絡，讓你接觸眾多企業與職涯機會，加速職涯發展。
              </span>
            </li>
          </ul>
        </div>

        <AreaCards areas={MsAreas} />
      </SectionContainer>
    </div>
  );
}

export default MsPrograms;
