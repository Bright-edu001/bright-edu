import React, { useState, useCallback } from "react";
import styled from "styled-components";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f0f0f0; /* 預設背景色 */
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition:
    opacity 0.5s ease-in-out,
    filter 0.5s ease-in-out;

  /* 根據載入狀態調整樣式 */
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  filter: ${(props) => (props.$isBlurry ? "blur(10px)" : "none")};
`;

/**
 * 漸進式圖片載入元件 (Progressive Image)
 * 支援 Lazy Loading 與 Blur-up 效果
 *
 * @param {object} props
 * @param {string} props.src - 原始高畫質圖片 URL
 * @param {string} [props.placeholderSrc] - 低畫質縮圖 URL (用於 Blur-up)
 * @param {string} props.alt - 圖片替代文字
 * @param {string} [props.className] - 自訂 class
 */
const ProgressiveImage = ({
  src,
  placeholderSrc,
  alt,
  className,
  width, // 可選：圖片原始寬度，用於預留 aspect-ratio 空間防止 CLS
  height, // 可選：圖片原始高度
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaceholderLoaded, setIsPlaceholderLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 使用 Intersection Observer 偵測圖片是否進入視窗
  const handleIntersect = useCallback(() => {
    setIsVisible(true);
  }, []);

  const options = React.useMemo(
    () => ({
      threshold: 0.1,
      rootMargin: "50px",
    }),
    [],
  );

  const imgRef = useIntersectionObserver(handleIntersect, options);

  // 當原圖載入完成時觸發
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // 當縮圖載入完成時觸發
  const handlePlaceholderLoad = () => {
    setIsPlaceholderLoaded(true);
  };

  // 當圖片載入失敗時觸發
  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  // 如果沒有提供 src，或者 src 為空，則不渲染
  if (!src && !placeholderSrc) return null;

  return (
    <ImageWrapper
      ref={imgRef}
      className={className}
      style={{
        // 設定 aspect-ratio 讓容器在圖片載入前預留正確高度（防止 CLS）
        // 若 className 的 CSS 已設定固定高度（如 200px），aspect-ratio 會被覆蓋而不生效
        ...(width && height ? { aspectRatio: `${width} / ${height}` } : {}),
        objectFit: "cover",
        ...props.style,
      }}
    >
      {/* 1. 渲染縮圖 (Placeholder) - 帶有模糊效果 */}
      {placeholderSrc && !hasError && (
        <StyledImg
          src={placeholderSrc}
          alt={alt}
          $isLoaded={isPlaceholderLoaded}
          $isBlurry={true}
          onLoad={handlePlaceholderLoad}
          style={{ zIndex: 1 }}
        />
      )}

      {/* 2. 渲染原圖 - 只有在進入視窗時才開始載入 (Lazy Load) */}
      {isVisible && src && !hasError && (
        <StyledImg
          src={src}
          alt={alt}
          $isLoaded={isLoaded}
          $isBlurry={false}
          onLoad={handleLoad}
          onError={handleError}
          style={{ zIndex: 2 }}
        />
      )}
    </ImageWrapper>
  );
};

export default ProgressiveImage;
