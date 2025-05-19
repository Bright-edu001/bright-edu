import React, { useState, useEffect } from "react";
import "./Hero.scss";

const heroImages = [
  {
    srcSet: [
      `${process.env.PUBLIC_URL}/images/banner/banner1-480.webp 480w`,
      `${process.env.PUBLIC_URL}/images/banner/banner1-768.webp 768w`,
      `${process.env.PUBLIC_URL}/images/banner/banner1-1280.webp 1280w`,
    ].join(", "),
    src: `${process.env.PUBLIC_URL}/images/banner/banner1-1280.webp`,
    alt: "Banner 1",
  },
  {
    srcSet: [
      `${process.env.PUBLIC_URL}/images/banner/banner2-480.webp 480w`,
      `${process.env.PUBLIC_URL}/images/banner/banner2-768.webp 768w`,
      `${process.env.PUBLIC_URL}/images/banner/banner2-1280.webp 1280w`,
    ].join(", "),
    src: `${process.env.PUBLIC_URL}/images/banner/banner2-1280.webp`,
    alt: "Banner 2",
  },
  {
    srcSet: [
      `${process.env.PUBLIC_URL}/images/banner/banner3-480.webp 480w`,
      `${process.env.PUBLIC_URL}/images/banner/banner3-768.webp 768w`,
      `${process.env.PUBLIC_URL}/images/banner/banner3-1280.webp 1280w`,
    ].join(", "),
    src: `${process.env.PUBLIC_URL}/images/banner/banner3-1280.webp`,
    alt: "Banner 3",
  },
  {
    srcSet: [
      `${process.env.PUBLIC_URL}/images/banner/banner4-480.webp 480w`,
      `${process.env.PUBLIC_URL}/images/banner/banner4-768.webp 768w`,
      `${process.env.PUBLIC_URL}/images/banner/banner4-1280.webp 1280w`,
    ].join(", "),
    src: `${process.env.PUBLIC_URL}/images/banner/banner4-1280.webp`,
    alt: "Banner 4",
  },
];

function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 判斷是否為第一張 Banner
  const isFirst = heroIndex === 0;

  return (
    <section className="hero">
      {" "}
      <img
        className="hero-img"
        srcSet={heroImages[heroIndex].srcSet}
        sizes="(max-width: 600px) 480px, (max-width: 900px) 768px, 1280px"
        src={heroImages[heroIndex].src}
        alt={heroImages[heroIndex].alt}
        width="1280"
        height="450"
        loading={isFirst ? "eager" : "lazy"}
        fetchpriority={isFirst ? "high" : undefined}
      />
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
