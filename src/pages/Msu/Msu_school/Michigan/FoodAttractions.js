import React from "react";
import "./FoodAttractions.scss";
import ImageTextSection from "../../../../components/ImageTextSection/ImageTextSection";

function MicFoodAttractions() {
  return (
    <div className="food-attractions-page">
      <ImageTextSection
        title="East Lansing 大學城"
        subtitle="景點 • 美食"
        imageUrl="/media/Ms/Stamp collecting-amico.png"
        imageAlt="景點 • 美食"
      />
      {/* 景點區塊開始 */}
      <div className="attractions-section">
        <h2 className="attractions-title">景點</h2>
        <div className="attractions-list">
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">
                Wharton Center for Performing Arts
              </div>
              <div className="attraction-desc">
                華頓藝術中心
                <br />
                百老匯音樂劇、音樂、舞蹈等文化演出。
              </div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">Public Art Gallery</div>
              <div className="attraction-desc">
                公共藝術畫廊
                <br />
                免費參觀，欣賞各類現當代藝術作品。
              </div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">
                East Lansing Farmer's Market
              </div>
              <div className="attraction-desc">
                東蘭辛市集
                <br />
                在地新鮮農產品、手作食品。
              </div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">
                East Lansing Family Aquatic Center
              </div>
              <div className="attraction-desc">
                東蘭辛水上樂園
                <br />
                夏季消暑，適合家庭出遊。
              </div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">East Lansing Public Library</div>
              <div className="attraction-desc">
                東蘭辛公共圖書館
                <br />
                安靜閱讀與自修好去處。
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 景點區塊結束 */}
      <div className="attractions-section">
        <h2 className="attractions-title">美食</h2>
        <div className="attractions-list">
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">State Room Restaurant</div>
              <div className="attraction-desc">高級美式料理、精緻用餐環境</div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">Crunchy’s</div>
              <div className="attraction-desc">經典漢堡、學生最愛聚會場所</div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">Beggar’s Banquet</div>
              <div className="attraction-desc">多樣國際料理與在地佳餚</div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">Peanut Barrel</div>
              <div className="attraction-desc">漢堡+啤酒、戶外座位</div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">HopCat</div>
              <div className="attraction-desc">超多精釀啤酒與創意料理</div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">Sansu</div>
              <div className="attraction-desc">壽司及日式料理人氣名店</div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">Pizza House</div>
              <div className="attraction-desc">深盤披薩與聚餐好選擇</div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">Swagath Indian Cuisine</div>
              <div className="attraction-desc">道地印度料理</div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">Harrison Roadhouse</div>
              <div className="attraction-desc">美式餐點、休閒酒吧風格</div>
            </div>
          </div>
          <div className="attraction-card">
            <div className="attraction-image" />
            <div className="attraction-info">
              <div className="attraction-name">Coral Gables</div>
              <div className="attraction-desc">經典美式老牌餐廳</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MicFoodAttractions;
