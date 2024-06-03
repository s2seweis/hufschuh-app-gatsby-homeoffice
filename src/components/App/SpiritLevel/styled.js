import styled from "styled-components";
import { spacing } from "../../../constants/spacing";
import borderRadius from "../../../constants/borderRadius";

export const Level = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${spacing.space5xl};
  width: ${spacing.spaceXl};
  margin: ${spacing.space2xs} 0 0 ${spacing.space2xs};

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: hsla(0, 0%, 80%, 80%);
  border-radius: ${borderRadius.medium};

  .indicator {
    position: absolute;
    height: 20px;
    width: 20px;
    //margin-top: -calc(0.5 * 20px); // -50%height
    //margin-left: -calc(0.5 * 20px); //-50%width

    background-color: red;
    border-radius: 99px;
  }
  
  .zero {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: green;
    border: 2px solid #fff;
    border-radius: 20px;
  }

  .center {
    height: ${spacing.spaceLg};
    width: ${spacing.spaceLg};

    border-radius: 999px;
    border-style: solid;
    border-color: black;
    border-width: 1px;
  }

  .lines {
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex;
    flex-wrap: wrap;

    div {
      height: 50%;
      width: 50%;

      box-sizing: border-box;
      border-style: solid;
      border-width: 0.5px;
    }

    .lines-tl {
      border-style: none solid solid none;
    }
    .lines-tr {
      border-style: none none solid solid;
    }
    .lines-bl {
      border-style: solid solid none none;
    }
    .lines-br {
      border-style: solid none none solid;
    }
  }
`;
