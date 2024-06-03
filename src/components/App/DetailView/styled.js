import styled from "styled-components";
import { spacing } from "../../../constants/spacing";
import borderRadius from "../../../constants/borderRadius";
import colors from "../../../constants/colors";
import { GatsbyImage } from "gatsby-plugin-image";

export const DetailViewWrapper = styled.section`
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .section-profile-pic {
    margin-top: ${spacing.spaceMd};
  }
`;

// https://codepen.io/justdecodeme/details/NrxGOj
export const Progress = styled.section`
  ul {
    display: inline-block;
    list-style: outside none none;
    padding: 0;
  }
  li {
    display: inline;
    float: left;
    margin-right: 6px;

    letter-spacing: 0.02em;
  }
  li:last-child {
    margin: 0;
  }
  a,
  a:hover,
  a:focus,
  a:active {
    background: ${colors.pink["80"]};
    display: inline-block;
    outline: medium none;
    padding: 10px 2px 10px 14px;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.7);
    position: relative;
  }
  a:hover {
    background: rgba(46, 204, 113, 1);
    color: #000;
  }
  a:focus {
    background: rgba(39, 174, 96, 1);
  }
  li:first-child a {
    border-radius: 5px 0 0 5px;
    padding-left: 2px;
  }
  li:last-child a {
    border-radius: 0 2px 5px 0;
  }
  a::before {
    border-color: transparent transparent transparent white;
    border-style: solid;
    border-width: 20px 0 20px 14px;
    box-sizing: border-box;
    content: "";
    height: 0;
    left: 0;
    position: absolute;
    top: 0;
    width: 0;
  }
  a::after {
    border-color: transparent transparent transparent ${colors.pink["80"]};
    border-style: solid;
    border-width: 20px 0 20px 14px;
    box-sizing: border-box;
    content: "";
    height: 0;
    left: 100%;
    position: absolute;
    top: 0;
    width: 0;
    z-index: 1;
  }
  a:hover::after {
    border-left-color: rgba(46, 204, 113, 1);
  }
  a:focus::after {
    border-left-color: rgba(39, 174, 96, 1);
  }
  li:first-child a:before,
  li:last-child a:after {
    display: none;
  }
  i {
    margin-right: 5px;
  }

  .completed {
    background-color: ${colors.lightGreen["80"]};

    ::after {
      border-color: transparent transparent transparent
        ${colors.lightGreen["80"]};
    }
  }
`;

export const LegThumbnails = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;

  .identifier {
    white-space: pre-wrap; /* css-3 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */

    width: 60px;
    text-align: center;
  }

  .thumbnail-link + .thumbnail-link {
    margin-top: ${spacing.space2xs};
  }

  .thumbnail {
    width: ${spacing.space2xl};
    height: ${spacing.space2xl};

    box-shadow: 2px 2px 2px 0px hsl(0, 0%, 48%);
    border-radius: 12px;
  }
`;

export const LegWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    &:hover,
    &:focus {
      transition: all 200ms ease-in-out;
      transform: scale(1.1);
    }
  }
`;

export const TorsoThumbnail = styled.div`
  width: 100%;
  margin: ${spacing.spaceMd} 0 ${spacing.spaceMd} 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .thumbnail {
    width: ${spacing.space2xl};
    height: ${spacing.space2xl};

    box-shadow: 2px 2px 2px 0px hsl(0, 0%, 48%);
    border-radius: 12px;
  }
`;

export const CharacteristicsWrapper = styled.section`
  width: 100%;
  margin: ${spacing.spaceLg} 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  a + a {
    margin-top: ${spacing.spaceXs};
  }

  a {
    padding: ${spacing.space2xs} ${spacing.spaceSm};
    width: ${spacing.space4xl};
    text-align: center;

    //display: flex;
    //justify-content: space-between;

    color: ${colors.text.primary};
    text-decoration: none;
    border-style: solid;
    border-width: 1px;
    border-radius: ${borderRadius.small};
    background-color: white;
    cursor: pointer;
    box-shadow: 2px 2px 2px 0px hsl(0, 0%, 48%);

    &:hover,
    &:focus {
      background-color: ${colors.pineGreen["80"]};
      color: white;
      border-color: ${colors.pineGreen["80"]};
    }
  }

  .checkmark {
    position: absolute;
    margin: -8px 0 0 calc(${spacing.space4xl} + 4px);
    font-size: 1.2rem;
  }
`;

export const UploadWrapper = styled.section`
  width: 100%;
  margin: ${spacing.spaceLg} 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  .upload-message {
    color: red;
    text-align: center;
  }

  .inquiry {
    span {
      padding: ${spacing.space3xss};
    }
  }
`;

export const HorseModel = styled.div`
  min-height: 150px;
  width: 100%;
`;
