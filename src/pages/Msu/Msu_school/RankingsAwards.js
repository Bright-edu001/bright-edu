import React from "react";
import "./RankingsAwards.scss";
import ImageTextSection from "../../../components/ImageTextSection/ImageTextSection";

function MsRankingsAwards() {
  return (
    <div className="rankings-awards-page">
      <ImageTextSection
        title="MSU 密西根州立大學"
        subtitle="排名與獎項"
        imageUrl="https://imgur.com/SvcpDCa.png"
        imageAlt="排名與獎項"
      />
      <section className="ranking">
        <h3>全國及全球排名亮點</h3>
        <p>《美國新聞與世界報導》</p>
        <p>U.S. News & World Report 2024</p>
        <ul>
          <li>全美綜合大學排名第63名</li>
          <li>公立大學排名第30名</li>
        </ul>
        <p>Times Higher Education World University Rankings 2025</p>
        <ul>
          <li>全球排名第122名</li>
          <li>美國大學排名第42名</li>
        </ul>
        <p>QS 世界大學排名</p>
        <p>Quacquarelli Symonds, QS 2025</p>
        <ul>
          <li>全球排名第152名</li>
          <li>美國大學排名第32名</li>
        </ul>
        <p>Academic Ranking of World Universities</p>
        <p>Shanghai 2024</p>
        <ul>
          <li>全球排名第151-200名</li>
          <li>美國大學排名第51-59名</li>
        </ul>
        <p className="highlight">
          教育學院（College of
          Education）連續29年被評為全美教育研究生院排名第1（特別是在初等教育、中等教育、教育行政和課程教學等領域名列全美第一）。
        </p>
      </section>
      <section className="management">
        <h3>商學院與管理領域（Business & Management）</h3>
        <p>供應鏈管理</p>
        <p>Supply Chain Management</p>
        <ul>
          <li>本科排名：全美第1名</li>
          <li>研究所排名：全美第2名</li>
        </ul>
        <p>生產與營運管理</p>
        <p>Production / Operations Management</p>
        <ul>
          <li>本科排名：全美第3名</li>
          <li>研究所排名：全美第8名</li>
        </ul>
        <div className="class">
          <div className="class-item">
            <div className="class-title-zh">會計</div>
            <div className="class-title-en">Accounting</div>
            <ul>
              <li className="highlight">本科排名全美第25名</li>
            </ul>
          </div>
          <div className="class-item">
            <div className="class-title-zh">管理學</div>
            <div className="class-title-en">Management</div>
            <ul>
              <li className="highlight">本科排名全美第15名</li>
            </ul>
          </div>
          <div className="class-item">
            <div className="class-title-zh">商學線上課程</div>
            <div className="class-title-en">Online Business, Graduate</div>
            <ul>
              <li className="highlight">全美第8名</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="engineering">
        <h3>學術與研究榮譽</h3>
        <ul>
          <li>
            被《華爾街日報》（Wall Street Journal/College Pulse
            2024）評為全美公立大學第39名。
          </li>
          <li>
            在全球最佳大學排名（U.S. News Best Global Universities
            2024）中，MSU名列全球前100名。
          </li>
          <li>擁有11位國家科學院（National Academy of Sciences）院士。</li>
          <li>
            校內設有Facility for Rare Isotope
            Beams（FRIB），為全球領先的粒子物理與核科學研究中心之一。
          </li>
          <li>
            為美國大學協會（Association of American Universities,
            AAU）成員，象徵其在研究與學術領域的卓越地位。
          </li>
        </ul>
      </section>
    </div>
  );
}

export default MsRankingsAwards;
