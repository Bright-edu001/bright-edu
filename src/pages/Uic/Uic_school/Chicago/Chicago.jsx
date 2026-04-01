import React, { useState } from "react";
import { Table } from "antd";
import "antd/dist/reset.css";
import "./Chicago.scss";
import MbaAreasHero from "../../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../../components/SectionContainer/SectionContainer";
import getImageUrl from "../../../../utils/getImageUrl";

const Chicago = () => {
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [transportLoaded, setTransportLoaded] = useState(false);

  const ethnicityColumns = [
    {
      title: <span className="ethnicity-table-title">種族類別 (中文)</span>,
      dataIndex: "chinese",
      key: "chinese",
      render: (text) => <span className="ethnicity-table-text">{text}</span>,
    },
    {
      title: <span className="ethnicity-table-title">種族類別 (英文原文)</span>,
      dataIndex: "english",
      key: "english",
      render: (text) => <span className="ethnicity-table-text">{text}</span>,
    },
    {
      title: <span className="ethnicity-table-title">比例 (%)</span>,
      dataIndex: "percentage",
      key: "percentage",
      render: (text) => (
        <span className="ethnicity-table-percentage">{text}</span>
      ),
    },
  ];

  const ethnicityData = [
    {
      key: "1",
      chinese: "白人",
      english: "White",
      percentage: "48.7%",
    },
    {
      key: "2",
      chinese: "黑人 / 非裔美國人",
      english: "Black or African American",
      percentage: "30.5%",
    },
    {
      key: "3",
      chinese: "美洲原住民與阿拉斯加原住民",
      english: "American Indian and Alaska Native",
      percentage: "2.4%",
    },
    {
      key: "4",
      chinese: "亞洲裔",
      english: "Asian",
      percentage: "9.0%",
    },
    {
      key: "5",
      chinese: "夏威夷原住民與其他太平洋島民",
      english: "Native Hawaiian and Other Pacific Islander",
      percentage: "0.1%",
    },
    {
      key: "6",
      chinese: "其他族群",
      english: "Some Other Race",
      percentage: "24.2%",
    },
  ];

  return (
    <div className="chicago-container">
      <MbaAreasHero />
      <SectionContainer>
        <section className="chicago-intro">
          <div className="container">
            <h1 className="intro-title">芝加哥城市介紹</h1>
            <p className="intro-text">
              芝加哥（Chicago）是美國第三大都市，也是五大湖地區最具影響力的經濟與交通中心。
            </p>
            <p className="intro-text">
              這座城市結合了商業、文化、教育與交通樞紐的地位，被譽為「美國的心臟」。
            </p>
            <p className="intro-text">
              對計畫前往 美國留學 的學生，特別是申請 UIC（University of Illinois
              Chicago）、就讀美國商學院或攻讀 美國MBA、碩士課程
              的同學來說，芝加哥不僅充滿機會，也是生活與成長的理想城市。
            </p>
          </div>
        </section>

        <section className="key-facts-section">
          <div className="container">
            <div className="section-header">
              <div className="history-image">
                <img
                  className="responsive-img"
                  src={getImageUrl("/images/Uic/Chicago/107209792_l.webp")}
                  alt="芝加哥歷史發展"
                  loading="lazy"
                  onLoad={() => setHistoryLoaded(true)}
                  width="373"
                  height="310"
                />
              </div>
              <div className="history-description">
                <h2>基本資料與經濟特色</h2>
                <h2>KEY FACTS & ECONOMIC FEATURES</h2>
              </div>
            </div>
            <div className="section-content">
              {!historyLoaded ? (
                <div className="skeleton-placeholder" />
              ) : (
                <div className="history-text">
                  <p>
                    芝加哥都會統計區（Chicago–Naperville–Elgin MSA）人口約
                    9,618,502 人（2020 年人口普查數據）
                  </p>
                  <p>都會區面積約 18,634 平方公里（約 7,192 平方英里）</p>
                  <p>
                    經濟結構多元：金融、製造、科技、教育、醫療與文化並重。芝加哥同時是全球知名的期貨與衍生品交易中心，芝加哥商品交易所（CME
                    Group）位於此地。這種產業多元性也讓芝加哥成為許多 美國商學院
                    學生最嚮往的實習與就業地點。
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="history-development-section">
          <div className="container">
            <div className="section-header">
              <div className="history-image">
                <img
                  className="responsive-img"
                  src={getImageUrl(
                    "/images/Uic/Chicago/yuvraj-singh-449388-unsplash.webp"
                  )}
                  alt="芝加哥歷史發展"
                  loading="lazy"
                  onLoad={() => setHistoryLoaded(true)}
                  width="373"
                  height="310"
                />
              </div>
              <div className="history-description">
                <h2>歷史與發展</h2>
                <h2>HISTORY & DEVELOPMENT</h2>
              </div>
            </div>
            <div className="section-content">
              {!historyLoaded ? (
                <div className="skeleton-placeholder" />
              ) : (
                <div className="history-text">
                  <p>
                    1837
                    年芝加哥正式建市，地處交通樞紐的優勢讓它在短短數十年間成長為美國最重要的工業城市之一
                    。
                  </p>
                  <p>
                    19
                    世紀後期隨著鐵路與五大湖水運的發展，芝加哥逐漸成為中西部的製造與商業核心。
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="climate-topography-section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2>氣候與地形</h2>
                <h2>CLIMATE & TOPOGRAPHY</h2>
              </div>
              <div className="transport-image">
                <img
                  className="responsive-img"
                  src={getImageUrl(
                    "/images/Uic/Chicago/architecture-3592814.webp"
                  )}
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
                  <p>芝加哥地形平坦，靠近密西根湖，受湖泊調節影響明顯。</p>
                  <p>
                    冬季寒冷（1 月均溫約 −5°C 至 −6°C），夏季溫暖（7 月均溫約
                    23°C） 。
                  </p>

                  <p>年平均降水量約 940 毫米 。</p>

                  <p>
                    因風勢強勁且天氣變化多端，芝加哥享有「風城」（The Windy
                    City）的別名。
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="transportation-hub-section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2>全球交通樞紐地位</h2>
                <h2>GLOBAL TRANSPORTATION HUB STATUS</h2>
              </div>
              <div className="transport-image">
                <img
                  className="responsive-img"
                  src={getImageUrl("/images/Uic/Chicago/102589993_l.webp")}
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
                  <div>
                    <p>
                      芝加哥是美國乃至全球的交通與物流核心，被譽為
                      北美最重要的多模式交通樞紐（multimodal hub）：
                    </p>
                    <ul>
                      <li>
                        鐵路貨運核心
                        <ul>
                          <li>約 25% 的美國貨運列車通過芝加哥地區 。</li>
                          <li>
                            約 50%
                            的美國多式聯運（intermodal）列車在芝加哥起訖或轉運
                            。
                          </li>
                          <li>
                            所有六家美國 Class I 鐵路公司均在芝加哥運營 。
                          </li>
                        </ul>
                      </li>
                      <li>
                        公路交通
                        <ul>
                          <li>
                            芝加哥多條州際高速公路交會，地理位置讓它成為美國東西與南北運輸的交叉點
                            。
                          </li>
                        </ul>
                      </li>
                      <li>
                        航空樞紐
                        <ul>
                          <li>
                            O’Hare International Airport
                            是世界最繁忙的機場之一，客貨運量皆名列前茅 。
                          </li>
                          <li>
                            Midway International Airport
                            補充國內與區域航線需求。
                          </li>
                        </ul>
                      </li>
                      <li>
                        旅遊與會議中心
                        <ul>
                          <li>2024 年芝加哥接待超過 5,500 萬名國內外遊客 。</li>
                          <li>
                            作為美國第三大會議城市，芝加哥國際會議中心（McCormick
                            Place）規模全美第一 。
                          </li>
                        </ul>
                      </li>
                      <li>
                        供應鏈與物流影響
                        <ul>
                          <li>
                            芝加哥是美國全國供應鏈的核心樞紐，任何交通瓶頸都可能對全國物流造成連鎖影響。美國政府與地方政府推動的
                            CREATE 計畫，就是為了提升芝加哥區域的交通效率 。
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="population-ethnicity-section">
          <div className="container">
            <div className="section-header">
              <div className="history-image">
                <img
                  className="responsive-img"
                  src={getImageUrl(
                    "/images/Uic/Chicago/chicago-theatre-890350.webp"
                  )}
                  alt="芝加哥歷史發展"
                  loading="lazy"
                  onLoad={() => setHistoryLoaded(true)}
                  width="373"
                  height="310"
                />
              </div>
              <div className="history-description">
                <h2>芝加哥市人口種族分布</h2>
                <h2>CHICAGO CITY POPULATION & ETHNICITY</h2>
              </div>
            </div>
            <div className="section-content">
              {!historyLoaded ? (
                <div className="skeleton-placeholder" />
              ) : (
                <div className="history-text">
                  <p>
                    芝加哥是一座真正的多元文化城市。根據美國人口普查局 2023
                    年社區調查（ACS）估計，芝加哥市的人口結構呈現高度多樣性：
                  </p>
                  <Table
                    columns={ethnicityColumns}
                    dataSource={ethnicityData}
                    pagination={false}
                    bordered
                    style={{ background: "transparent", marginBottom: "20px" }}
                  />
                  <p>
                    註解：此欄位的官方定義為 “Race alone or in combination with
                    one or more other
                    races”，也就是只要受訪者在普查問卷中勾選了某一種族，不論是否同時勾選其他種族，都會被計算進去。因此，部分人口會同時被列入多個族群，導致各項百分比加總超過
                    100%。
                  </p>
                  <p>
                    資料來源：美國 Census Bureau, American Community Survey
                    2019–2023 估計
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="cultural-education-section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2>文化與教育魅力</h2>
                <h2>CULTURAL AND EDUCATIONAL APPEAL</h2>
              </div>
              <div className="transport-image">
                <img
                  className="responsive-img"
                  src={getImageUrl(
                    "/images/Uic/Chicago/architecture-1853632.webp"
                  )}
                  alt="芝加哥交通"
                  loading="lazy"
                  onLoad={() => setTransportLoaded(true)}
                  width="373"
                  height="310"
                />
              </div>
            </div>
            <ul
              style={{
                fontSize: "18px",
                textAlign: "left",
                listStylePosition: "inside",
              }}
            >
              <li>
                芝加哥不僅是經濟重鎮，還是美國最重要的文化與教育中心之一。
              </li>
              <li>
                擁有頂尖學府，包括伊利諾大學芝加哥分校（UIC）、芝加哥大學（University
                of Chicago）、西北大學（Northwestern University）。
              </li>
              <li>
                對於計畫攻讀 美國碩士 或 MBA 的學生來說，UIC 商學院（Liautaud
                Graduate School of Business）以及芝加哥地區的其他
                美國商學院，都提供世界級的課程與實習資源。
              </li>
              <li>
                博物館、劇場、音樂廳與體育賽事，使芝加哥成為一座全年無休的文化之都。
              </li>
            </ul>
          </div>
        </section>

        <section className="why-chicago-section">
          <div className="container">
            <h2>為何選擇芝加哥？</h2>
            <h2>WHY CHICAGO?</h2>
            <p>
              芝加哥結合了 便利的交通、多元的產業、世界級的教育 與
              充滿活力的文化氛圍。對於計畫美國留學的學生而言，無論是就讀UIC、攻讀美國MBA，還是申請
              美國商學院
              的其他碩士課程，芝加哥都能提供無限的機會與資源，是一座讓人充滿嚮往的國際化大城市。
            </p>
          </div>
        </section>
      </SectionContainer>
    </div>
  );
};

export default Chicago;
