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
              芝加哥為美國第三大城市，也是為五大湖地區最大的工業中心。美國最大的商業中心區和最大的期貨市場之一，其都市區新增的企業數一直位居美國第一位，被評為美國發展最均衡的經濟體。
            </p>
            <p className="intro-text">
              芝加哥是美國最重要的文化科教中心之一，擁有多間頂尖大學，伊利諾大學香檳分校、伊利諾學芝加哥分校，芝加哥大學等。地處於伊利諾州東北部，密西根湖西南端。大市區由庫克等6縣組成，周圍包括許多城鎮以及印第安那州西北濱湖地區諸城，面積為1,2061.6平方公里。以芝加哥為中心向外延伸480公里範圍內，集中了全國近20％的人口。-6°C，7月平均溫度是22°C，冬季溫度約為5°C。
            </p>
            <p className="intro-text">
              城市沿濱湖平原向西、北、南展開，地勢平坦。氣候溫和濕潤。1月平均氣溫為-6℃，7月平均氣溫為22℃，年降雨量965毫米。
            </p>
            <p className="intro-text">
              常年吹來自密西根湖的東北風，因此有「風城」之稱。
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
                    1804年在芝加哥河河口一帶開始有居民定居，1833年開始在皮毛貿易站基礎上居民開始聚集以及建立城鎮，至1837年時芝加哥市建立，19世紀初人口數增長到1900年已超過100萬，為當時世界上人口增長最快的城市之一。
                  </p>
                  <p>
                    19世紀中葉起，五大湖區與伊利諾密西西比河建成，以及橫貫大陸的中太平洋鐵路等也相繼開通，以利於之後促進城市工商業的發展，1870-1900年間，因人口增加快速，使當地的製造業和零售業成為中西部經濟的主要地區，為大幅度影響了美國經濟的時刻。20世紀初，美國中西部已是最大的穀物和肉、乳產區。五大湖地區則為煤、鐵等資源的開發，進而使芝加哥迅速成為中西部地區最大的城市和交通、工業中心。
                  </p>
                  <p>
                    在日後，商業和金融業也日趨繁榮。芝加哥在國際勞工運動中有著光榮歷史，也就是國際五一勞動節
                    (1886) 和三八婦女節 (1909) 的發源地。
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
                    芝加哥擁有重工業及輕工業，而兩種工業部門也都很齊全及發達，有全國最大的鋼鐵和肉類加工工業基地。農業機械、運輸機
                    械、化學、石油化工、電機等產業在全國皆處於領先地位。而木材加工、造紙、電子、紡織、服裝、麵粉等也是芝加哥重要的工業部門。
                  </p>
                  <p>
                    工業主要分佈在芝加哥河南北及運河兩側，盧普工業區工廠為重要的輕工業區；芝加哥市南邊的卡柳梅特工業區主要為大型企
                    業，以鋼鐵為主的重工業區，在衛星城加里有美國最大的鋼鐵聯合企業。芝加哥的工業和製造業總產值達到3224億美元，約占全市總產值的60%，金
                    融業也是相當繁盛。
                  </p>
                  <p>
                    芝加哥市內則有大型的穀物和牲畜市場，貿易公司有千餘家，西爾斯．羅伯克公司是美國著名也是最大的零售企業；批發零售
                    額也名列前茅，同時也是世界主要的郵購中心。金融機構部分則有美國第七儲備區銀行和中西部證券交易所等，而中西部證券交易所為全國第二大
                    證券市場。
                  </p>
                  <p>
                    芝加哥的旅遊產業也很發達，每年觀光客约250萬人。在2016年，芝加哥旅遊業達到1592億美元，約占全市總產值的30%。此外
                    ，商務人士的興起，使芝加哥成為美國第三大會議中心。
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
                    芝加哥是為美國最大的鐵路樞紐，集結美國中北部30多條鐵路線，城市鐵路線總長
                    (1.24萬多公里) 和年貨運量 (5.12億噸)
                    均居世界各大城市之冠。有12條公路幹線經過此地，公路交通十分發達，為州內公路系統的中心。也是五大湖地區重要湖港，船隻可經伊利運河-哈德遜河或聖羅倫斯河出海。芝加哥市內有2個重要機場(O’Hare
                    International Airport 和 Midway International
                    Airport)，其中O’Hare國際機場為美國面積最大、運輸最繁忙的機場，年旅客量高達達3000-
                    4000萬人次。
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
