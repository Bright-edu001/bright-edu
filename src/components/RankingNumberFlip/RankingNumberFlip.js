import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import "./RankingNumberFlip.scss";

function RankingNumberFlip({ number, duration = 10000, start = 99 }) {
  const [displayNumber, setDisplayNumber] = useState(start);
  const [flipping, setFlipping] = useState(false);
  const prevNumber = useRef(start);
  const animationRef = useRef(null);

  // 使用 useCallback 優化動畫函數
  const animate = useCallback(
    (from, to, totalFrames) => {
      let frame = 0;
      const step = (from - to) / totalFrames;

      function getFrameDuration(progress) {
        return (duration * (0.3 + 0.7 * Math.pow(progress, 2))) / totalFrames;
      }

      function animateFrame() {
        frame++;
        const next = Math.round(from - step * frame);
        setDisplayNumber(next > to ? next : to);

        if (frame < totalFrames) {
          const progress = frame / totalFrames;
          animationRef.current = setTimeout(
            animateFrame,
            getFrameDuration(progress)
          );
        } else {
          setFlipping(false);
          prevNumber.current = to;
          animationRef.current = null;
        }
      }

      animateFrame();
    },
    [duration]
  );

  useEffect(() => {
    if (number === prevNumber.current) return;

    // 清除現有動畫
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    setFlipping(true);
    const totalFrames = 40;
    const from = prevNumber.current;
    const to = number;

    animate(from, to, totalFrames);

    // 清理函數
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [number, animate]);

  return (
    <span className={`ranking-number-flip${flipping ? " flipping" : ""}`}>
      <span className="flip-inner perspective-up">{displayNumber}</span>
    </span>
  );
}

export default memo(RankingNumberFlip);
