import React from "react";
import ImageTextSection from "../../../../components/ImageTextSection/ImageTextSection"; // 引入圖片與文字區塊組件
import "./Economy.scss";

const Economy = () => {
  return (
    <div className="economy-page">
      <ImageTextSection
        title="芝加哥城市"
        subtitle="金融中心 • 經濟"
        imageUrl={`${process.env.PUBLIC_URL}/images/UIC/UIC - 網站LOGO - 03.webp`}
        imageAlt="金融中心 • 經濟"
        bgImageUrl={`${process.env.PUBLIC_URL}/images/UIC/banner/photo_6177208882540169916_y.webp`}
      />
      <section className="financial-center-section">
        <h2>金融中心</h2>
        <p>
          芝加哥是美國的第二個金融中心。也是因為如此，就讀UIC商學院的同學能夠擁有最新的商業相關資訊。芝加哥是除了紐約華爾街以外，唯一一個有證券交易所的城市。但芝加哥擁有期貨交易所，債劵交易所等等，這些是華爾街所沒有的機構。經常可以在芝加哥是中芯看到西裝筆挺或穿著套裝的金融人士
        </p>
        <p>
          從美國金融市場環境來看，芝加哥與紐約的不同在於紐約以傳統的商業、證券及投資銀行中心為主，而芝加哥以金融衍生性商品、保險和風險管理中心為主。
        </p>
        <p>
          芝加哥期貨交易所（Chicago Board of Trade，
          CBOT）是美國芝加哥的期貨交易所，成立於1848年，為世界上最古老的期貨和期權交易所。
        </p>
        <div className="cme-section">
          <div className="cme-header-row">
            <div className="cme-image-container">
              <img
                src="https://imgur.com/JDSZDDs.png"
                alt="芝加哥商業交易所集團"
              />
            </div>
            <div className="cme-title-container">
              <h3>芝加哥商業交易所集團</h3>
              <h3>（CME GROUP）</h3>
            </div>
          </div>
          <div className="cme-description">
            <p>
              芝商所擁有150年歷史，最早為芝加哥商品交易所（Chicago Mercantile
              Exchange，CME），市場參與者可以在此買賣商品以管理風險。作為全球最多元化的衍生工具市場龍頭，芝商所每年平均經手30億份合約，價值約1千兆美元。
            </p>
            <p>
              隨著業務增加，芝商所與其他交易所如芝加哥期貨交易所（CBOT）、紐約商業交易所（NYMEX）和紐約商品交易所（COMEX）建立了合作夥伴關係，作為指定合約市場。
            </p>
          </div>
        </div>
      </section>
      <section className="economy-section">
        <h2>經濟</h2>
        <p>
          芝加哥擁有多樣的工業，在美國有”工業之母“之稱，為美國最大的鋼鐵和食品加工工業基地。
        </p>
        <p>
          另外還有農業、運輸機械，化學、石油化工、電機、飛機發動機、印刷等工業也在全國居領先地位。美國500家最大的公司中，有數十家的總部設在芝加哥及附近地區，像是Motorola、Boeing、麥當勞、及亞培等公司。
        </p>
        <p>
          芝加哥近年來發展出的高科技走廊，取代了正在消亡的夕陽工業。不只多個科技及運輸行業在芝加哥的經濟方面占據比較大的份額，幾個醫藥製造和服務公司如百特國際(Baxter
          International Inc)和美國亞培(Abbott
          Laboratories)的總部位於這裡。奇異(General Electric
          Company，GE)提供醫療健康服務的部門在該地設有分支機構。
        </p>
      </section>
    </div>
  );
};

export default Economy;
