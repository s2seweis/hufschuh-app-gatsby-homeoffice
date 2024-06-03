import React from "react";
import styled from "styled-components";
import { spacing } from "../../../constants/spacing";
import borderRadius from "../../../constants/borderRadius";
import colors from "../../../constants/colors";
import fontSize from "../../../constants/typeScale";

export const Button = styled.button`
  padding: ${spacing.spaceXs};

  background-color: white;
  color: ${colors.primary["170"]};
  border-style: solid;
  border-width: 1px;
  border-radius: ${borderRadius.small};
  font-size: ${fontSize.textMd};
  letter-spacing: 0.12em;
  cursor: pointer;

  &.primary {
    background-color: ${colors.pineGreen["80"]};
    color: white;
    border-style: none;

    box-shadow: ${colors.greys["700"]} 2px 2px 5px;
  }

  // default
  &.secondary {
    background-color: white;
    color: ${colors.pineGreen["80"]};
  }

  &.inactive {
    background-color: ${colors.greys["300"]};
    color: white;
    border-style: none;

    box-shadow: none;
  }
`;
