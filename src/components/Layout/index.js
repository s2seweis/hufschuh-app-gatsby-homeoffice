import React from "react";
import ReduxWrapper from "../../redux/ReduxWrapper";
import GlobalStyle from "./GlobalStyle";

export default function Layout({ children }) {
  return (
    <ReduxWrapper>
      {/*<Meta title={title} description={description} />*/}
      <GlobalStyle />
      {children}
    </ReduxWrapper>
  );
}
