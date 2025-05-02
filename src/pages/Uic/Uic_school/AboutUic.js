import React from "react";
import "./AboutUic.scss";
import ImageTextSection from "../../../components/ImageTextSection/ImageTextSection";
import GallerySection from "../../../components/GallerySection/GallerySection";
import ActionButton from "../../../components/ActionButton/ActionButton"; // 引入新組件

function AboutUic() {
  // 校園圖片數據
  const campusImages = [
    {
      src: "/media/UIC/uic_school/uic-campus-1.png",
      alt: "UIC 校園圖片 1",
    },
    {
      src: "/media/UIC/uic_school/uic-campus-2.png",
      alt: "UIC 校園圖片 2",
    },
    {
      src: "/media/UIC/uic_school/uic-campus-3.png",
      alt: "UIC 校園圖片 3",
    },
  ];

  return (
    <div className="about-uic-page">
      <ImageTextSection
        title="伊利諾大學芝加哥分校"
        subtitle="UIC 美國商學院"
        imageUrl="/media/Uic/On-the-way-amico.png"
        imageAlt="UIC 美國商學院"
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
            <h3>UIC 美國商學院</h3>
            <ul className="left-aligned">
              <li>
                <span className="label">建校年份</span>
                <span className="value">1964年</span>
              </li>
              <li>
                <span className="label">所在省州</span>
                <span className="value">伊利諾州</span>
              </li>
              <li>
                <span className="label">學校類型</span>
                <span className="value">美國公立大學</span>
              </li>
              <li>
                <span className="label">國際學生比例</span>
                <span className="value">20%</span>
              </li>
              <li>
                <span className="label">學院數量</span>
                <span className="value">16間學院、1間醫院</span>
              </li>
              <li>
                <span className="label">所在城市</span>
                <span className="value">
                  芝加哥（芝加哥唯一公立研究型大學）
                </span>
              </li>
              <li>
                <span className="label">校園面積</span>
                <span className="value">
                  233英畝（芝加哥最大，約132個足球場大小）
                </span>
              </li>
            </ul>
          </div>
          <div className="stats-card-ranking">
            <div className="card-header">
              <div className="header-content">
                <h3>UIC 各項排名</h3>
                <ActionButton
                  text="更多排名"
                  link="/uic-business-school/uic/rankings-awards"
                  className="ranking-btn"
                />
              </div>
            </div>
            <ul className="left-aligned">
              <li>
                <span className="label">
                  <span className="text">Top</span>
                  <span className="number">1</span>
                </span>
                <span className="value">芝加哥區最大規模研究型大學</span>
              </li>
              <li>
                <span className="label">
                  <span className="text">Top</span>
                  <span className="number">39</span>
                </span>
                <span className="value">全美公立大學 U.S.NEWS.</span>
              </li>
              <li>
                <span className="label">
                  <span className="text">Top</span>
                  <span className="number">21</span>
                </span>
                <span className="value">
                  全美公立大學排行榜《華爾街日報》/《泰晤士報高等教育》大學數據
                </span>
              </li>
              <li>
                <span className="label">
                  <span className="text">Top</span>
                  <span className="number">80</span>
                </span>
                <span className="value">全美大學排行 U.S.NEWS</span>
              </li>
              <li>
                <span className="label">
                  <span className="text">Top</span>
                  <span className="number">81</span>
                </span>
                <span className="value">
                  全美大學排行 2020泰晤士高等教育世界大學排名
                </span>
              </li>
              <li>
                <span className="label">
                  <span className="text">Top</span>
                  <span className="number">7</span>
                </span>
                <span className="value">
                  The Best Value 最具價值就讀大學排名2018
                  《華爾街日報》/《泰晤士報高等教育》- (排名僅次於哈佛大學)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="business-school" aria-label="商學院介紹">
        <div className="container">
          <h3>商學院</h3>
          <p>
            伊利諾大學芝加哥分校 (UIC)
            是由卡內基基金會評選的88所研究型一類美國大學之一。伊利諾大學芝加哥分校
            (UIC)
            在2005年時，在超過650所大學的國家科學基金會的研究經費統計排名中，位居第48名，超過了芝加哥大學。
          </p>
          <p>
            UIC商學院是國際教學商業&會計認證AACSB的商學院
            (全美前5%)，是一個國際認證教學品質，教學流程，教師教材等都優良的院所，其研究院碩士班的專業有：管理
            (MBA)
            、會計、管理系、企業分析和財務系。目前排名最佳商業MBA課程第65名。
          </p>
          <p>
            UIC商學院從1994年到目前己經有超過三千多位MBA的畢業生。 1996年，UIC
            成立了為期一年的MBA課程，目的為培養學生全方位的當代管理技能，使學生能夠在當今的全球商業環境中有效競爭。
          </p>
        </div>
      </section>

      <GallerySection images={campusImages} ariaLabel="校園圖片" />
    </div>
  );
}

export default AboutUic;
