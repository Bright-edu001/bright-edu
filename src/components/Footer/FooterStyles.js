import styled from "styled-components";
import { Layout, Row, Col } from "antd";

const { Footer: AntFooter } = Layout;

const colorNav = "#1c184a";
const colorGrayDark = "#717185";
const colorGrayUltralight = "#f6f6f9";
const colorUic = "#c71432";
const spacingSm = "1rem";
const fontSizeMd = "18px";
const fontSizeSm = "16px";

export const FooterWrapper = styled(AntFooter)`
  background: ${colorGrayUltralight};
  padding: ${spacingSm} 0;
  transform: translateZ(0);

  .container {
    width: 100%;
    padding: 0;
  }

  @media screen and (max-width: 1024px) {
    .container {
      margin-left: 0;
      padding: 0 2rem;
    }
  }

  @media (max-width: 850px) {
    padding: 20px 0;

    .container {
      margin: 0 auto;
      padding: 0 15px;
    }
  }
`;

export const FooterContent = styled(Row)`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin: 2rem 0 1rem;
  text-align: left;
  min-height: 140px;

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    min-height: 290px;
  }
`;

export const FooterSection = styled(Col)`
  min-height: 120px;

  &.footer-links-uic,
  &.footer-links-msu {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 150px;

    .section-title {
      margin-bottom: ${spacingSm};
      color: ${colorNav};
      font-size: ${fontSizeMd};
      font-weight: 700;
      width: 180px;
      height: 24px;
      display: flex;
      align-items: center;
      margin-left: 0;
      margin-right: 0;
      text-align: left;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      min-height: 96px;

      li {
        height: 24px;
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        transition: color 0.3s ease;

        &:hover {
          text-decoration: none;
          color: ${colorUic};
        }

        a {
          color: ${colorGrayDark};
          font-size: ${fontSizeSm};
          text-decoration: none;
          transition: color 0.3s ease;

          &:hover {
            text-decoration: none;
            color: ${colorUic};
          }
        }
      }
    }
  }

  &.about {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .contact {
      margin-bottom: 20px;

      .contact-title {
        color: ${colorNav};
        font-size: ${fontSizeMd};
        font-weight: 700;
        text-align: left;
        min-height: 24px;
        display: flex;
        align-items: center;
      }

      .contact-address,
      .contact-phone {
        width: 100%;
        color: ${colorGrayDark};
        font-size: ${fontSizeSm};
        font-style: normal;
        text-align: left;
        margin-left: 0;
        margin-right: 0;
        min-height: 20px;
        display: flex;
        align-items: center;
      }
    }

    .social-icons {
      display: flex;
      gap: 15px;
      align-self: flex-start;
      margin-top: -1rem;
      transform: translateZ(0);

      a {
        .phone-icon {
          width: 24px;
          height: 24px;
          min-width: 24px;
          min-height: 24px;
          object-fit: contain;
          aspect-ratio: 1 / 1;
        }

        .line-icon {
          width: 30px;
          height: 30px;
          min-width: 30px;
          min-height: 30px;
          object-fit: contain;
          margin-top: -3px;
          aspect-ratio: 1 / 1;
        }
      }
    }
  }

  &.brand {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      aspect-ratio: 1 / 1;
    }

    .footer-brand img {
      width: 120px;
      height: 120px;
      max-width: 120px;
      min-width: 120px;
      min-height: 120px;
      object-fit: contain;
    }
  }

  &.articles {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 0;
    width: 150px;
    min-height: 24px;

    a {
      color: ${colorNav};
      font-size: 18px;
      font-weight: bold;
      text-decoration: none;
      display: inline-block;
      line-height: 24px;

      &:hover {
        text-decoration: none;
      }
    }
  }

  @media (max-width: 850px) {
    flex: none;
    width: 100%;
    text-align: center;

    &.footer-links-uic,
    &.footer-links-msu,
    &.articles {
      display: none;
      height: 0;
      min-height: 0;
      padding: 0;
      margin: 0;
      border: none;
      overflow: hidden;
      visibility: hidden;
    }

    &.about {
      order: 1;
      align-items: center;
      padding-bottom: 0;

      .contact {
        margin-bottom: 0.2rem;
        text-align: center;

        .contact-title,
        .contact-address,
        .contact-phone {
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          max-width: none;
          justify-content: center;
        }
      }

      .social-icons {
        margin-top: 0.1rem;
        align-self: center;
        justify-content: center;
        width: 100%;
      }
    }

    &.brand {
      order: 2;
      margin: 0;
      justify-content: center;
    }
  }
`;

export const FooterBottom = styled.div`
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin: 0;
    color: ${colorNav};
    font-size: 18px;
    line-height: 1.5;
    text-align: left;
  }

  .about {
    padding-bottom: 32px;
  }
`;
