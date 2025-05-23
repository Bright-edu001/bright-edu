import React, { useEffect, useRef, useState } from "react";
import "./RankingNumberFlip.scss";

function RankingNumberFlip({ number, duration = 10000, start = 99 }) {
  const [displayNumber, setDisplayNumber] = useState(start);
  const [flipping, setFlipping] = useState(false);
  const prevNumber = useRef(start);

  useEffect(() => {
    if (number === prevNumber.current) return;
    setFlipping(true);
    let frame = 0;
    const totalFrames = 40; // 減慢數字跳動速度，總幀數增加
    const from = prevNumber.current;
    const to = number;
    const step = (from - to) / totalFrames;
    // 速度由慢到快：前期間隔長，後期間隔短
    function getFrameDuration(progress) {
      // 前期快，後期慢（ease-out）
      // progress: 0~1
      return (duration * (0.3 + 0.7 * Math.pow(progress, 2))) / totalFrames;
    }
    function animate() {
      frame++;
      const next = Math.round(from - step * frame);
      setDisplayNumber(next > to ? next : to);
      if (frame < totalFrames) {
        const progress = frame / totalFrames;
        setTimeout(animate, getFrameDuration(progress));
      } else {
        setFlipping(false);
        prevNumber.current = to;
      }
    }
    animate();
    // eslint-disable-next-line
  }, [number, duration]);

  return (
    <span className={`ranking-number-flip${flipping ? " flipping" : ""}`}>
      <span className="flip-inner perspective-up">{displayNumber}</span>
    </span>
  );
}

export default RankingNumberFlip;
