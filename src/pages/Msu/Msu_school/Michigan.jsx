import React from "react";
import "./Michigan.scss";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
function Michigan() {
  return (
    <div className="michigan-page">
      <MbaAreasHero title="MSU MSF" className="msf-hero" bgColor="#19453c" />
      <SectionContainer>
        <h3 className="section-title">密西根州立大學</h3>
        <section className="michigan-intro">
          <p>
            East
            Lansing（東蘭辛市）位於美國密西根州中部，是密西根州立大學（Michigan
            State University,
            MSU）的所在地，也是典型的美國大學城。城市人口約有47,000人，大部分居民為MSU學生、教授及校園相關人員，因此擁有濃厚的學術與青春氛圍。
          </p>
          <h3>城市特色</h3>
          <div className=" intro-row">
            <div className="intro-col">
              <h4>大學生活力之都</h4>
              <p>East 街道充滿年輕氣息與多元文化</p>
            </div>
            <div className="intro-col">
              <h4>綠意盎然</h4>
              <p>校園與城市融為一體，擁有大量公園與綠地</p>
            </div>
            <div className="intro-col">
              <h4>步行生活圈</h4>
              <p>餐廳、咖啡廳、書店、超市步行可達</p>
            </div>
            <div className="intro-col">
              <h4>文化藝術</h4>
              <p>擁有畫廊、表演藝術中心、多元活動</p>
            </div>
            <div className="intro-col">
              <h4>自行車友善城市</h4>
              <p>設有完善的自行車道與騎行空間</p>
            </div>
          </div>
        </section>
        <section className="outdoor-activities">
          <h3>戶外活動與自然資源</h3>
          <div className="activities-grid">
            <div className="activity-item">
              <div className="activity-image-placeholder"></div>
              <h4>Red Cedar River 河畔步道</h4>
              <p>MSU校園內景</p>
            </div>
            <div className="activity-item">
              <div className="activity-image-placeholder"></div>
              <h4>MSU Horticulture Gardens</h4>
              <p>校園植物園</p>
            </div>
            <div className="activity-item">
              <div className="activity-image-placeholder"></div>
              <h4>Trail & Park 系統</h4>
              <p>適合散步、慢跑、騎車</p>
            </div>
            <div className="activity-item">
              <div className="activity-image-placeholder"></div>
              <h4>Eagle Eye Golf Club</h4>
              <p>當地知名高爾夫球場</p>
            </div>
            <div className="activity-item">
              <div className="activity-image-placeholder"></div>
              <h4>Patriarche Park</h4>
              <p>家庭親子休閒好去處</p>
            </div>
          </div>
        </section>
        <section className="traffic">
          <h3>交通便利</h3>
          <ul>
            <li>鄰近 Lansing Capital Region International Airport（LAN）</li>
            <li>當地CATA巴士系統便捷</li>
            <li>Amtrak 火車連接芝加哥與密西根州內主要城市</li>
            <li>自駕方便 — 前往底特律約1.5小時車程</li>
            <li>Uber / Lyft隨叫即到</li>
          </ul>
        </section>
        <section className="city-features">
          <h3>適合留學生的城市特色</h3>
          <ul>
            <li>國際學生友善，生活多元包容</li>
            <li>大學資源豐富，支援國際生社群</li>
            <li>咖啡廳、圖書館與學習空間遍布</li>
            <li>夜生活輕鬆熱鬧，不浮誇但有活力</li>
            <li>生活步調悠閒、物價相對親民</li>
          </ul>
        </section>
      </SectionContainer>
    </div>
  );
}

export default Michigan;
