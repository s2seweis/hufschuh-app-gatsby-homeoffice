import styled from "styled-components";
import colors from "../../../constants/colors";
import fontSize from "../../../constants/typeScale";

export const Splashscreen = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  background-color: ${colors.pineGreen["50"]};

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .app-name {
    font-size: ${fontSize.text2xl};
  }

  .logo {
    width: 60%;
    max-width: 640px;

    img {
      width: 100%;
    }
  }

  .go {
    font-size: ${fontSize.textLg};
  }
`;
