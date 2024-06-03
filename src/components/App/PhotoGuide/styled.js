import styled from "styled-components";
import { spacing } from "../../../constants/spacing";
import borderRadius from "../../../constants/borderRadius";
import colors from "../../../constants/colors";
import fontSize from "../../../constants/typeScale";
import breakpoints from "../../../constants/breakpoints";

export const PhotoGuideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing.spaceMd} 0;

  section {
    width: 100%;
    //min-height: ${spacing.space4xl};

    padding: ${spacing.spaceMd};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    border-radius: ${borderRadius.medium};

    .icon {
      position: absolute;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;

      padding: ${spacing.space3xs};
      margin: -${spacing.spaceLg} 0 0 -12px;
      background-color: white;
      border-radius: ${borderRadius.medium};
      box-shadow: ${colors.greys["600"]} 2px 2px 5px;
    }

    .content {
      display: flex;
      flex-direction: row;

      justify-content: space-between;

      padding-top: ${spacing.spaceMd};
    }
  }

  * + section {
    margin-top: ${spacing.spaceMd};
  }

  .thumbnails {
    background-color: ${colors.red.background};

    .content {
      justify-content: space-between;
    }

    .hint {
      width: 40%;

      font-weight: bold;
      font-size: ${fontSize.textLg};

      // border-style: solid;
      // border-width: 1px;
      // border-radius: ${borderRadius.medium};
      // border-color: ${colors.greys["250"]};
    }

    .gatsby-image-wrapper {
      // also adjust maxWidth in graphQL query
      height: ${spacing.space2xl};
      width: ${spacing.space2xl};

      @media (min-width: ${breakpoints.big}) {
        height: ${spacing.space3xl};
        width: ${spacing.space3xl};
      }
    }
  }

  .instructions {
    background-color: ${colors.yellow.background};

    p {
      margin: 0;
    }
  }

  .image-preview {
    background-color: ${colors.green.background};

    .content {
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;

      button {
        margin: ${spacing.spaceMd} auto 0 auto;
      }

      .single-image-container {
        display: flex;
        justify-content: center;
        
        img {
          width: 50%;
        }
      }
    }

    .placeholder {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        margin-top: 0;
        text-align: center;
        // color: ${colors.greys["800"]};
      }
    }
  }

  .selection-confirmed {
    margin: 0;
  }

  .button-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .button-row-button {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      button {
        margin: 1rem;
      }
    }
  }
`;
