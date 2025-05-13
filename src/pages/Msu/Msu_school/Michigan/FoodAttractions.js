import React from "react";
import "./FoodAttractions.scss";
import ImageTextSection from "../../../../components/ImageTextSection/ImageTextSection";
import InfoCard from "../../../../components/InfoCard/InfoCard";

function FoodAttractions() {
  return (
    <div className="food-attractions-page">
      <ImageTextSection
        title="East Lansing 大學城"
        subtitle="景點 • 美食"
        imageUrl="https://imgur.com/hiUsC7y.png"
        imageAlt="景點 • 美食"
      />
      {/* 景點區塊開始 */}
      <div className="attractions-section">
        <h2 className="attractions-title">景點</h2>
        <div className="attractions-list">
          <InfoCard
            title="Wharton Center for Performing Arts"
            content={
              <>
                華頓藝術中心
                <br />
                百老匯音樂劇、音樂、舞蹈等文化演出。
              </>
            }
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="景點圖片"
            imagePosition="right"
          />
          <InfoCard
            title="Public Art Gallery"
            content={
              <>
                公共藝術畫廊
                <br />
                免費參觀，欣賞各類現當代藝術作品。
              </>
            }
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="景點圖片"
            imagePosition="left"
          />
          <InfoCard
            title="East Lansing Farmer's Market"
            content={
              <>
                東蘭辛市集
                <br />
                在地新鮮農產品、手作食品。
              </>
            }
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="景點圖片"
            imagePosition="right"
          />
          <InfoCard
            title="East Lansing Family Aquatic Center"
            content={
              <>
                東蘭辛水上樂園
                <br />
                夏季消暑，適合家庭出遊。
              </>
            }
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="景點圖片"
            imagePosition="left"
          />
          <InfoCard
            title="East Lansing Public Library"
            content={
              <>
                東蘭辛公共圖書館
                <br />
                安靜閱讀與自修好去處。
              </>
            }
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="景點圖片"
            imagePosition="right"
          />
        </div>
      </div>
      {/* 景點區塊結束 */}
      <div className="attractions-section">
        <h2 className="attractions-title">美食</h2>
        <div className="attractions-list">
          <InfoCard
            title="State Room Restaurant"
            content="高級美式料理、精緻用餐環境"
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="美食圖片"
            imagePosition="left"
          />
          <InfoCard
            title="Crunchy’s"
            content="經典漢堡、學生最愛聚會場所"
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="美食圖片"
            imagePosition="right"
          />
          <InfoCard
            title="Beggar’s Banquet"
            content="多樣國際料理與在地佳餚"
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="美食圖片"
            imagePosition="left"
          />
          <InfoCard
            title="Peanut Barrel"
            content="漢堡+啤酒、戶外座位"
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="美食圖片"
            imagePosition="right"
          />
          <InfoCard
            title="HopCat"
            content="超多精釀啤酒與創意料理"
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="美食圖片"
            imagePosition="left"
          />
          <InfoCard
            title="Sansu"
            content="壽司及日式料理人氣名店"
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="美食圖片"
            imagePosition="right"
          />
          <InfoCard
            title="Pizza House"
            content="深盤披薩與聚餐好選擇"
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="美食圖片"
            imagePosition="left"
          />
          <InfoCard
            title="Swagath Indian Cuisine"
            content="道地印度料理"
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="美食圖片"
            imagePosition="right"
          />
          <InfoCard
            title="Harrison Roadhouse"
            content="美式餐點、休閒酒吧風格"
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="美食圖片"
            imagePosition="left"
          />
          <InfoCard
            title="Coral Gables"
            content="經典美式老牌餐廳"
            imageSrc="https://imgur.com/uFf3zgt.png"
            imageAlt="美食圖片"
            imagePosition="right"
          />
        </div>
      </div>
    </div>
  );
}

export default FoodAttractions;
