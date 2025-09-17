import React from "react";
import "./AboutUic.scss";
import GallerySection from "../../../components/GallerySection/GallerySection";
import ImageTextSection from "../../../components/ImageTextSection/ImageTextSection";
import ActionButton from "../../../components/ActionButton/ActionButton";
import getImageUrl from "../../../utils/getImageUrl";

function AboutUic() {
  // 校園圖片數據
  const campusImages = [
    {
      src: getImageUrl("/images/GallerySection/gallery1.webp"),
      alt: "UIC 校園圖片 1",
    },
    {
      src: getImageUrl("/images/GallerySection/gallery2.webp"),
      alt: "UIC 校園圖片 2",
    },
    {
      src: getImageUrl("/images/GallerySection/gallery3.webp"),
      alt: "UIC 校園圖片 3",
    },
  ];

  return (
    <div className="about-uic-page">
      <ImageTextSection
        title="UIC 伊利諾大學芝加哥分校"
        subtitle="學校介紹"
        imageUrl={getImageUrl("/images/Uic/UIC - 網站LOGO - 03.webp")}
        imageAlt="UIC 美國商學院"
        bgImageUrl={getImageUrl(
          "/images/Uic/banner/photo_6177208882540169915_y.webp"
        )}
      />

      <section className="intro" aria-label="學校介紹">
        <div className="container">
          <h2>UIC學校簡介</h2>
          <p>
            伊利諾大學芝加哥分校（University of Illinois Chicago, 簡稱
            UIC）位於美國第三大城市芝加哥，是一所 國家資助的公立研究型大學 (R1
            Carnegie Classification)。
          </p>
          <p>
            UIC 成立於 1982 年（由 Illinois Medical District 與 Chicago Circle
            校區合併），最早源自 1859 年的 UIC 藥學院 (College of Pharmacy)。
          </p>
          <p style={{ marginBottom: "3rem" }}>
            目前，伊利諾大學系統共有三個校區：芝加哥、厄巴納香檳
            (Urbana-Champaign)、春田 (Springfield)。其中 UIC
            是芝加哥唯一的大型公立研究型大學。
          </p>
          <h2>校園與地理位置</h2>
          <p>
            UIC 校園位於伊利諾州的芝加哥市中心西側，距離金融區與 Loop 僅 10
            分鐘車程，學生能直接接觸芝加哥的金融、醫療、科技與創新產業，實習與就業機會十分豐富。
          </p>
        </div>
      </section>

      <section className="stats" aria-label="學校數據">
        <div className="container">
          <div className="stats-card-school">
            <h3>UIC 美國商學院</h3>
            <ul className="left-aligned">
              <li>
                <span className="label">所在省州</span>
                <span className="value">伊利諾州</span>
              </li>
              <li>
                <span className="label">所在城市</span>
                <span className="value">芝加哥</span>
              </li>
              <li>
                <span className="label">學校類型</span>
                <span className="value">美國公立研究型大學</span>
                <span className="stats-value-detail">
                  (最高 R1 等級研究型大學：Doctoral Universities – Very High
                  Research Activity)
                </span>
              </li>
              <li>
                <span className="label">國際學生比例</span>
                <span className="value">約20%</span>
              </li>
              <li>
                <span className="label">學院數量</span>
                <span className="value">16間學院 + 1間附屬醫院</span>
              </li>
              <li>
                <span className="label">校園面積</span>
                <span className="value">233英畝</span>
                <span className="stats-value-detail">
                  （芝加哥最大，約132個足球場大小）
                </span>
              </li>
              <li>
                <span className="label">在校學生</span>
                <span className="value">約 35,000 人</span>
              </li>
              <li>
                <span className="label">師生比例</span>
                <span className="value">1:17</span>
                <span className="stats-value-detail">
                  (小班教學，學習體驗更佳)
                </span>
              </li>
            </ul>
          </div>
          <div className="stats-card-ranking">
            <div className="card-header">
              <div className="header-content">
                <h3>UIC 各項美國大學排名</h3>
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
                  <span className="text">TOP</span>
                  <span className="number">1</span>
                </span>
                <span className="value">芝加哥區最大規模研究型大學</span>
              </li>
              <li>
                <span className="label">
                  <span className="text">TOP</span>
                  <span className="number">39</span>
                </span>
                <span className="value">
                  全美公立大學
                  <br /> U.S. News 2025 Top Public Schools
                </span>
              </li>
              <li>
                <span className="label">
                  <span className="text">TOP</span>
                  <span className="number">21</span>
                </span>
                <span className="value">
                  全美公立大學排行榜 <br />
                  《WSJ》/《THE》大學數據
                </span>
              </li>
              <li>
                <span className="label">
                  <span className="text">TOP</span>
                  <span className="number">80</span>
                </span>
                <span className="value">
                  2025 全美大學排行
                  <br />
                  U.S.NEWS
                </span>
              </li>
              <li>
                <span className="label">
                  <span className="text">TOP</span>
                  <span className="number">81</span>
                </span>
                <span className="value">
                  2020 全美大學排行
                  <br />
                  泰晤士高等教育世界大學排名
                </span>
              </li>
              <li>
                <span className="label">
                  <span className="text">TOP</span>
                  <span className="number">7</span>
                </span>
                <span className="value">
                  The Best Value 最具價值就讀大學排名 《WSJ》/《THE》-
                  (排名僅次於哈佛大學)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="business-school" aria-label="商學院介紹">
        <div className="container">
          <h2>UIC 商學院 UIC Business</h2>
          <p>
            UIC 商學院是芝加哥核心地帶的重要學術機構，與城市中的
            金融、醫療、科技產業緊密連結。
          </p>
          <ul>
            <li>擁有 AACSB 商業與會計雙重國際認證（全美前 5%）</li>
            <li>
              碩士課程專業領域包括：
              <ul>
                <li>MBA</li>
                <li>會計 (Accounting)</li>
                <li>企業分析 (Business Analytics)</li>
                <li>財務 (Finance)</li>
                <li>管理資訊系統 (MIS)</li>
                <li>管理學 (Management)</li>
                <li>行銷 (Marketing)</li>
              </ul>
            </li>
            <li>
              超過 3,000 位 MBA 校友活躍於全球各地，許多人任職於 Fortune 500
              企業與知名會計師事務所
            </li>
            <li>
              MBA 特點： UIC MBA 致力於培養學生的
              跨領域管理能力，強調實務導向與全球視野。學生能在芝加哥這座國際商業與金融中心，獲得寶貴的實習與就業機會。
            </li>
          </ul>
        </div>
      </section>

      <GallerySection images={campusImages} ariaLabel="校園圖片" />
    </div>
  );
}

export default AboutUic;
