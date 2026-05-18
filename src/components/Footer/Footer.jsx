import React from "react";
import { Link } from "react-router-dom";
import getImageUrl from "../../utils/getImageUrl";
import FooterSection from "./FooterSection";
import FooterContact from "./FooterContact";
import {
  UIC_SECTION_CONFIG,
  MSU_SECTION_CONFIG,
  BLOG_LINK_CONFIG,
} from "./footerConfig";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer-wrapper" role="contentinfo">
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
                  src={getImageUrl("/images/footer/ICEF.webp")}
                  alt="ICEF認證徽章 - Bright Education"
                  width="120"
                  height="120"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          <FooterSection
            className={UIC_SECTION_CONFIG.className}
            title={UIC_SECTION_CONFIG.title}
            links={UIC_SECTION_CONFIG.links}
          />

          <FooterSection
            className={MSU_SECTION_CONFIG.className}
            title={MSU_SECTION_CONFIG.title}
            links={MSU_SECTION_CONFIG.links}
          />

          <div className="footer-section articles">
            <Link to={BLOG_LINK_CONFIG.to} title={BLOG_LINK_CONFIG.title}>
              {BLOG_LINK_CONFIG.label}
            </Link>
          </div>

          <FooterContact />
        </div>
        <div className="footer-bottom">
          <p>
            &copy; BRIGHT EDUCATION CORPORATION © {new Date().getFullYear()}{" "}
            ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
