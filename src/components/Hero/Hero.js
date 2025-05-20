import React, { useState, useEffect, useRef } from "react";
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
  const imgRef = useRef(null);
  // const [currentSrc, setCurrentSrc] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  // // 監控加載的圖片
  // useEffect(() => {
  //   if (imgRef.current) {
  //     // 初始設置
  //     setCurrentSrc(imgRef.current.currentSrc);

  //     // 監聽圖片載入完成事件
  //     const updateCurrentSrc = () => {
  //       setCurrentSrc(imgRef.current.currentSrc);
  //     };
  //     imgRef.current.addEventListener("load", updateCurrentSrc);

  //     return () => {
  //       if (imgRef.current) {
  //         imgRef.current.removeEventListener("load", updateCurrentSrc);
  //       }
  //     };
  //   }
  // }, [heroIndex]);

  // 判斷是否為第一張 Banner
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
          ref={imgRef}
          className="hero-img"
          src={heroImages[heroIndex].src}
          alt={heroImages[heroIndex].alt}
          width="1280"
          height="450"
          loading={isFirst ? "eager" : "lazy"}
          fetchpriority={isFirst ? "high" : undefined}
        />
      </picture>
      {/* {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "5px",
            fontSize: "12px",
            zIndex: 100,
          }}
        >
          當前載入圖片: {currentSrc.split("/").pop()}
        </div>
      )} */}
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
