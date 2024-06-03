import styled from "styled-components";
import dimensions from "../../../../constants/dimensions";
import { spacing } from "../../../../constants/spacing";
import { GatsbyImage } from "gatsby-plugin-image";
import fontSize from "../../../../constants/typeScale";
import colors from "../../../../constants/colors";
import borderRadius from "../../../../constants/borderRadius";
import breakpoints from "../../../../constants/breakpoints";

export const HorseListWrapper = styled.section`
  height: 100vh;
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: hidden;

  transition: height 0.7s ease-in-out;

  .add-horse {
    position: fixed;
    bottom: ${spacing.spaceXs};
    padding: 0;

    display: flex;
    align-items: center;
    align-self: center;

    background-color: white;
    border-style: none;
    border-width: 0px;
    cursor: pointer;
    border-radius: 999999px;

    &:hover,
    &:focus {
      background-color: ${colors.pink["20"]};
    }
  }
`;

export const HorseProfilePic = styled(GatsbyImage)`
  // default styles for gatsby-image are inline
  // !important necessary to overwrite them, or use style prop
  height: 128px !important;
`;

export const HorseUl = styled.ul`
  width: calc(100% - 6px);
  // padding for box shadow
  padding: 0 0 6px 0;
  margin-bottom: 64px;

  overflow-y: scroll;

  list-style: none;

  li + li {
    margin-top: ${spacing.spaceXs};
  }

  li {
    display: grid;
    grid-template-columns: auto minmax(auto, 100px);
    grid-column-gap: ${spacing.spaceXs};
  }

  .horse-button {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: ${spacing.spaceSm} ${spacing.space2xs};
    background-color: ${colors.pineGreen["40"]};
    border-radius: ${borderRadius.large};
    cursor: pointer;

    box-shadow: hsl(0, 0%, 60%) 2px 2px 4px;

    &:hover,
    &:focus {
      background-color: ${colors.pineGreen["70"]};

      .horse-name {
        color: white !important;
      }
    }

    @media (max-width: ${breakpoints.w400}) {
      min-width: 0;
      padding: ${spacing.space3xs} ${spacing.space3xs};
    }
  }

  .link {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;

    padding-right: ${spacing.spaceMd};

    .horse-image {
      margin: 0 ${spacing.spaceMd} 0 0;
    }

    .horse-name {
      display: flex;
      align-items: center;
      min-width: ${spacing.space4xl};

      font-size: ${fontSize.textLg};
      font-weight: 600;

      color: ${colors.text.primary};

      margin-left: ${spacing.spaceMd};
    }

    @media (max-width: ${breakpoints.w400}) {
      .horse-image {
        margin: 0 ${spacing.space2xs} 0 0;
      }
      .horse-name {
        font-size: ${fontSize.textMd};
      }
    }
  }

  .edit-button {
    display: flex;
    align-content: center;
    justify-content: center;
    padding: ${spacing.spaceXs};

    cursor: pointer;
    background-color: white;
    border-style: solid;
    border-width: 1px;
    border-color: ${colors.pineGreen["80"]};
    border-radius: ${borderRadius.medium};
    box-shadow: hsl(0, 0%, 60%) 2px 2px 4px;

    span {
      margin: auto;
      height: 16px;
      display: flex;
      align-content: center;
      justify-content: center;
      font-size: 16px;
      line-height: 16px;
    }

    svg {
      margin-right: ${spacing.spaceXs};
      height: 16px;
      width: 16px;
    }

    @media (max-width: ${breakpoints.w400}) {
      padding: ${spacing.space2xs};
    }
  }
`;
