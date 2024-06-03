import styled from "styled-components";
import { spacing } from "../../../../constants/spacing";
import colors from "../../../../constants/colors";
import borderRadius from "../../../../constants/borderRadius";
import fontSize from "../../../../constants/typeScale";
import { GatsbyImage } from "gatsby-plugin-image";
import dimensions from "../../../../constants/dimensions";

export const HelpModalWrapper = styled.div`
  position: absolute;
  top: 2.5%;
  left: 5%;
  width: 90%;
  height: 95%;
  //max-height: 95vh;
  max-width: ${dimensions.desktopWidth};

  z-index: 5;
  box-sizing: border-box;

  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;

  margin: auto;
  padding: ${spacing.spaceXs};

  background-color: hsla(0, 100%, 100%, 90%);

  @media only screen and (min-width: ${dimensions.desktopWidth}) {
    left: auto;
    right: auto;
  }

  .text {
    // 100% -  2 * modal padding - image margin top - button row height
    height: calc((100% - 2 * 12px - 24px - 46px) * 0.25);
    margin: 0;
    padding: ${spacing.spaceXs};

    border-style: solid;
    border-width: 2px;
    border-color: ${colors.greys["500"]};
    border-radius: ${borderRadius.medium};
  }

  .image {
    //100% -  2 * modal padding - image margin top - button row height
    height: calc((100% - 2 * 12px - 24px - 46px) * 0.7);
    width: 100%;
    margin-top: ${spacing.spaceMd};
    display: flex;
    justify-content: center;

    img {
      object-fit: contain !important;
    }

    .gatsby-image-wrapper {
      width: 100%;
      height: auto;
    }
  }

  .close {
    position: absolute;
    right: 8px;

    margin: 0 0 0 0;
    padding: 0;

    height: 36px;
    width: 36px;

    border-style: solid;
    border-radius: 8px;
    border-color: pink;
    font-size: ${fontSize.textXl};
    cursor: pointer;
    background-color: white;
  }

  .button-row {
    margin-top: ${spacing.space2xs};
    display: flex;
    justify-content: space-between;
  }

  .help-block-container {
    display: flex;
    flex-direction: ${(props) => (props.horizontal ? "row" : "column")};
  }

  .left {
    width: 50%;

    padding: 0 ${spacing.spaceXs};
  }

  .right {
    width: 50%;

    padding: 0 ${spacing.spaceXs};
  }

  .right {
    .gatsby-image-wrapper {
      max-height: 90vh;
    }
  }
`;

export const HelpBlock = styled.div`
  padding: 0 ${spacing.spaceXs};
  max-height: 70vh;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;

  border-style: solid;
  border-width: 2px;
  border-color: ${colors.greys["500"]};
  border-radius: ${borderRadius.medium};

  background-color: white;

  p {
    font-size: ${fontSize.textLg};
    margin: ${spacing.spaceXs} 0;
  }

  .gatsby-image-wrapper {
    div {
      width: auto;
    }
    img {
    }
  }

  @media (max-height: 380px) {
    p {
      font-size: ${fontSize.textMd};
    }
  }
`;

export const SmallImage = styled(GatsbyImage)`
  width: ${(props) => props.width};
  //height: auto;

  margin: ${(props) => `0 0 0 calc(0.5 * (100% - ${props.width}))`};

  img {
    width: ${(props) => props.width};
    //height: auto;
    object-fit: contain;
  }
`;
