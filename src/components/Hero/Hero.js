import React, { useState, useEffect } from "react";
import "./Hero.scss";

const heroImages = [
  `${process.env.PUBLIC_URL}/images/banner/banner1.webp`,
  `${process.env.PUBLIC_URL}/images/banner/banner2.webp`,
  `${process.env.PUBLIC_URL}/images/banner/banner3.webp`,
  `${process.env.PUBLIC_URL}/images/banner/banner4.webp`,
];

function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImages[heroIndex]})` }}
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
  );
}

export default Hero;
