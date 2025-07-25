import React from "react";
import { Layout } from "antd";
import getAssetUrl from "../../utils/getAssetUrl";
import {
  FooterWrapper,
  FooterContent,
  FooterSection,
  FooterBottom,
} from "./FooterStyles";

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <>
      <FooterWrapper as={AntFooter} role="contentinfo">
        <div className="container">
          <FooterContent>
            <FooterSection className="brand">
              <div className="footer-brand">
                <a
                  href="https://www.icef.com/agency/001bG00000EAMX3QAP"
                  title="ICEF認證"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    src={getAssetUrl("/images/footer/ICEF.webp")}
                    alt="ICEF認證徽章 - Bright Education"
                    width="120"
                    height="120"
                    loading="lazy"
                  />
                </a>
              </div>
            </FooterSection>

            <FooterSection className="footer-links-uic">
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
            </FooterSection>
            <FooterSection className="footer-links-msu">
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
            </FooterSection>

            <FooterSection className="articles">
              <a href="/blog" title="瀏覽所有活動與文章">
                活動與文章
              </a>
            </FooterSection>
            <FooterSection className="about">
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
                    className="phone-icon"
                    src={`/images/footer/phone.webp`}
                    alt="電話圖示"
                    width="24"
                    height="24"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://lin.ee/1WTpxdf"
                  title="聯絡我們的LINE"
                  aria-label="聯絡我們的LINE"
                >
                  <img
                    className="line-icon"
                    src={`/images/footer/line.webp`}
                    alt="line 圖示"
                    width="30"
                    height="30"
                    loading="lazy"
                  />
                </a>
              </div>
            </FooterSection>
          </FooterContent>
          <FooterBottom>
            <p>
              &copy; BRIGHT EDUCATION CORPORATION © 2025 ALL RIGHTS RESERVED
            </p>
          </FooterBottom>
        </div>
      </FooterWrapper>
    </>
  );
}

export default Footer;
