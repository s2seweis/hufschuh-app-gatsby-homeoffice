import { createGlobalStyle } from "styled-components";
import "@fontsource/montserrat";
import fontSize from "../../constants/typeScale";
import colors from "../../constants/colors";

const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: "Montserrat", Helvetica, sans-serif;
    
    background-color: ${colors.pink["0"]};
  }

  #___gatsby {
    height: 100%;
    min-height: 100vh;
    
  }

  #gatsby-focus-wrapper {
    height: 100%;
    min-height: 100vh;
  }
  
  button, label {
    font-family: "Montserrat", Helvetica, sans-serif;
    font-size: ${fontSize.textMd};
  }
  
  input, textarea {
    font-size: ${fontSize.textMd};
  }
`;

export default GlobalStyle;

export const CameraStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  
  #___gatsby {
    height: 100%;
  }
  
  #gatsby-focus-wrapper {
    height: 100%;
  }
  
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Montserrat", Helvetica, sans-serif;
    min-height: -webkit-fill-available;

    @media screen and (max-device-width: 480px){
      body{
        -webkit-text-size-adjust: none;
      }
    }
  }
  
  button, label {
    font-family: "Montserrat", Helvetica, sans-serif;
  }
`;
