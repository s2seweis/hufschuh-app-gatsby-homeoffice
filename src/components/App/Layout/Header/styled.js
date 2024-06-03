import styled from "styled-components";
import { spacing } from "../../../../constants/spacing";
import colors from "../../../../constants/colors";
import fontSize from "../../../../constants/typeScale";
import dimensions from "../../../../constants/dimensions";

export const HeaderWrapper = styled.section`
  height: ${dimensions.headerHeight};
  // max-width: ${dimensions.desktopWidth};

  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

export const Fixed = styled.div`
  width: 100vw;
  max-width: ${dimensions.desktopWidth};
  height: ${dimensions.headerHeight};
  position: fixed;
  top: 0;
  z-index: 3;

  display: grid;
  grid-template-columns: ${(props) =>
    props.showNavigation ? "13% 150px auto 64px" : "5% 150px auto 64px"};
  grid-template-rows: 1fr;

  border-style: none none solid none;
  border-width: 1px;
  border-color: ${colors.greys["200"]};
  box-sizing: border-box;

  background-color: white;
  //background-color: ${colors.primary["170"]};

  .arrow-left {
    grid-area: 1 / 1 / 2 / 2;
    display: ${(props) => (props.showNavigation ? "flex" : "none")};
    padding: ${spacing.spaceXs};

    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
    border-style: none;
  }

  .meta-title {
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    flex-direction: column;
    justify-content: center;

    //color: white;
    color: ${colors.text.primary};

    h4 {
      margin: 0 0 ${spacing.space4xs} 0;
    }

    span {
      font-size: ${fontSize.textSm};
      color: ${colors.greys["700"]};
    }
  }

  .guide {
    position: absolute;
    left: 0;
    top: 0;
    margin: 0 calc(50% - 12px);
    height: 56px;
    display: flex;
    align-items: center;

    z-index: 7;

    display: flex;
    align-items: center;
  }

  .account-icon {
    grid-area: 1 / 4 / 2 / 5;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;

    height: ${spacing.spaceXl};
    //width: ${spacing.spaceXl};
    // iOS Safari buggs the svg if set smaller
    width: 64px;

    border-radius: 999px;
    border-style: none;
    cursor: pointer;
    background-color: transparent;


    svg {
      height: ${spacing.spaceLg};
      width: ${spacing.spaceLg};
    }
  }

  .menu {
    position: absolute;
    right: 0;
    top: 48px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: white;
    border-style: solid;
    border-width: 1px;
    border-color: ${colors.greys["300"]};
    box-shadow: hsl(0, 0%, 28%) 2px 2px 5px;

    .menu-link {
      padding: ${spacing.space2xs};

      text-decoration: none;
      color: black;
      font-size: ${fontSize.textLg};
      cursor: pointer;

      &:hover,
      &:focus {
        color: ${colors.pineGreen["60"]};
      }
    }

    .menu-link + .menu-link {
      border-style: solid none none none;
      border-width: 1px;
      border-color: ${colors.greys["300"]};
    }
  }
`;
