import React from "react";
import "./Transportation.scss";
import MbaAreasHero from "../../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../../components/SectionContainer/SectionContainer";

function Transportation() {
  return (
    <div className="transportation-page">
      <MbaAreasHero title="MSU MSF" className="msf-hero" bgColor="#19453c" />
      <SectionContainer>
        {/* 設計稿內容開始 */}
        <div className="transportation-section">
          <div className="transportation-block">
            <h2 className="transportation-title">飛機航班</h2>
            <div className="transportation-subblock">
              <strong>
                Lansing Capital Region International Airport（LAN）
              </strong>
              <ul>
                <li>距MSU約15分鐘車程</li>
                <li>搭搭計程車約15美元</li>
              </ul>
            </div>
            <div className="transportation-subblock">
              <strong>Detroit Metropolitan Airport（DTW）</strong>
              <ul>
                <li>距MSU約75分鐘車程</li>
                <li>Michigan Flyer機場接駁巴士（單程約30美元）</li>
              </ul>
            </div>
          </div>
          <hr className="transportation-divider" />
          <div className="transportation-block">
            <h2 className="transportation-title">火車與長途巴士</h2>
            <div className="transportation-subblock">
              <strong>Amtrak（藍水線 Blue Water）</strong>
              <ul>
                <li>校園旁 Capital Area Multimodal Gateway 停靠</li>
              </ul>
            </div>
            <div className="transportation-subblock">
              <strong>Greyhound &amp; Indian Trails 長途巴士</strong>
              <ul>
                <li>同樣停靠於 Multimodal Gateway</li>
              </ul>
            </div>
          </div>
          <hr className="transportation-divider" />
          <div className="transportation-block">
            <h2 className="transportation-title">校內交通</h2>
            <div className="transportation-subblock">
              <strong>CATA（Capital Area Transportation Authority）巴士</strong>
              <ul>
                <li>校內免費乘車（學期期間）</li>
                <li>通往市區、Okemos、Haslett</li>
              </ul>
            </div>
            <div className="transportation-subblock">
              <strong>Uber / Lyft / 計程車服務</strong>
              <ul>
                <li>東蘭辛市區與校園周邊皆可使用</li>
              </ul>
            </div>
            <div className="transportation-subblock">
              <strong>自行車及步行</strong>
              <ul>
                <li>多條自行車道</li>
                <li>校內與宿舍大樓皆有自行車停車裝施</li>
              </ul>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

export default Transportation;
