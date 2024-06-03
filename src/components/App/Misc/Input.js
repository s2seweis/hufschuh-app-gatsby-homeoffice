import React from "react";
import styled from "styled-components";
import borderRadius from "../../../constants/borderRadius";
import fontSize from "../../../constants/typeScale";
import colors from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";

const StyledInput = styled.input`
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
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
