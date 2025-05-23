import "./Home.scss";
import Hero from "../../components/Hero/Hero";
import ActionButton from "../../components/ActionButton/ActionButton";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import RankingNumberFlip from "../../components/RankingNumberFlip/RankingNumberFlip";
import { enrollmentEvents, news } from "../../data/blog";

function Home() {
  // Hero carousel logic moved to <Hero /> component

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

      <section className="features" id="school-rankings" aria-label="學校排名">
        <div className="container">
          <div className="feature-cards">
            <div className="feature-card uic">
              <h3>UIC Rankings</h3>
              <ul>
                <li>
                  <span className="ranking-title">Top</span>
                  <RankingNumberFlip number={1} start={100} />
                  <p>The largest research university in Chicago</p>
                </li>
                <li>
                  <span className="ranking-title">Top</span>
                  <RankingNumberFlip number={39} start={100} />
                  <p>Among Top Public School in the nation</p>
                </li>
                <li>
                  <span className="ranking-title">Top</span>
                  <RankingNumberFlip number={80} start={100} />
                  <p>U.S. NEWS National Universities</p>
                </li>
              </ul>
            </div>
            <div className="feature-card msu">
              <h3>MSU Rankings</h3>
              <ul>
                <li>
                  <span className="ranking-title">Top</span>
                  <RankingNumberFlip number={19} start={100} />
                  <p>TFE Times Master's of Finance</p>
                </li>
                <li>
                  <span className="ranking-title">Top</span>
                  <RankingNumberFlip number={30} start={100} />
                  <p>US News & World Report Top Public Schools</p>
                </li>
                <li>
                  <span className="ranking-title">Top</span>
                  <RankingNumberFlip number={63} start={100} />
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
