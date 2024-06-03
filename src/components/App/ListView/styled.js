import styled from "styled-components";
import dimensions from "../../../constants/dimensions";
import { spacing } from "../../../constants/spacing";
import colors from "../../../constants/colors";

export const ListViewWrapper = styled.div`
  height: calc(100vh - ${dimensions.headerHeight});
  width: 100%;
  overflow-y: clip;

  margin: 0 auto;
`;
