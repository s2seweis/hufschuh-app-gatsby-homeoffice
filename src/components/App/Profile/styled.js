import styled from "styled-components";
import { spacing } from "../../../constants/spacing";
import color from "../../../constants/colors";
import fontSize from "../../../constants/typeScale";
import borderRadius from "../../../constants/borderRadius";
import colors from "../../../constants/colors";

export const UserForm = styled.form`
  padding-bottom: ${spacing.spaceMd};

  .input-group + .input-group {
    margin-top: ${spacing.spaceMd};
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

    input {
      padding: ${spacing.space2xs} ${spacing.spaceXs};

      border-style: solid;
      border-width: 1px;
      border-radius: ${borderRadius.small};
      border-color: ${colors.greys["300"]};
      font-size: ${fontSize.textMd};
    }
  }

  .newsletter-checkbox {
    display: flex;
    flex-direction: row;

    input {
      margin-right: ${spacing.spaceMd};
    }

    label {
      font-size: ${fontSize.textMd};
      font-weight: normal;
      flex: 1;
    }
  }

  .title-select {
    div {
      border-color: ${colors.greys["300"]} !important;
    }
  }

  .button-row {
    width: 100%;
    margin-top: ${spacing.spaceMd};
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .message {
    color: red;
  }

  .required {
    //margin-left: 8px;
    color: red;
  }

  .hint-mobile {
  }
`;

export const UserFormSkeleton = styled.div`
  ${UserForm} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 850px;

    .spinner {
      margin: auto auto;
    }

    .button-row {
    }
  }
`;
