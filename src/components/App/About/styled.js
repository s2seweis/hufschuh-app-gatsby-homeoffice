import styled from "styled-components";
import { spacing } from "../../../constants/spacing";
import colors from "../../../constants/colors";

export const AboutStyle = styled.section`
  display: flex;
  flex-direction: column;

  a + a {
    margin-top: ${spacing.spaceXs};
  }

  a {
    color: ${colors.links.default};
  }
`;
