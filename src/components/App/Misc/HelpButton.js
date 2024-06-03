import styled from "styled-components";
import { spacing } from "../../../constants/spacing";
import colors from "../../../constants/colors";
import fontSize from "../../../constants/typeScale";

export const HelpButton = styled.button`
  width: ${spacing.spaceMd};
  height: ${spacing.spaceMd};
  display: flex;
  justify-content: center;
  align-items: center;

  border-style: none;
  border-radius: 999px;
  background-color: ${colors.blue["80"]};
  color: white;
  font-weight: 600;
  font-size: ${fontSize.textLg};
  cursor: pointer;
`;
