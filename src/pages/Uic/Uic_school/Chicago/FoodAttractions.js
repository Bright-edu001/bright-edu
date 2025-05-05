import React from "react";
import "./FoodAttractions.scss";
import ImageTextSection from "../../../../components/ImageTextSection/ImageTextSection"; // 引入圖片與文字區塊組件
// 創建可重用的卡片組件
const InfoCard = ({ title, content, imageSrc, imageAlt, isRightImage }) => {
  // 處理 content 可能為字串、陣列或物件的情況
  const renderContent = () => {
    if (Array.isArray(content)) {
      return content.map((paragraph, idx) => <p key={idx}>{paragraph}</p>);
    } else if (typeof content === "object" && content !== null) {
      // 假設物件型態為 { first, second, third }
      return (
        <>
          {content.first && <p>{content.first}</p>}
          {content.second && <p>{content.second}</p>}
          {content.third && <p>{content.third}</p>}
        </>
      );
    } else if (typeof content === "string") {
      return <p>{content}</p>;
    }
    return null;
  };

  return (
    <div className={`card ${isRightImage ? "card-right" : "card-left"}`}>
      <div className="card-content">
        {title && <h4>{title}</h4>}
        {renderContent()}
      </div>
      <img src={imageSrc} alt={imageAlt || title} />
    </div>
  );
};

function FoodAttractions() {
  return (
    <div className="food-attractions-page">
      <ImageTextSection
        title="芝加哥城市"
        subtitle="景點 • 美食"
        imageUrl="https://imgur.com/hiUsC7y.png" // 圖片路徑
        imageAlt="景點 • 美食"
      />
      <section className="food-attractions-header">
        <h2 className="food-attractions-title">景點</h2>
        <p className="food-attractions-description">
          芝加哥是一個充滿活力，也擁有海灘、公園及藝術品的城市。就讀UIC或在美國留學的學生，可以沿著密歇根大道漫步還是沿著乘船遊覽芝加哥河，享受一個下午。
          從博物館至音樂、舞蹈及藝術，芝加哥提供各式各樣文化體驗。
          也因為芝加哥擁有600多個公園，也自詡為"花園之城(City in the Garden)"。
        </p>
        <p className="food-attractions-text">
          芝加哥擁有當地獨特美食，UIC同學或美國留學的同學及遊客一定都要去品嘗，獨特風味絕對超出想像!
        </p>
      </section>

      {/* 景點部分 */}
      <section className="attractions-section">
        <section className="food-attractions-intro">
          <h3>畢卡索雕像</h3>
          <p>
            芝加哥市內保存著早期傳統式的歐洲古典建築，又有相當壯觀的現代摩天大樓，加上各種新奇形狀的裝置藝術為色彩多變的街頭雕塑的點綴，使整個芝加哥市成為建築藝術博物館。在市中心的戴利廣場，有一座藝術大師畢卡索所打造的造型奇特的金屬雕塑矗立在戴利中心前，因未命名，則當地人則直接稱之為「畢卡索」。雕塑高15公尺，重達162噸，於1967年8月15日落成。曾有數千人在此見證這座芝加哥市中心最早的大型戶外公共藝術品揭幕。
            據畢卡索的孫子2004年接受《芝加哥太陽報》採訪時稱，雕塑是因一位名叫琳蒂婭．考比（Lydia
            Corbett）的法國女孩而得到靈感的。雕塑的曲線表現出對稱、流暢、柔和感，使人對於此雕塑有女性化的感覺。因其上有緊鄰的雙眼和外露的鼻孔，有些人也認為雕塑表現的是一隻狒狒。而畢卡索當年製作此雕塑模型時，也確實稱它為「狒狒頭」。其他人認為雕塑的線條和角度都充滿強烈的畢卡索立體派風格，是一種抽象的表達。也因為這座雕塑是如此妙不可言，它擁有著畢卡索慣有的幽默，任由你自由想像並為它命名。
          </p>
          <img src="https://imgur.com/J3oMA6B.png" alt="畢卡索雕像" />
        </section>

        <InfoCard
          title="菲爾德自然史博物館"
          content={{
            first:
              "博物館園區 (Museum Campus)，有著占地廣大的園區，一邊連接格蘭特公園 (Grant Park)，一邊和美麗的密西根湖相依偎。 館內收藏了大量的恐龍骨架，有副櫛龍、劍龍、懼龍、惡龍、鷲龍、掠食龍的骨架。",
            second:
              "其中，「暴龍．蘇」的骨骼為菲爾德自然史博物館 (Field Museum of Natural History) 最有名的收藏品。博物館內光鳥類標本就有近千種，也包括已絕種的鳥類。大型哺乳動物（鯨魚除外）的標本也相當多。",
            third:
              "在館內，也有透過大量的多媒體影音互動，來詮釋生命的演化，十分具有教育意義。",
          }}
          imageSrc="https://imgur.com/RexHI7g.png"
          imageAlt="菲爾德自然史博物館"
          isRightImage={true}
        />

        <InfoCard
          title="芝加哥美術館"
          content={{
            first:
              "芝加哥美術館是美國三大美術館之一。修建於1891年。外觀呈維多利亞風格，在正門入口處矗立著兩頭獅子雕像。該館規模巨大，分10個展館，共收藏展品30萬件以上。",
            second:
              "芝加哥美術館 (The Art Institute of Chicago) 收藏豐富的印象派作品，是除了巴黎羅浮宮之外，在全世界蒐集最多印象派畫家作品的博物館 。",
          }}
          imageSrc="https://imgur.com/aZ5oFWx.png"
          imageAlt="芝加哥美術館"
          isRightImage={false}
        />

        <h4 className="title">千禧公園的人臉噴泉及大豆子</h4>

        <InfoCard
          content="坐落於格蘭特公園內的千禧公園是芝加哥著名且具城市特色的公園。千禧公園原先只是一片停車場，改建好後深受大家喜愛，便有了芝加哥前院之稱。公園共有四大經典區域，在公園內最具特色的則是皇冠噴泉，俗稱人臉噴泉，在噴泉兩側豎立兩座布滿液晶螢幕的牆面，上面有著會不時變換表情的人臉，這些人臉是取自芝加哥市民的真人臉像，也會配合表情吐出水柱，十分逗趣，也非常生動且奇特。"
          imageSrc="https://imgur.com/i5iBVis.png"
          imageAlt="千禧公園的人臉噴泉"
          isRightImage={true}
        />

        <InfoCard
          content="「雲門」（Cloud Gate）是這顆大豆子的原名，現在大多數人都叫他「The Bean」。大豆子的位置是在芝加哥千禧公園西北角的AT&T廣場上，這件作品也是英國的Anish Kapoor在美國的第一件戶外公共藝術作品。 此作品是用不銹鋼打造，表面採鏡面的處理，將芝加哥獨特的天際線和藍天白雲表現的一覽無遺。遊客們不管從那個角度來觀看這件作品都可以看到三分之二的天空，代表著人們對於自然的嚮往；不僅如此，作者把天上的雲移到了地面，讓人覺得雲朵就在伸手可得的地方。而大豆子的下方向上凹成一個拱門的形狀，讓遊客走進大豆子裡，並且看到鏡中自己的影像和四周的建築融合為一，讓人體驗到和土地的親密感。"
          imageSrc="https://imgur.com/ZPWcWfX.png"
          imageAlt="大豆子"
          isRightImage={false}
        />
      </section>

      {/* 美食部分 */}
      <section className="food-section">
        <h4 className="title foodheader">美食</h4>
        <p>
          芝加哥擁有當地獨特美食，UIC同學或美國留學的同學及遊客一定都要去品嘗，獨特風味絕對超出想像!
        </p>
        <h4 className="title intro">Deep dish pizza</h4>
        <p className="food-attractions-pizza">
          UNO是芝加哥最道地傳統的深盤披薩店，發源於1943年。創辦人Ike Sewell
          是一位德大橄欖球球星，因為他在芝加哥找不到像樣的墨西哥餐廳，決定自己開設餐廳。他將大份量的優質肉類、新鮮奶酪、蔬菜和美味的調料結合義大利食譜，讓披薩成為一個正式的餐點，又薄又脆的凹形麵皮上先填上一層奶酪，再鋪滿番茄，美味的芝加哥深盤披薩（Deep
          Dish
          Pizza）誕生了，美國的披薩歷史也從此被改寫。後期很多餐廳都會模仿「UNO
          Pizzeria &
          Grill」的厚皮披薩，但沒有辦法完全複製屬於UNO的傳統美味。而到UNO你不是來吃最新鮮的，而是來吃最復古的。
        </p>

        <InfoCard
          title="Lou Malnati's Pizzeria "
          content={{
            first: "當地人強力推薦的Pizza",
            second:
              "Lou Malnati在1971年開設第一間店，截至2016年已經開設45間分店。他的第一家店開在猶太人區，而開幕日三月十七日為愛爾蘭人的節慶San Patrick's Day。Pizza是典型芝加哥風格，用厚厚的乳酪片以及滿滿的料，使他們的Pizza成為芝加哥地區最出名的披薩店之一 Lou Malnati從小跟著父親在一家披薩店幫忙，也因此得到父親對手工披薩的真傳。在成年之後，決定自己到芝加哥郊區開第一家店，在開幕日成功打響了在芝加哥厚片披薩第一人不敗的名聲。簡單的披薩，對材料不馬虎，麵皮手工打造，看似容易的披薩，其實有著Lou Malnati的堅持。這也是這間家庭餐廳在多年後，仍然維持義大利人家庭的傳統，並成功的移交給他的兒子，繼續在芝加哥地區發展。",
          }}
          imageSrc="https://imgur.com/y7G2iJb.png"
          imageAlt="Lou Malnati's Pizzeria"
          isRightImage={true}
        />

        <h4 className="title">Chicago Hot Dog</h4>
        <p className="food-attractions-hotdog">
          芝加哥式熱狗（Chicago Red
          Hot）起源於美國芝加哥的一種特色熱狗，在罌粟籽麵包為基底，加入全牛肉熱狗。裡面的配菜通常加有芥末、碎洋蔥、醃酸瓜醬、蒔蘿泡菜、番茄（切片或塊）、醃漬辣椒，芹菜籽調味鹽。因為內容物非常多種，因此芝加哥熱狗也被形容為「拖過花園（dragged
          through the
          garden）」。烹調方式大多數為蒸或水煮，碳烤則較少見（稱為char-dogs）。
        </p>
        <p className="food-attractions-hotdog">
          正統芝加哥式熱狗裡通常不會有番茄醬，第一很多芝加哥人和熱狗愛好者都認為絕對不可以加番茄醬。第二因為本身有各種醃漬物及食材，所以本身就很有味道了。所以有些芝加哥的熱狗攤販也不會提供番茄醬。
        </p>

        <InfoCard
          title="推薦店家：Portillo’s Hot Dog"
          content="Portillo’s Hot Dogs 創立於1963年，從一個小攤販到連鎖店，以多元化的方式來經營, 在美國各地設立不同類型的餐廳。如: 義大利餐廳Luigi House或是專賣早餐和午餐的Honey-Jam Cafe等等。"
          imageSrc="https://imgur.com/5wjIAah.png"
          imageAlt="Portillo’s Hot Dog"
          isRightImage={false}
        />

        <InfoCard
          title="Garrett Popcorn"
          content="於1949年發跡於芝加哥，是芝加哥最具有傳統特色的小吃，在芝加哥有10多家分店，大部分的店都位於Magnificent Mile附近不怕找不到。"
          imageSrc="https://imgur.com/kF7jNkS.png"
          imageAlt="Garrett Popcorn"
          isRightImage={true}
        />
      </section>
    </div>
  );
}

export default FoodAttractions;
