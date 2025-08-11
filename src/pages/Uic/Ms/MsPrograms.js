import AreaCards from "../../../components/AreaCards/AreaCards";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

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
        <AreaCards areas={MsAreas} />
      </SectionContainer>
    </div>
  );
}

export default MsPrograms;
