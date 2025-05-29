import "./FoodAttractions.scss";
import ImageTextSection from "../../../../components/ImageTextSection/ImageTextSection";
import AttractionCard from "../../../../components/AttractionCard/AttractionCard";

function MicFoodAttractions() {
  const attractionsData = [
    {
      name: "Wharton Center for Performing Arts",
      desc: ["華頓藝術中心", "百老匯音樂劇、音樂、舞蹈等文化演出。"],
    },
    {
      name: "Public Art Gallery",
      desc: ["公共藝術畫廊", "免費參觀，欣賞各類現當代藝術作品。"],
    },
    {
      name: "East Lansing Farmer's Market",
      desc: ["東蘭辛市集", "在地新鮮農產品、手作食品。"],
    },
    {
      name: "East Lansing Family Aquatic Center",
      desc: ["東蘭辛水上樂園", "夏季消暑，適合家庭出遊。"],
    },
    {
      name: "East Lansing Public Library",
      desc: ["東蘭辛公共圖書館", "安靜閱讀與自修好去處。"],
    },
  ];
  const foodData = [
    { name: "State Room Restaurant", desc: ["高級美式料理、精緻用餐環境"] },
    { name: "Crunchy’s", desc: ["經典漢堡、學生最愛聚會場所"] },
    { name: "Beggar’s Banquet", desc: ["多樣國際料理與在地佳餚"] },
    { name: "Peanut Barrel", desc: ["漢堡+啤酒、戶外座位"] },
    { name: "HopCat", desc: ["超多精釀啤酒與創意料理"] },
    { name: "Sansu", desc: ["壽司及日式料理人氣名店"] },
    { name: "Pizza House", desc: ["深盤披薩與聚餐好選擇"] },
    { name: "Swagath Indian Cuisine", desc: ["道地印度料理"] },
    { name: "Harrison Roadhouse", desc: ["美式餐點、休閒酒吧風格"] },
    { name: "Coral Gables", desc: ["經典美式老牌餐廳"] },
  ];
  return (
    <div className="food-attractions-page">
      <ImageTextSection
        title="East Lansing 大學城"
        subtitle="景點 • 美食"
        imageUrl={`${process.env.PUBLIC_URL}/images/Msu/Michigan State University_01.webp`}
        imageAlt="景點 • 美食"
        bgImageUrl={`${process.env.PUBLIC_URL}/images/banner/banner4-768.webp`}
      />
      {/* 景點區塊開始 */}
      <div className="attractions-section">
        <h2 className="attractions-title">景點</h2>
        <div className="attractions-list">
          {attractionsData.map((item, idx) => (
            <AttractionCard key={idx} name={item.name} desc={item.desc} />
          ))}
        </div>
      </div>
      {/* 景點區塊結束 */}
      <div className="attractions-section">
        <h2 className="attractions-title">美食</h2>
        <div className="attractions-list">
          {foodData.map((item, idx) => (
            <AttractionCard key={idx} name={item.name} desc={item.desc} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MicFoodAttractions;
