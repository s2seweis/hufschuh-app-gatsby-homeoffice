import styled from "styled-components";
import dimensions from "../../../constants/dimensions";

export const ContentWrapper = styled.div`
  // mobile
  width: ${(props) => (props.show ? "96%" : "100%")};
  max-width: ${dimensions.desktopWidth};
  margin: 0 auto;
  height: 100%;

  overflow-y: ${(props) => props.overflowY || "auto"};
`;
