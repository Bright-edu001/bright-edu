import React, { useState, useRef, useEffect, memo } from "react";

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
    placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=", // 簡單的灰色佔位符
    ...props
  }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
      const img = imgRef.current;
      if (!img) return;

      const handleLoad = () => setLoaded(true);
      const handleError = () => setError(true);

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
    }, [src]);

    return (
      <div
        className={`image-container ${className || ""}`}
        style={{ position: "relative" }}
      >
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
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
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

export default OptimizedImage;
