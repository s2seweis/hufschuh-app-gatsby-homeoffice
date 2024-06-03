import styled from "styled-components";
import { spacing } from "../../../../constants/spacing";
import color from "../../../../constants/colors";
import fontSize from "../../../../constants/typeScale";
import borderRadius from "../../../../constants/borderRadius";
import colors from "../../../../constants/colors";

export const AddHorseForm = styled.form`
  height: 100vh;
  width: 100%;
  padding: ${spacing.spaceMd} 0 0 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: ${colors.pink["0"]};

  * + .form-row {
    margin-top: ${spacing.spaceLg};
  }

  .form-meta {
    h2 {
      margin: 0 0 ${spacing.space3xs};
      font-size: ${fontSize.textLg};
      font-weight: 600;
    }

    p {
      margin: 0;
      color: ${colors.text.secondary};
      font-size: ${fontSize.textSm};
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;

    label {
      color: ${color.greys["800"]};
      margin-bottom: ${spacing.space2xs};
      font-size: ${fontSize.textSm};
      font-weight: 600;
    }

    .input {
      padding: ${spacing.space3xs} ${spacing.space2xs};

      border-style: solid;
      border-width: 1px;
      border-radius: ${borderRadius.small};
      border-color: ${colors.greys["300"]};
      font-size: ${fontSize.textMd};
    }
  }

  .picture-input-row {
    display: flex;
    align-items: center;

    input {
      display: none;
    }

    .input-file {
      //height: ${spacing.spaceMd};
      width: 100px;
      margin: 0 0 0 ${spacing.spaceMd};
      padding: ${spacing.space3xs} ${spacing.space2xs};

      display: flex;
      justify-content: center;
      align-items: center;
      
      

      padding: ${spacing.spaceXs};

      color: ${colors.primary["170"]};
      border-style: solid;
      border-width: 1px;
      border-radius: ${borderRadius.small};
      font-size: ${fontSize.textMd};
      letter-spacing: 0.12em;
      cursor: pointer;

      background-color: white;
      color: ${colors.pineGreen["80"]};
    }
  }

  .button-row {
    padding-right: ${spacing.spaceXs};
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .delete-horse {
    display: flex;
    align-items: center;
    padding: 0;
    margin: ${spacing.spaceLg} 0 0 0;

    color: ${colors.red.defaut};
    border-style: none;
    background-color: transparent;
    cursor: pointer;

    svg {
      stroke: ${colors.red.defaut} !important;
      height: 16px;
      width: 16px;
      margin-right: ${spacing.space3xs};
    }

    &:hover,
    &:focus {
      color: ${colors.red.dark};

      svg {
        stroke: ${colors.red.dark} !important;
      }
    }
  }

  .message {
    margin: ${spacing.spaceMd} 0 0 0;
    color: red;
  }
`;
