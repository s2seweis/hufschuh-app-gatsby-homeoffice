import { ContentWrapper } from "./styled";
import GlobalStyle from "./GlobalStyle";
import React from "react";

/**
 * for pages that have no header etc.
 * TODO include in Layout? i.e. "minimal: boolean"
 * @returns {JSX.Element}
 * @constructor
 */
export default function AppPage() {
  return (
    <ContentWrapper>
      <GlobalStyle />
    </ContentWrapper>
  );
}
