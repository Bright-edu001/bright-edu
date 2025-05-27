import styled from "styled-components";

// 假設您的 SCSS 變數和 mixins 已經轉換或將在此處定義
const theme = {
  colors: {
    brownDark: "#211700", // $color-brown-dark
    gold: "#8c6b2c",
    navy: "#1c184a", // For h2 color: #1c184a;
  },
  spacing: {
    xs: "0.5rem", // $spacing-xs
    lg: "2rem", // $spacing-lg
    xxl: "3rem", // $spacing-xxl
  },
  fontSizes: {
    md: "1rem", // $font-size-md
    lg: "1.25rem", // $font-size-lg
  },
  mixins: {
    // 這些需要根據您的 _mixins.scss 檔案來定義
    // 例如: @include body-large;
    bodyLarge: `
      font-size: 1.75rem; // 這是一個範例，請根據您的 body-large mixin 調整
      font-weight: bold; // 這是一個範例
      line-height: 1.3; // 這是一個範例
    `,
    // 例如: @include value-style;
    valueStyle: `
      font-style: normal; // 這是一個範例，請根據您的 value-style mixin 調整
      font-weight: normal; // 這是一個範例
    `,
  },
};

export const PageH2 = styled.h2`
  ${theme.mixins.bodyLarge};
  color: ${theme.colors.navy};
  margin: ${theme.spacing.xxl} ${theme.spacing.lg};
  @media screen and (max-width: 700px) {
    margin: ${theme.spacing.xxl} ${theme.spacing.xs};
  }
`;

export const PageP = styled.p`
  font-weight: 500;
  max-width: 75%;
  font-size: ${theme.fontSizes.lg};
  line-height: 30px;
  text-align: left;
  margin: 0 auto;
  color: ${theme.colors.brownDark};
`;

export const PageUl = styled.ul`
  margin-top: ${theme.spacing.lg};
`;

export const MsmUl = styled.ul`
  list-style-type: disc;
  list-style-position: outside;
  text-align: left;
  padding-left: 1.5em;
  max-width: 75%;
  margin: 0 auto;
  margin-top: ${theme.spacing.lg};

  li {
    color: ${theme.colors.brownDark};
    font-weight: 900;
  }
`;

export const OutcomesList = styled.ul`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.brownDark};
  margin-left: 1.5em;
  line-height: 1.7;
`;

export const MsCoreCoursesRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const MsCoreCoursesCol = styled.div`
  flex: 1;
  margin: 0 1rem;
  color: ${theme.colors.gold};
  font-size: 1.1rem;
  font-weight: 500;
`;

export const GeneralMsCoreCoursesItem = styled.div`
  margin-bottom: 0.5em;
`;

export const MsAccountingFeatures = styled.div`
  margin-top: 2rem;

  h3 {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .ms-accounting-feature-item {
    margin-bottom: 0.5em;
    color: ${theme.colors.gold};
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

// Specific to .ms-accounting .ms-core-courses-row .ms-core-courses-item
export const MsAccountingSpecificCoreCoursesItem = styled.div`
  font-weight: 700;
  text-align: left;
  margin-bottom: ${theme.spacing.lg};
`;

export const MsAccountingCoreCoursesRow = styled.div`
  flex-direction: column;
  max-width: 70%;
  margin: 0 auto;

  // Styles for generic div children if necessary, SCSS was "div { color: $color-brown-dark; }"
  // This could be too broad. If it targets specific divs, use a more specific selector or style components directly.
  & > div {
    // Assuming direct children, adjust if needed
    color: ${theme.colors.brownDark};
  }

  // Applying styles to MsAccountingSpecificCoreCoursesItem when it's a child
  ${MsAccountingSpecificCoreCoursesItem} {
    // Styles are inherent to MsAccountingSpecificCoreCoursesItem,
    // but this ensures they apply if it's used as a child component here.
  }
`;

// Specific to .ms-accounting .core-courses-intro ul
export const MsAccountingCoreCoursesIntroUl = styled.ul`
  padding-left: 8rem;

  li {
    text-align: left;
    ${theme.mixins.valueStyle};
  }
`;
