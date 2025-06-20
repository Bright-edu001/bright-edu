import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import {
  RankingNumberFlipWrapper,
  FlipInner,
} from "./RankingNumberFlip.styled";

function RankingNumberFlip({
  number,
  duration = 10000,
  start = 99,
  startAnimation,
  msu = false, // 若有 feature-card.msu 需求，可傳入 msu props
}) {
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
        return (duration * (0.1 + 0.9 * Math.pow(progress, 2))) / totalFrames;
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
    if (!startAnimation || number === prevNumber.current) return; // 只有當 startAnimation 為 true 才執行

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
  }, [number, animate, startAnimation]); // 將 startAnimation 加入依賴項

  return (
    <RankingNumberFlipWrapper
      className={`ranking-number-flip${flipping ? " flipping" : ""}`}
    >
      <FlipInner className={`flip-inner${msu ? " msu" : ""}`} $msu={msu}>
        {displayNumber}
      </FlipInner>
    </RankingNumberFlipWrapper>
  );
}

export default memo(RankingNumberFlip);
