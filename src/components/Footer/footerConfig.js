import {
  COMMON_ROUTE_PATHS,
  UIC_MBA_LINKS,
  UIC_SCHOOL_LINKS,
  MSU_SCHOOL_LINKS,
  MSU_MSF_LINKS,
} from "../../routes/publicRoutePaths";

export const UIC_SECTION_CONFIG = {
  title: "UIC商學院碩士",
  className: "footer-links-uic",
  links: [
    {
      to: UIC_SCHOOL_LINKS.aboutUic,
      title: "UIC商學院介紹",
      label: "學校介紹",
    },
    {
      to: UIC_SCHOOL_LINKS.rankingsAwards,
      title: "UIC商學院排名與獎項",
      label: "排名與獎項",
    },
    {
      to: UIC_MBA_LINKS.application,
      title: "UIC MBA申請資訊",
      label: "MBA申請資訊",
    },
  ],
};

export const MSU_SECTION_CONFIG = {
  title: "MSU金融碩士",
  className: "footer-links-msu",
  links: [
    {
      to: MSU_SCHOOL_LINKS.aboutMsu,
      title: "MSU金融碩士介紹",
      label: "學校介紹",
    },
    {
      to: MSU_SCHOOL_LINKS.rankingsAwards,
      title: "MSU金融碩士排名與獎項",
      label: "排名與獎項",
    },
    {
      to: MSU_MSF_LINKS.msfApplication,
      title: "MSU MSF申請資訊",
      label: "MSF申請資訊",
    },
  ],
};

export const BLOG_LINK_CONFIG = {
  to: COMMON_ROUTE_PATHS.blogLink,
  title: "瀏覽所有活動與文章",
  label: "活動與文章",
};
