import { CheckmarkIcon } from "../../../assets/icons/CheckIcon";
import colors from "../../../constants/colors";
import React from "react";
import styled from "styled-components";
import borderRadius from "../../../constants/borderRadius";

const Styles = styled.div`
  background-color: white;
  border-radius: ${borderRadius.small};

  height: 24px;
`;

export function Checkmark({ completed }) {
  return (
    <Styles>
      <CheckmarkIcon
        stroke={completed ? colors.lightGreen["80"] : colors.greys["500"]}
        strokeWidth={completed ? "2px" : "1px"}
      />
    </Styles>
  );
}
