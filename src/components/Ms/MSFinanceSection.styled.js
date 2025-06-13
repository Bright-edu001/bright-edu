import styled from "styled-components";
import {
  spacingXs,
  spacingSm,
  spacingMd,
  spacingLg,
  colorNav,
  colorUic,
  colorBlack,
  fontSizeMd,
} from "../../styles/variables.js"; // Changed to .js extension

export const ProgramDetailsSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: ${spacingSm};
`;

export const OutcomesParagraph = styled.p`
  // from .msf-outcomes p, .reasons-to-choose p
  // @include value-style; // Assuming this mixin applies common text styles, handle manually or create a base component
  margin-bottom: ${spacingMd};
  font-weight: 500;
  font-size: 18px;
  text-align: left;
  color: ${colorBlack};
`;

export const ReasonsToChooseParagraph = styled(OutcomesParagraph)`
  // from .reasons-to-choose p
  font-size: 18px;
  font-weight: 700;
`;

export const SectionTitle = styled.h3`
  // from .core-courses-section h3, .course-arrangement h3, .company-courses h3, .why-uic-msf h3, .msf-outcomes h3, .reasons-to-choose h3
  color: ${colorNav};
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  margin-bottom: ${spacingXs};
`;

export const ReasonsToChooseTitle = styled(SectionTitle)`
  // from .reasons-to-choose h3
  text-align: left;
`;

export const WhyUicMsfDiv = styled.div`
  // from .why-uic-msf
  ul {
    list-style: none;
    padding-left: 0; // Reset default padding
    li {
      font-size: 18px;
      margin-bottom: ${spacingMd};
      color: ${colorUic};
      text-align: left;
      &.label-style {
        font-size: 16px;
        font-weight: 500;
        color: ${colorBlack};
        margin-top: ${spacingLg};
      }
      ul {
        padding-left: ${spacingMd}; // Indent nested list
        li {
          font-size: ${fontSizeMd};
          color: ${colorBlack};
          margin-top: ${spacingXs};
          margin-bottom: 0;
          font-weight: 500;
          list-style-type: disc; // Add disc for nested lists if desired
        }
      }
    }
  }
`;

export const MsfOutcomesDiv = styled.div`
  // from .msf-outcomes
  ul {
    list-style: disc; // Assuming outcomes list should have discs
    padding-left: ${spacingMd}; // Indent list
    li {
      font-size: 18px;
      margin-bottom: ${spacingMd};
      color: ${colorUic}; // Or colorBlack if preferred for this list
      text-align: left;
    }
  }
`;

export const CompanyCoursesDiv = styled.div`
  // from .company-courses
  .company-logos {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    gap: ${spacingMd};
    margin: ${spacingMd} 0;
  }
`;

export const CourseArrangementDiv = styled.div`
  // from .course-arrangement
  ul {
    list-style: disc;
    padding-left: ${spacingMd}; // Indent list
    li {
      font-size: 18px;
      font-weight: 700;
      color: ${colorBlack};
      text-align: left;
      margin-bottom: ${spacingSm};
    }
  }
`;

export const CoreCoursesSectionDiv = styled.div`
  // from .core-courses-section
`;

export const CoreCoursesTitle = styled(SectionTitle)`
  // from .core-courses-title
  text-align: left;
  // @include value-style; // Apply styles manually if needed
`;

export const CoreCourseParagraphDiv = styled.div`
  // from .core-courses-pragaph
  margin-bottom: ${(props) => (props.hasContent ? spacingMd : "0")};
  p {
    // @include value-style;
    font-size: 18px;
    font-weight: 500;
    color: ${colorBlack};
    text-align: left;
    margin-bottom: ${spacingMd}; // Default margin for paragraphs within
    &:last-child {
      margin-bottom: 0; // Remove margin for the last paragraph if it's the only one or part of multiple
    }
  }
`;

export const CoreCoursesIntroDiv = styled.div`
  // from .core-courses-intro
  margin-bottom: ${(props) => (props.hasContent ? spacingMd : "0")};
  ul {
    list-style: none;
    padding-left: 0;
    li {
      font-size: 18px;
      font-weight: 500;
      color: ${colorBlack};
      text-align: left;
      margin-bottom: ${spacingXs};
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const CoreCoursesListDiv = styled.div`
  // from .core-courses-list
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: ${(props) => (props.hasCoreCourses ? spacingMd : "0")} 0;
  gap: ${spacingLg};
  align-items: stretch; // Added to make columns in a row have the same height

  @media (max-width: 768px) {
    display: flex; // Explicitly set display to flex for mobile
    flex-direction: column;
    gap: ${(props) =>
      props.hasCoreCourses
        ? spacingLg
        : "0"}; // Keep gap if has courses, else 0
  }
`;

export const CoreCoursesColDiv = styled.div`
  // from .core-courses-col
  display: flex;
  flex-direction: column;
  height: 100%; // To fill the stretched height from the parent grid's align-items: stretch
  width: 100%; // Ensure it takes full width of the grid column
`;

export const CoreCourseItemDiv = styled.div`
  // from .core-course-item
  margin-bottom: ${spacingMd};
  border: 1px solid ${colorNav}; // Example border, adjust as needed
  padding: ${spacingSm};
  border-radius: 4px; // Example border-radius
  width: 100%; // Ensure it takes full width of the column
  height: 150px; // Fixed height for the card, adjust as needed
  display: flex;
  flex-direction: column;
  justify-content: center; // Align content to the center within the fixed height

  .core-course-zh {
    font-size: 18px;
    font-weight: 700;
    color: ${colorUic};
    text-align: left;
  }
  .core-course-en {
    font-size: ${fontSizeMd};
    color: ${colorUic};
    margin-bottom: ${spacingXs};
    text-align: left;
    font-style: italic; // Added from previous SCSS inspection
  }
  .core-course-desc {
    font-size: ${fontSizeMd};
    color: ${colorBlack};
    font-weight: 500;
    text-align: left;
    // If description should take remaining space and potentially scroll:
    // flex-grow: 1;
    // overflow-y: auto;
  }
`;

export const CoreCourseFootParagraph = styled.p`
  // from .core-courses-foot
  // @include value-style;
  font-size: 18px; // Assuming default from value-style
  font-weight: 500; // Assuming default from value-style
  color: ${colorBlack}; // Assuming default from value-style
  text-align: left;
  margin-bottom: ${spacingXs};
`;

export const ResponsiveImg = styled.img`
  // from .responsive-img (though not in MSFinanceSection.scss, it's used in the JS)
  max-width: 100%;
  height: auto;
  display: block; // or inline-block depending on layout needs
`;
