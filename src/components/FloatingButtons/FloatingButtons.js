import React from "react";
import styles from "./FloatingButtons.module.scss";

const FloatingButtons = () => (
  <div className={styles.floatingButtons}>
    <a
      href="https://lin.ee/1WTpxdf"
      className={styles.floatingBtn}
      target="_blank"
      rel="noopener noreferrer"
      title="加入LINE"
      aria-label="加入LINE"
    >
      <img src="https://imgur.com/3OVDChF.png" alt="LINE" />
    </a>
    <a
      href="tel:077227407"
      className={styles.floatingBtn}
      title="撥打電話"
      aria-label="撥打電話"
    >
      <img src="https://imgur.com/6gVSyd1.png" alt="電話" />
    </a>
  </div>
);

export default FloatingButtons;
