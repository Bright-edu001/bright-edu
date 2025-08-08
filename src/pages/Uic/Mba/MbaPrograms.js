import React from "react";
import "./MbaPrograms.scss";
import "./mba-common.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import getImageUrl from "../../../utils/getImageUrl";

function MbaPrograms() {
  return (
    <div className="mba-programs">
      <MbaAreasHero />
      <SectionContainer className="programs" ariaLabel="MBA Programs">
        <h3>MBA Programs</h3>
        <p>
          UIC一年MBA（Master of Business
          Administration，縮寫為MBA，工商管理碩士）是從1994開始，為國際企業界培育金融及國際企業管理之專業人才而特別設計的一年制課程。此課程是在伊利諾芝加哥校本部以一年時間密集上課方式進修MBA學位。
        </p>
        <p>
          大學畢業學士或職場人士可透過此MBA課程進修，培養能勝任專業工商企業的能力，及獲取專業的美國碩士學位。此課程錄取後無須先就讀前導或銜接課程。
        </p>
        <p>
          UIC-MBA課程進行的方式會將一年時間分成三個學季來上課，並且依照同學所選擇的領域進行專業的授課，每一個階段的MBA課程階段之間會有短暫數天的休息，另外美國感恩節、聖誕節與其他美國國定假日等也都會有假期，聖誕節加上新年大約二個星期左右的長假。
        </p>
        <p>
          傳統式兩年制 MBA
          是每年分上、下學期並包含寒、暑假，學生所需要的時間與金錢花費大致上是一年制的兩倍，故一年制MBA課程的優勢，則是提供給學生一個更緊密且有效率的授課方式，學生會在十二個月內修畢
          54 學分後並在平均成績達到
          B（不需要寫論文），即取得教育部承認的美國伊利諾大學 (University of
          Illinois) MBA
          碩士學位；UIC一年制MBA和兩年制MBA是需要進修相同學分數且會獲得相等的畢業證書。
        </p>
        <p>
          據UIC MBA
          台灣招生中心資料顯示，直至目前為止，該課已經招生25年多，台灣更有超過400位畢業生。
        </p>
        <div className="programs-img">
          <div className="img-left">
            <img
              src={getImageUrl(`/images/Uic/Mba/52193187_l-1024x683-1.webp`)}
              alt="Program Highlight"
            />
          </div>
          <div className="img-right">
            <img
              src={getImageUrl(`/images/Uic/Mba/39703687_l-1024x684-1.webp`)}
              alt="Program Highlight"
            />
            <img
              src={getImageUrl(`/images/Uic/Mba/70791790_l-1024x684-1.webp`)}
              alt="Program Highlight"
            />
          </div>
        </div>
        {/* MBA 專業領域列表 */}
        <div className="mba-areas-concentration-list">
          <a
            href="/uic-business-school/mba/areas/management"
            className="mba-areas-concentration-card"
          >
            <div className="concentration-title">管理 Management</div>
            <div className="concentration-desc">
              專業著重於掌握領導個人和組織的知識，了解人力資源管理、策略管理、領導力、管理技能和物流
            </div>
          </a>
          <a
            href="/uic-business-school/mba/areas/finance"
            className="mba-areas-concentration-card"
          >
            <div className="concentration-title">金融 Finance</div>
            <div className="concentration-desc">
              加強同學對金融市場、資產及風險管理以及金融機構在充滿活力的全球經濟中的運作的理解，並促進金融專業人士的職業發展。利用芝加哥金融界的資源，提供金融市場及資產管理的最新知識。
            </div>
          </a>
          <a
            href="/uic-business-school/mba/areas/analytics"
            className="mba-areas-concentration-card"
          >
            <div className="concentration-title">
              商業分析 Business Analytics
            </div>
            <div className="concentration-desc">
              學生掌握如何使用數據和模型進行商業決策，以及如何利用大數據和分析來獲得競爭優勢。商業分析專業的
              MBA 學生準備滿足商業領域中發展最快的領域之一的需求。
            </div>
          </a>
          <a
            href="/uic-business-school/mba/areas/marketing"
            className="mba-areas-concentration-card"
          >
            <div className="concentration-title">行銷 Marketing</div>
            <div className="concentration-desc">
              選擇此領域的學生對商業的整個行銷過程（從研究和產品開發到溝通規劃和衡量）有深入的了解
            </div>
          </a>
          <a
            href="/uic-business-school/mba/areas/human-resource"
            className="mba-areas-concentration-card"
          >
            <div className="concentration-title">
              人資管理 Human Resource Management
            </div>
            <div className="concentration-desc">
              此專業領域與人力資源管理協會（SHRM）接軌，適合對組織中「人員管理」有興趣的學生。
            </div>
          </a>
        </div>
      </SectionContainer>
    </div>
  );
}

export default MbaPrograms;
