import React, { useState, useRef, useEffect, memo } from "react";
import PropTypes from "prop-types";

/**
 * 優化圖片元件
 *
 * 顯示圖片時，先以模糊的佔位圖作為預覽，直到真正的圖片載入完成。
 * 使用 IntersectionObserver 進行懶加載，並支援可選的屬性以調整載入行為及響應式圖片。
 *
 * 可選屬性包含：
 * - `loading` ("lazy" | "eager") – 預設為 "lazy"。
 * - `fetchpriority` ("auto" | "high" | "low")。
 * - `srcSet`, `sizes`, `className`, `placeholder`。
 *
 * 預設會在圖片進入視窗且載入完成前，使用簡單的灰色 SVG 佔位圖。
 */

const OptimizedImage = memo(
  ({
    src,
    alt,
    width,
    height,
    className,
    loading = "lazy",
    fetchpriority,
    srcSet,
    sizes,
    // 預設為簡單灰色佔位符
    placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=",
    ...props
  }) => {
    const [loaded, setLoaded] = useState(false); // 圖片是否載入完成
    const [error, setError] = useState(false); // 圖片是否載入失敗
    const [isInView, setIsInView] = useState(false); // 圖片是否進入視窗
    const imgRef = useRef();

    // 使用 IntersectionObserver 檢查圖片是否進入視窗
    useEffect(() => {
      const img = imgRef.current;
      if (!img) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      });

      observer.observe(img);
      return () => observer.disconnect();
    }, []);

    // 當圖片開始載入後，處理載入完成與錯誤事件
    useEffect(() => {
      const img = imgRef.current;
      if (!img || !isInView) return;

      const handleLoad = () => setLoaded(true); // 圖片載入成功
      const handleError = () => setError(true); // 圖片載入失敗

      if (img.complete) {
        setLoaded(true);
      } else {
        img.addEventListener("load", handleLoad);
        img.addEventListener("error", handleError);
      }

      return () => {
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleError);
      };
    }, [src, isInView]);

    return (
      <div
        className={`image-container ${className || ""}`}
        style={{ position: "relative" }}
      >
        {/* 載入前顯示佔位圖 */}
        {!loaded && !error && (
          <img
            src={placeholder}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(2px)",
              transition: "opacity 0.3s",
            }}
          />
        )}
        {/* 真正的圖片，載入完成後顯示 */}
        <img
          ref={imgRef}
          src={isInView ? src : undefined}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          fetchpriority={fetchpriority}
          srcSet={srcSet}
          sizes={sizes}
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.3s",
            width: "100%",
            height: "auto",
          }}
          {...props}
        />
        {/* 載入失敗時顯示錯誤訊息 */}
        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f3f4f6",
              color: "#6b7280",
              minHeight: "200px",
            }}
          >
            圖片載入失敗
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

// 屬性型別驗證
OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  loading: PropTypes.oneOf(["lazy", "eager"]),
  fetchpriority: PropTypes.oneOf(["auto", "high", "low"]),
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  placeholder: PropTypes.string,
};

export default OptimizedImage;
