import React from "react";
import "./MbaPrograms.scss";
import "./mba-common.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import getImageUrl from "../../../utils/getImageUrl";
import AreaCards from "../../../components/AreaCards/AreaCards";

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
        <AreaCards />
      </SectionContainer>
    </div>
  );
}

export default MbaPrograms;
