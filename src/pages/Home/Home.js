import React, { useState, useEffect } from "react";
import "./Home.scss";
import ActionButton from "../../components/ActionButton/ActionButton";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { enrollmentEvents, news } from "../../data/blog";

const heroImages = [
  `${process.env.PUBLIC_URL}/images/banner/banner1.webp`,
  `${process.env.PUBLIC_URL}/images/banner/banner2.webp`,
  `${process.env.PUBLIC_URL}/images/banner/banner3.webp`,
  `${process.env.PUBLIC_URL}/images/banner/banner4.webp`,
];

function Home() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <section
        className="hero"
        style={{
          backgroundImage: `url(${heroImages[heroIndex]})`,
        }}
      >
        <div className="hero-bg-mask" />
        <div className="container container-aligned">
          <div className="hero-content">
            <h1>
              <span className="title-en">Apply Now for Fall 2025!</span>
              <span className="title-zh">2025秋季班熱烈招生中</span>
            </h1>
            <div className="hero-buttons">
              <a
                href="/uic-business-school/mba/application"
                className="btn course-btn with-arrow"
                title="申請UIC MBA項目"
              >
                UIC MBA 申請
              </a>
              <a
                href="/uic-business-school/ms/application"
                className="btn course-btn with-arrow"
                title="申請UIC MS項目"
              >
                UIC MS 申請
              </a>
              <a
                href="/msu-business-school/msf/application"
                className="btn course-btn with-arrow"
                title="申請MSU MSF項目"
              >
                MSU MSF 申請
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about-us" aria-label="關於我們">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <div className="text-content">
                <h2 className="section-title">Bright Education</h2>
                <p>
                  Bright Education
                  是專業的美國商科碩士申請輔導機構，致力於協助學生申請頂尖美國商學院項目。我們專注於UIC伊利諾大學芝加哥分校和MSU密西根州立大學的商科碩士申請。
                </p>
                <p>
                  我們提供一站式的申請服務，包括學校選擇、申請材料準備、面試輔導以及簽證指導，讓您的留學申請過程更加順利，提高錄取機會。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="school-rankings" aria-label="學校排名">
        <div className="container">
          <div className="feature-cards">
            <div className="feature-card">
              <h3>UIC Rankings</h3>
              <ul>
                <li>
                  <span className="ranking-title">Top</span>
                  <span className="ranking-number">1</span>
                  <p>The largest research university in Chicago</p>
                </li>
                <li>
                  <span className="ranking-title">Top</span>
                  <span className="ranking-number">39</span>
                  <p>Among Top Public School in the nation</p>
                </li>
                <li>
                  <span className="ranking-title">Top</span>
                  <span className="ranking-number">80</span>
                  <p>U.S. NEWS National Universities</p>
                </li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>MSU Rankings</h3>
              <ul>
                <li>
                  <span className="ranking-title">Top</span>
                  <span className="ranking-number">19</span>
                  <p>TFE Times Master's of Finance</p>
                </li>
                <li>
                  <span className="ranking-title">Top</span>
                  <span className="ranking-number">30</span>
                  <p>US News & World Report Top Public Schools</p>
                </li>
                <li>
                  <span className="ranking-title">Top</span>
                  <span className="ranking-number">63</span>
                  <p>Among Top Public School in the nation</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-area" id="blog-articles" aria-label="部落格文章">
        <div className="container">
          <div className="blog-header">
            <h2 className="section-title">文章Blog</h2>
            <ActionButton
              text="瀏覽其他"
              link="/blog"
              className="ranking-btn"
              title="瀏覽所有部落格文章"
            />
          </div>

          <div className="blog-section enrollment-section">
            <h3 className="subsection-title">招生活動</h3>
            <div className="course-cards">
              {enrollmentEvents.slice(0, 3).map((item) => (
                <ArticleCard key={item.id} item={item} imageType="enrollment" />
              ))}
            </div>
          </div>

          <div className="blog-section news-section">
            <h3 className="subsection-title">最新消息</h3>
            <div className="course-cards">
              {news.slice(0, 3).map((item) => (
                <ArticleCard key={item.id} item={item} imageType="news" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
