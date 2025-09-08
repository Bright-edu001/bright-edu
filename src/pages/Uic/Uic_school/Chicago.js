import React, { useState } from "react";
import "./Chicago.scss";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import getImageUrl from "../../../utils/getImageUrl";

const Chicago = () => {
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [transportLoaded, setTransportLoaded] = useState(false);

  return (
    <div className="chicago-container">
      <MbaAreasHero />
      <SectionContainer>
        <section className="chicago-intro">
          <div className="container">
            <h3 className="intro-title">芝加哥城市</h3>
            <p className="intro-text">
              芝加哥為美國第三大城市，也是五大湖地區最大的工業中心。
              這裡擁有美國最大的商業中心區和最大的期貨市場之一。都市區新增企業數一直位居美國第一，被評為全美發展最均衡的經濟體。
            </p>
            <p className="intro-text">
              芝加哥同時是美國最重要的文化與科教中心之一，擁有多間頂尖大學，包括伊利諾大學香檳分校、伊利諾大學芝加哥分校
              (UIC)、芝加哥大學等。
            </p>
            <p className="intro-text">
              地理位置在伊利諾州東北部，密西根湖西南端。大都會區包含庫克等6縣，周圍圍繞許多城鎮及印第安那州西北濱湖地區城市，總面積約為12,061.6平方公里
              。以芝加哥為中心向外480公里內，人口占全美近20%。
            </p>
            <p className="intro-text">
              城市地形平坦，氣候溫和濕潤。
              1月平均氣溫為-6℃，7月平均氣溫為22℃，年降雨量965毫米，常年吹來自密西根湖的東北風，因此有「風城」之稱。
            </p>
          </div>
        </section>

        <section className="history-section">
          <div className="container">
            <div className="section-header">
              <div className="history-image">
                <img
                  className="responsive-img"
                  src={getImageUrl("/images/Uic/History.webp")}
                  alt="芝加哥歷史發展"
                  loading="lazy"
                  onLoad={() => setHistoryLoaded(true)}
                  width="373"
                  height="310"
                />
              </div>
              <div className="history-description">
                <h2>歷史發展</h2>
                <h2>HISTORY</h2>
              </div>
            </div>
            <div className="section-content">
              {!historyLoaded ? (
                <div className="skeleton-placeholder" />
              ) : (
                <div className="history-text">
                  <p>
                    1804年芝加哥河口開始有居民定居。1833年在皮毛貿易站的基礎上開始形成城鎮，至1837年芝加哥正式建市。
                  </p>
                  <p>
                    19世紀時，因交通建設（五大湖區、伊利諾-密西西比河航道、中太平洋鐵路等），促進工商業快速發展。
                  </p>
                  <p>
                    1870-1900年間人口快速成長，製造業與零售業成為中西部經濟的重心。芝加哥更是國際勞工運動的發源地，五一勞動節（1886）與三八婦女節（1909）皆誕生於此。
                  </p>
                </div>
              )}
            </div>
            <div className="section-content additional-history">
              {!historyLoaded ? (
                <div className="skeleton-placeholder" />
              ) : (
                <div className="history-text">
                  <p>
                    芝加哥的工業實力雄厚，為全美最大的鋼鐵與肉類加工基地。主要產業還包含農業機械、運輸機械、化學、石油化工、電機、木材加工、造紙、電子、紡織、服裝等。
                  </p>
                  <div>
                    <p>工業區分布：</p>
                    <ul>
                      <li>北、南芝加哥河兩岸及運河周圍</li>
                      <li>盧普工業區（輕工業為主）</li>
                      <li>卡柳梅特工業區（重工業，鋼鐵大廠）</li>
                    </ul>
                  </div>

                  <p>
                    製造業與工業產值高達3224億美元，約占全市總產值的60%。金融業同樣繁盛，芝加哥擁有美國第七儲備區銀行與全國第二大證券交易所📊。
                  </p>
                  <p>
                    芝加哥旅遊業每年吸引約250萬名觀光客。2016年旅遊收入達1592億美元，占全市總產值30%。同時也是美國第三大會議中心。
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="transport-section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2>交通</h2>
                <h2>TRANSPORTATION</h2>
              </div>
              <div className="transport-image">
                <img
                  className="responsive-img"
                  src={getImageUrl("/images/Uic/Transportation.webp")}
                  alt="芝加哥交通"
                  loading="lazy"
                  onLoad={() => setTransportLoaded(true)}
                  width="373"
                  height="310"
                />
              </div>
            </div>
            <div className="section-content">
              {!transportLoaded ? (
                <div className="skeleton-placeholder" />
              ) : (
                <div className="transport-text">
                  <p>
                    芝加哥是美國最大的鐵路樞紐，擁有超過30條鐵路線，全市鐵路總長度達1.24萬公里。年貨運量高達5.12億噸，為全球之最。
                  </p>
                  <p>
                    公路交通四通八達，是州內交通系統的核心。港口交通便利，可經由五大湖水系通往大西洋。
                  </p>
                  <div>
                    <p>航空方面擁有兩座主要機場：</p>
                    <ul>
                      <li>
                        O’Hare International
                        Airport（美國最繁忙機場之一，年旅客量3000-4000萬人次）
                      </li>
                      <li>Midway International Airport</li>
                    </ul>
                  </div>
                  <p>
                    這樣的芝加哥，不僅是美國的經濟心臟，更是工業、文化與交通的重要樞紐，是留學、工作與生活的最佳選擇！
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </SectionContainer>
    </div>
  );
};

export default Chicago;
