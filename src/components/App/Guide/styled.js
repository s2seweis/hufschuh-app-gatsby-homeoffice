import styled from "styled-components";
import { spacing } from "../../../constants/spacing";
import fontSize from "../../../constants/typeScale";
import { GatsbyImage } from "gatsby-plugin-image";
import dimensions from "../../../constants/dimensions";

export const GuideStyles = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100%;
  z-index: 3;

  overflow: hidden;

  display: ${(props) => (props.show ? "display" : "none")};
`;

export const GuideNav = styled.div`
  position: absolute;
  bottom: 5%;
  left: 0;
  width: 90vw;
  max-width: ${dimensions.desktopWidth};
  height: 20%;
  z-index: 4;
  margin-right: calc(0.5 * (100vw - min(90vw, ${dimensions.desktopWidth})));
  margin-left: calc(0.5 * (100vw - min(90vw, ${dimensions.desktopWidth})));

  display: flex;
  justify-content: space-around;
  align-items: center;

  background-color: white;

  button {
    height: ${spacing.spaceXl};
    display: flex;
    align-items: center;
  }
`;

export const GuideClose = styled.div`
  position: absolute;
  z-index: 6;
  // width of guide window  - own width - space that should be on the right of self
  padding: ${spacing.spaceXs} 0 0
    calc(min(90vw, ${dimensions.desktopWidth}) - 28px - ${spacing.spaceXs});
  display: ${(props) => (props.canClose ? "flex" : "none")};

  button {
    background-color: transparent;
    border-style: none;
    cursor: pointer;
    padding: 0;
    margin: 0;

    svg {
      height: 32px;
      width: 32px;
    }
  }
`;

export const GuidePageContainer = styled.div`
  position: absolute;
  top: ${(props) => props.height * 0.05}px;
  bottom: 0;
  width: 100vw;

  height: ${(props) => props.height * 0.7}px;

  display: grid;
  grid-template-columns: repeat(100, 100%);

  transition: all 200ms ease-in-out;

  z-index: 4;
`;

export const GuidePage = styled.div`
  width: 90vw;
  height: ${(props) => props.height * 0.7}px;
  max-width: ${dimensions.desktopWidth};

  display: flex;
  flex-direction: column;

  margin-right: calc(0.5 * (100vw - min(90vw, ${dimensions.desktopWidth})));
  margin-left: calc(0.5 * (100vw - min(90vw, ${dimensions.desktopWidth})));
  //box-sizing: border-box;

  .content {
    width: 100%;
    height: 100%;

    background-color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .guide-text {
    margin: auto;
    width: 100%;
    //min-height: 40%;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: ${fontSize.textXl};

    p {
      width: 80%;
    }

    @media (max-width: 420px) {
      font-size: ${fontSize.textMd};
    }
  }

  .guide-image {
    margin: auto;
    max-height: 50%;
    width: 80%;

    display: flex;
    justify-content: center;

    .gatsby-image-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: -webkit-fill-available;
    }
  }

  @media (max-width: 800px) {
    .guide-text {
      //min-height: 55%;
    }

    .guide-image {
      max-height: 52%;
    }
  }

  @media (max-width: 400px) {
    .guide-text {
      min-height: 55%;
    }

    .guide-image {
      max-height: 45%;
    }
  }
`;

export const StyledGuideImage = styled(GatsbyImage)`
  height: 100%;

  img {
    object-fit: contain !important;
    height: 90%;
  }
`;
