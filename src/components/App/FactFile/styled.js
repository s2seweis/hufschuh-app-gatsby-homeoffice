import styled from "styled-components";
import { spacing } from "../../../constants/spacing";
import colors from "../../../constants/colors";
import fontSize from "../../../constants/typeScale";
import borderRadius from "../../../constants/borderRadius";

export const FactFileForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;

  // padding: ${spacing.spaceMd} 0;
  overflow-x: hidden;

  .input-group + * {
    margin-top: ${spacing.spaceMd};
  }

  .input-group {
    display: flex;
    flex-direction: column;

    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: ${spacing.space2xs} ${spacing.spaceSm};

    border-style: solid;
    border-radius: ${borderRadius.small};
    border-color: ${colors.greys["250"]};
    border-width: 1px;

    font-family: Montserrat, Helvetica, sans-serif;
    font-size: ${fontSize.textMd};
    color: ${colors.text.secondary};

    &:focus {
      border-style: solid;
      border-radius: ${borderRadius.small};
      border-color: ${colors.primary["120"]};
      border-width: 1px;

      box-shadow: 0 0 0 1px ${colors.primary["120"]};

      outline: none;
    }
  }

  .insert-field {
    width: 100%;
    margin: ${spacing.spaceXs} 0;
  }

  label {
    font-weight: 600;
    margin-bottom: ${spacing.space3xs};
  }

  p {
    margin: ${spacing.spaceSm} 0 0 0;
  }

  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: ${spacing.spaceXs};

    .fill-out {
      color: #ff0000;
      display: none;
    }

    button {
      margin-left: auto;
    }
  }

  .help-text {
    margin: ${spacing.spaceXs} 0 ${spacing.spaceXs} 0 !important;
    overflow: hidden;
    transition: all 300ms ease-in-out;
  }

  .subtext {
    overflow: hidden;
    transition: all 300ms ease-in-out;
    margin: 0 0 ${spacing.space2xs} 0;
  }
`;
