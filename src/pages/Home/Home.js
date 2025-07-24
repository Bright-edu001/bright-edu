import "./Home.scss";
import Hero from "../../components/Hero/Hero";
import ActionButton from "../../components/ActionButton/ActionButton";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import RankingNumberFlip from "../../components/RankingNumberFlip/RankingNumberFlip";
import React, { useState, useContext } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { BlogContext } from "../../context/BlogContext";

function Home() {
  const { enrollmentEvents, news, loading, error } = useContext(BlogContext);
  const [animateRanking, setAnimateRanking] = useState(false);
  const featuresRef = useIntersectionObserver(() => setAnimateRanking(true), {
    threshold: 0.1,
  });

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

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

      <section
        className="features"
        id="school-rankings"
        aria-label="學校排名"
        ref={featuresRef}
      >
        <div className="container">
          <div className="feature-cards">
            <div className="feature-card-outside">
              <img
                className="feature-logo-img-uic"
                src="/images/home/UIC - 網站LOGO - 03.webp"
                alt="UIC Logo"
                width="500"
                height="58"
              />
              <div className="feature-card uic">
                <img
                  className="feature-bg-img"
                  src="/images/home/網站 - Rankings (透明框)_01.webp"
                  alt="UIC背景圖"
                />
                <h3>UIC Rankings</h3>
                <ul>
                  <li>
                    <div className="ranking-info">
                      {" "}
                      <span className="ranking-title">TOP</span>
                      <RankingNumberFlip
                        number={1}
                        start={100}
                        startAnimation={animateRanking}
                      />
                    </div>
                    <p>The largest research university in Chicago</p>
                  </li>
                  <li>
                    <div className="ranking-info">
                      {" "}
                      <span className="ranking-title">TOP</span>
                      <RankingNumberFlip
                        number={39}
                        start={100}
                        startAnimation={animateRanking}
                      />
                    </div>
                    <p>Among Top Public School in the nation</p>
                  </li>
                  <li>
                    <div className="ranking-info">
                      {" "}
                      <span className="ranking-title">TOP</span>
                      <RankingNumberFlip
                        number={80}
                        start={100}
                        startAnimation={animateRanking}
                      />
                    </div>
                    <p>U.S. NEWS National Universities</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="feature-card-outside">
              <img
                className="feature-logo-img-msu"
                src="/images/home/Michigan State University_01.webp"
                alt="MSU Logo"
                width="500"
                height="58"
              />
              <div className="feature-card msu">
                <img
                  className="feature-bg-img"
                  src={`/images/home/網站 - Rankings (透明框)_02.webp`}
                  alt="MSU背景圖"
                  style={{
                    opacity: 0.55,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                />
                <h3>MSU Rankings</h3>
                <ul>
                  <li>
                    <div className="ranking-info">
                      {" "}
                      <span className="ranking-title">TOP</span>
                      <RankingNumberFlip
                        number={19}
                        start={100}
                        startAnimation={animateRanking}
                        msu={true}
                      />
                    </div>
                    <p>TFE Times Master's of Finance</p>
                  </li>
                  <li>
                    <div className="ranking-info">
                      {" "}
                      <span className="ranking-title">TOP</span>
                      <RankingNumberFlip
                        number={30}
                        start={100}
                        startAnimation={animateRanking}
                        msu={true}
                      />
                    </div>
                    <p>US News & World Report Top Public Schools</p>
                  </li>
                  <li>
                    <div className="ranking-info">
                      {" "}
                      <span className="ranking-title">TOP</span>
                      <RankingNumberFlip
                        number={63}
                        start={100}
                        startAnimation={animateRanking}
                        msu={true}
                      />
                    </div>
                    <p>Among Top Public School in the nation</p>
                  </li>
                </ul>
              </div>
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
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {!loading &&
                !error &&
                enrollmentEvents
                  .slice(0, 3)
                  .map((item) => (
                    <ArticleCard
                      key={item.id}
                      item={item}
                      imageType="enrollment"
                    />
                  ))}
            </div>
          </div>

          <div className="blog-section news-section">
            <h3 className="subsection-title">最新消息</h3>
            <div className="course-cards">
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {!loading &&
                !error &&
                news
                  .slice(0, 3)
                  .map((item) => (
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
