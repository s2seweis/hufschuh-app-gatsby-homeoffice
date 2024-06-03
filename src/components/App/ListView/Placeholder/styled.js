import styled from "styled-components";
import colors from "../../../../constants/colors";
import { spacing } from "../../../../constants/spacing";
import borderRadius from "../../../../constants/borderRadius";

export const PlaceholderWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  
  .svg-wrapper {
    width: ${spacing.space4xl};
    height: ${spacing.space4xl};

    border-radius: 99px;
    //border-style: solid;
    border-width: 1px;
    border-color: ${colors.greys["500"]};
    overflow: hidden;

    background-color: ${colors.greys["50"]};
  }

  svg {
    width: 132px;
    height: 132px;

    margin-left: -12px;
    margin-top: 12px;

    path {
      //stroke: ${colors.primary["80"]};
      fill: ${colors.greys["300"]};
    }
  }

  p {
    width: 90%;
    color: ${colors.greys["500"]};
    text-align: center;
  }
`;
