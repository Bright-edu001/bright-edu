import styled from "styled-components";

const colorUic = "#c71432";
const colorMsu = "#19453c";

export const RankingNumberFlipWrapper = styled.span`
  display: inline-block;
  perspective: 400px;
  min-width: 2em;
  min-height: 1.5em;
  vertical-align: middle;

  &.flipping .flip-inner {
    animation: none;
  }
`;

export const FlipInner = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: 40px;
  padding: 0.1em 0.5em;
  transform-origin: initial;
  animation: none;
  color: ${(props) => (props.$msu ? colorMsu : colorUic)};

  &.perspective-up {
    animation: none;
    transform-origin: initial;
  }
`;
