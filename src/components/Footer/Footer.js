import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section brand">
              <div className="footer-brand">
                <a
                  href="https://www.icef.com/agency/001bG00000EAMX3QAP"
                  title="ICEF認證"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/footer/ICEF.webp`}
                    alt="ICEF認證徽章 - Bright Education"
                    width="120"
                    height="120"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>

            <div className="footer-section footer-links-uic">
              <p className="section-title">UIC商學院碩士</p>
              <ul>
                <li>
                  <a
                    href="/uic-business-school/uic/about-uic"
                    title="UIC商學院介紹"
                  >
                    學校介紹
                  </a>
                </li>
                <li>
                  <a
                    href="/uic-business-school/uic/rankings-awards"
                    title="UIC商學院排名與獎項"
                  >
                    排名與獎項
                  </a>
                </li>
                <li>
                  <a
                    href="/uic-business-school/mba/application"
                    title="UIC MBA申請資訊"
                  >
                    MBA申請資訊
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-section footer-links-msu">
              <p className="section-title">MSU金融碩士</p>
              <ul>
                <li>
                  <a
                    href="/msu-business-school/msu/about-msu"
                    title="MSU金融碩士介紹"
                  >
                    學校介紹
                  </a>
                </li>
                <li>
                  <a
                    href="/msu-business-school/msu/rankings-awards"
                    title="MSU金融碩士排名與獎項"
                  >
                    排名與獎項
                  </a>
                </li>
                <li>
                  <a
                    href="/msu-business-school/msf/application"
                    title="MSU MSF申請資訊"
                  >
                    MSF申請資訊
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section articles">
              <a href="/blog" title="瀏覽所有活動與文章">
                活動與文章
              </a>
            </div>
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
                  <span itemProp="telephone">07-7227407/02-77362190</span>
                </p>
              </div>
              <div className="social-icons">
                <a
                  href="tel:077227407"
                  title="撥打 Bright Education 電話"
                  aria-label="撥打電話 07-7227407"
                >
                  <img
                    src="https://imgur.com/vfi3sBo.png"
                    alt="whatsapp 圖示"
                    width="24"
                    height="24"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; BRIGHT EDUCATION CORPORATION © 2025 ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
