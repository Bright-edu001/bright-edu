import React from "react";
import "./AboutMsu.scss";
import ImageTextSection from "../../../components/ImageTextSection/ImageTextSection";

function AboutMsu() {
  return (
    <div className="about-msu-page">
      <ImageTextSection
        title="MSU 密西根州立大學"
        imageUrl={`${process.env.PUBLIC_URL}/images/Msu/Michigan State University_01.webp`}
        imageAlt="Michigan State University"
      />
      <section className="intro" aria-label="學校介紹">
        <div className="container">
          <p>
            伊利諾大學芝加哥分校（University of Illinois
            Chicago，簡稱UIC）位於美國伊利諾芝加哥，始建於1867年，是國家資助的公立大學。伊利諾大學共有三個校區：芝加哥校區、香檳校區和春田校區。目前芝加哥校區是芝加哥地區占地規模最大的大學，有約34,000名在校學生、2,800名教職員工；師生比例低至1:19，教學品質優良。
          </p>
          <p>
            UIC
            除了商學院外，還擁有全美國最大的醫療學院、教育學院、工學院、都市計畫學院、衛生學院、人文科學學院、護理學院、藥劑學院等16所學院，我們一直是全美研究經費排名前50的機構之一，目前伊利諾大學芝加哥分校
            (UIC) 也在全世界建立了相當好的教學聲譽。
          </p>
          <p>
            此外，UIC的課外活動供應充足。體育設施包括健身房，排球場、羽球場和壁球場，室內跑道，攀岩牆和一個室外球場，其中包括214,000平方英尺的足球和棒球比賽用的人造草皮。一個單獨的室外設施設有網球場和籃球場，以及游泳池，桑拿和健康中心。
          </p>
        </div>
      </section>
      <section className="stats" aria-label="學校數據">
        <div className="container">
          <div className="stats-card-school">
            <h3>基本資料 Facts at a Glance</h3>
            <ul className="left-aligned">
              <li>
                <span className="label">學院數量</span>
                <span className="value">17個學院</span>
              </li>
              <li>
                <span className="label">課程數量</span>
                <span className="value">超過200個學術課程</span>
              </li>
              <li>
                <span className="label">校園面積</span>
                <span className="value">約5,300英畝</span>
              </li>
              <li>
                <span className="label">全球校友人數</span>
                <span className="value">超過630,000人</span>
              </li>
              <li>
                <span className="label">師生比</span>
                <span className="value">1:16</span>
              </li>
              <li>
                <span className="label">NCAA Division I 體育校隊</span>
                <span className="value">Spartans（斯巴達人）</span>
              </li>
              <li>
                <span className="label">學生人數</span>
                <span className="value">約52,000人</span>
                <ul className="sub-list">
                  <li>本科生約41,234人</li>
                  <li>研究生約10,855人</li>
                </ul>
              </li>
              <li>
                <span className="label">學生遍及</span>
                <span className="value">
                  來自美國所有50個州及133個國家和地區
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="details" aria-label="學校詳細資料">
        <div className="reasearch">
          <h3>學術研究 Research</h3>
          <div className="research-content">
            <div className="research-funding">
              <h4>年研究經費達到</h4>
              <div className="funding-amount">
                約$9.32億美元 <span className="funding-year">(2024年資料)</span>
              </div>
            </div>

            <div className="research-facilities">
              <h4>擁有2個全美獨一無二的研究設施，包括</h4>
              <div className="facility">
                <p>Facility for Rare Isotope Beams (FRIB)</p>
              </div>
            </div>

            <div className="research-areas">
              <h4>主要研究領域</h4>
              <ul className="areas-list">
                <li>生命科學</li>
                <li>健康醫療</li>
                <li>能源</li>
                <li>永續發展</li>
                <li>農業</li>
                <li>教育</li>
              </ul>
            </div>

            <div className="research-centers">
              <h4>MSU校內擁有</h4>
              <p>數百個活躍的研究中心與機構</p>
            </div>
          </div>
        </div>
        <div className="michigan-contribution">
          <h3>密西根州貢獻 Making a Stronger Michigan</h3>
          <div className="contribution-content">
            <p>
              密西根州立大學在教育、研究和社區服務方面的努力，為整個密西根州創造了超過20億美元的經濟影響力。MSU積極與產業、政府和社區合作，推動農業發展、教育創新、健康照護及先進製造等領域的進步。
            </p>
            <p>
              大學持續與社區及產業夥伴合作，促進人才培育與經濟成長，支持密西根州各地區的繁榮與永續發展。
            </p>
          </div>
        </div>
        <div className="global-impact">
          <h3>全球影響力 Global Impact</h3>
          <div className="global-impact-content">
            <p>
              MSU的國際化發展遍及全球，致力於推動全球教育、研究與跨國合作，並強調學生的國際學習體驗。
            </p>

            <ul className="impact-list">
              <li>
                擁有275個以上的海外學習計畫（Education
                Abroad），涵蓋超過60個國家。
              </li>
              <li>在全球140個國家擁有合作夥伴與研究項目。</li>
              <li>研究領域涵蓋全球糧食安全、氣候變遷、健康與教育創新等。</li>
              <li>國際學生人數位居全美大學前列。</li>
            </ul>

            <div className="diversity-stats">
              <ul className="diversity-list">
                <li>25.5% 多元族裔背景 （或 不同族裔背景/有色人種）</li>
                <li>8.5% 國際學生</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutMsu;
