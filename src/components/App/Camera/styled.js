import styled from "styled-components";
import { spacing } from "../../../constants/spacing";
import fontSize from "../../../constants/typeScale";
import borderRadius from "../../../constants/borderRadius";
import colors from "../../../constants/colors";
import dimensions from "../../../constants/dimensions";

export const CameraContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.landscape ? "row" : "column")};
  height: 100%;
  max-width: ${dimensions.desktopWidth};

  .message-block {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 6;

    background-color: hsla(0, 0%, 0%, 75%);

    .message {
      position: absolute;
      top: calc((100vh - ${spacing.space5xl}) / 2);
      left: calc((100vw - ${spacing.space7xl}) / 2);

      display: flex;
      flex-direction: column;
      justify-content: center;

      box-sizing: border-box;
      padding: ${spacing.spaceMd};
      width: ${spacing.space7xl};
      height: ${spacing.space5xl};
      z-index: 7;

      background-color: white;
      border-style: solid;
      border-color: red;
    }

    button {
      //margin-top: ${spacing.spaceSm};
      margin: auto;
    }
  }

  .orientation-block {
    position: absolute;
    width: 100vw;
    height: 100%;
    z-index: 11;
    max-width: ${dimensions.desktopWidth};

    // will be overwritten if orientation is supported by media queries
    // display: ${(props) =>
      props.orientSupport ? "flex" : "none !important"};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: white;

    p {
      margin: ${spacing.spaceMd} ${spacing.space2xs} 0 ${spacing.space2xs};
    }

    .title {
      font-weight: bold;
      font-size: ${fontSize.textLg};
    }

    .hint {
      font-size: ${fontSize.textMd};
    }

    @media screen and (orientation: landscape) {
      display: ${(props) => (props.landscape ? "none" : "flex")};
    }

    @media screen and (orientation: portrait) {
      display: ${(props) => (props.landscape ? "flex" : "none")};
    }
  }
`;

export const CameraWrapper = styled.div`
  height: ${(props) => (props.landscape ? "100vh" : "82%")};
  width: 100vw;
  max-width: ${dimensions.desktopWidth};

  background-color: black;

  video {
    width: 100%;
    height: 100%;
  }
`;

export const HelpButton = styled.button`
  position: absolute;
  top: ${spacing.spaceMd};
  left: calc(50% - ${spacing.spaceMd} / 2);
  z-index: 4;

  width: ${spacing.spaceLg};
  height: ${spacing.spaceLg};
  display: flex;
  justify-content: center;
  align-items: center;

  border-style: solid;
  border-width: 1px;
  border-color: white;
  border-radius: 999px;
  background-color: ${colors.greys["400"]};
  color: white;
  font-weight: 600;
  font-size: ${fontSize.textXl};
  cursor: pointer;
`;

export const CameraMenu = styled.div`
  height: ${(props) => (props.landscape ? "100vh" : "18vh")};
  width: ${(props) => (props.landscape ? "18vw" : "100vw")};

  display: flex;
  flex-direction: ${(props) => (props.landscape ? "column" : "row")};
  justify-content: center;
  align-items: center;

  background-color: black;

  .thumbnail {
    margin: auto;

    width: ${spacing.space2xl};
    max-height: ${spacing.space2xl};

    grid-area: 1 / 1 / 2 / 2;
  }

  .takePictureButton {
    margin: auto;

    grid-area: 1 / 2 / 2 / 3;
    width: ${spacing.space2xl};
    max-height: ${spacing.space2xl};
    min-height: ${spacing.space2xl};
    padding: 0;

    border-style: none;
    border-radius: 999px;
    cursor: pointer;
    background-color: white;

    &:hover,
    &:focus {
      background-color: ${colors.greys["250"]};
    }
  }

  .picture-preview {
    margin: auto;
    grid-area: 1 / 3 / 2 / 4;

    .picture-count {
      position: absolute;
      // similar to img's dimensions
      width: ${spacing.space2xl};
      height: ${spacing.space2xl};
      display: flex;
      align-items: center;
      justify-content: center;

      color: white;
      font-weight: 600;
      font-size: ${fontSize.textXl};
      background-color: hsla(0, 0%, 0%, 0.5);
      text-shadow: black 2px 2px;
    }

    .picture-container {
      // similar to picture count's dimensions
      width: ${spacing.space2xl};
      height: ${spacing.space2xl};

      border-radius: ${borderRadius.small};
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
