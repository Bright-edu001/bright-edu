import React, { useState, useEffect } from "react";
import "./Hero.scss";

const heroImages = [
  {
    srcSet: [
      `/images/banner/banner1-480.webp 480w`,
      `/images/banner/banner1-768.webp 768w`,
      `/images/banner/banner1-1280.webp 1280w`,
    ].join(", "),
    src: `/images/banner/banner1-1280.webp`,
    alt: "Banner 1",
  },
  {
    srcSet: [
      `/images/banner/banner2-480.webp 480w`,
      `/images/banner/banner2-768.webp 768w`,
      `/images/banner/banner2-1280.webp 1280w`,
    ].join(", "),
    src: `/images/banner/banner2-1280.webp`,
    alt: "Banner 2",
  },
  {
    srcSet: [
      `/images/banner/banner3-480.webp 480w`,
      `/images/banner/banner3-768.webp 768w`,
      `/images/banner/banner3-1280.webp 1280w`,
    ].join(", "),
    src: `/images/banner/banner3-1280.webp`,
    alt: "Banner 3",
  },
  {
    srcSet: [
      `/images/banner/banner4-480.webp 480w`,
      `/images/banner/banner4-768.webp 768w`,
      `/images/banner/banner4-1280.webp 1280w`,
    ].join(", "),
    src: `/images/banner/banner4-1280.webp`,
    alt: "Banner 4",
  },
];

function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);
  // const [currentSrc, setCurrentSrc] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const isFirst = heroIndex === 0;

  return (
    <section className="hero">
      <picture>
        <source
          media="(max-width: 480px)"
          srcSet={
            heroImages[heroIndex].srcSet.split(",")[0].trim().split(" ")[0]
          }
        />
        <source
          media="(max-width: 768px)"
          srcSet={
            heroImages[heroIndex].srcSet.split(",")[1].trim().split(" ")[0]
          }
        />
        <source
          media="(min-width: 769px)"
          srcSet={
            heroImages[heroIndex].srcSet.split(",")[2].trim().split(" ")[0]
          }
        />
        <img
          className="hero-img"
          src={heroImages[heroIndex].src}
          alt={heroImages[heroIndex].alt}
          width="1280"
          height="600"
          loading={isFirst ? "eager" : "lazy"}
          fetchPriority={isFirst ? "high" : "auto"}
        />
      </picture>

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
