import React from "react";
import getImageUrl from "../../utils/getImageUrl";

function FooterContact() {
  return (
    <div className="footer-section about">
      <div
        className="contact"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <p className="contact-title">聯絡我們</p>
        <p
          className="contact-address"
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
        >
          <span itemProp="streetAddress">
            高雄市前鎮區二聖一路168號
          </span>
        </p>
        <p className="contact-phone">
          <span itemProp="telephone">
            07-7227407
            <span className="desktop-phone-separator"> /</span>
            <span className="desktop-phone-secondary">
              02-77362190
            </span>
          </span>
        </p>
      </div>
      <div className="social-icons">
        <a
          className="phone-contact-link"
          href="tel:077227407"
          title="撥打 Bright Education 電話"
          aria-label="撥打電話 07-7227407"
        >
          <img
            className="phone-icon"
            src={getImageUrl(`/images/footer/phone.webp`)}
            alt="電話圖示"
            width="24"
            height="24"
            loading="lazy"
          />
        </a>
        <a
          className="line-contact-link"
          href="https://lin.ee/1WTpxdf"
          title="聯絡我們的LINE"
          aria-label="聯絡我們的LINE"
        >
          <img
            className="line-icon"
            src={getImageUrl(`/images/footer/line.webp`)}
            alt="line 圖示"
            width="30"
            height="30"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  );
}

export default FooterContact;
