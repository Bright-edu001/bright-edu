import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";
import "./MS.scss";
import { MS_ACCOUNTING_CONFIG } from "./msProgramsConfig";

function MsAccounting() {
  return (
    <div className="ms-accounting">
      <MbaAreasHero />
      <SectionContainer>
        <h2 className="ms-page-h2">
          UIC 會計碩士學位（Master of Science in Accounting,
          MSA）——邁向專業會計職涯的關鍵一步
        </h2>
        <p className="ms-page-p">
          伊利諾大學芝加哥分校（University of Illinois Chicago, UIC） 提供的
          會計碩士學位（Master of Science in Accounting,
          MSA），距離芝加哥的商業中心僅幾步之遙。無論你未來希望成為
          註冊會計師（CPA）、財務主管、管理會計師，或是其他商業領域的專業人士，UIC
          商學院的 MSA 都能助你達成目標。
        </p>
        <MSFinanceSection {...MS_ACCOUNTING_CONFIG} />
      </SectionContainer>
    </div>
  );
}

export default MsAccounting;
