import styled from "styled-components";
import { spacing } from "../../../../constants/spacing";
import borderRadius from "../../../../constants/borderRadius";

const ballDiameterPortrait = "30px";
const ballDiameterLandscape = "30px";
const borderWidth = "5px";
const gardenWidthPortrait = "15%";
const arrowAny = "20px";
const arrowSmallAny = "7px";
const arrowColor = "black";

export const SpiritLevelStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${spacing.space5xl};
  width: ${spacing.spaceXl};
  margin: ${spacing.space2xs} 0 0 ${spacing.space2xs};

  .garden {
    border: ${borderWidth} solid #ccc;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.4);

    position: absolute;
    top: 0;
    left: 0;
    height: ${spacing.space5xl};
    max-height: 80%;
    width: ${spacing.spaceXl};
    margin: ${spacing.space2xs} 0 0 ${spacing.space2xs};
  }

  .ball {
    position: absolute;
    background: rgb(0, 0, 0);
    border-radius: 100%;

    width: ${ballDiameterPortrait};
    height: ${ballDiameterPortrait};
    top: calc(50% - calc(${ballDiameterPortrait} / 2));
    left: calc(50% - calc(${ballDiameterPortrait} / 2));
  }

  .balltarget {
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 100%;
    border: ${borderWidth} solid white;
    
    height: calc(${ballDiameterPortrait} + 5px);
      width: calc(${ballDiameterPortrait} + 5px);
      top: calc(50% - ${ballDiameterPortrait} / 2 - 1.5 * ${borderWidth});
      left: calc(50% - ${ballDiameterPortrait} / 2 - 1.5 * ${borderWidth});
  }

  .output {
    position: absolute;
    top: 250px;
    width: 100%;
    color: black;
    font-size: 100%;
    background: rgba(255, 255, 255, 0.7);
  }

  .userclick {
    position: absolute;
    top: 300px;
    width: 100px;
    height: 50px;
    background: cyan;
    display: none;
  }

  .arrow-left {
    position: absolute;
    width: 0;
    height: 0;
    border-top: ${arrowAny} solid transparent;
    border-bottom: ${arrowAny} solid transparent;
    border-left: ${arrowAny} solid ${arrowColor};

    top: calc(50% - ${arrowAny});
    left: 0%;
  }
  .arrow-right {
    position: absolute;
    width: 0;
    height: 0;
    border-top: ${arrowAny} solid transparent;
    border-bottom: ${arrowAny} solid transparent;
    border-right: ${arrowAny} solid ${arrowColor};

    top: calc(50% - ${arrowAny});
    left: calc(100% - ${arrowAny});
  }
  .arrow-down-upper {
    position: absolute;
    width: 0;
    height: 0;
    border-left: ${arrowSmallAny} solid transparent;
    border-right: ${arrowSmallAny} solid transparent;
    border-top: ${arrowSmallAny} solid ${arrowColor};

    top: calc(2 * ${arrowSmallAny});
    left: calc((100% - 2 * ${borderWidth} - ${arrowSmallAny} / 2) / 2);
  }
  .arrow-down-lower {
    position: absolute;
    width: 0;
    height: 0;
    border-left: ${arrowSmallAny} solid transparent;
    border-right: ${arrowSmallAny} solid transparent;
    border-top: ${arrowSmallAny} solid ${arrowColor};

    top: calc(3 * ${arrowSmallAny});
    left: calc((100% - 2 * ${borderWidth} - ${arrowSmallAny} / 2) / 2);
  }
  .arrow-up-upper {
    position: absolute;
    width: 0;
    height: 0;
    border-left: ${arrowSmallAny} solid transparent;
    border-right: ${arrowSmallAny} solid transparent;
    border-bottom: ${arrowSmallAny} solid ${arrowColor};

    top: calc(100% - 3 * ${arrowSmallAny});
    left: calc((100% - 2 * ${borderWidth} - ${arrowSmallAny} / 2) / 2);
  }
  .arrow-up-lower {
    position: absolute;
    width: 0;
    height: 0;
    border-left: ${arrowSmallAny} solid transparent;
    border-right: ${arrowSmallAny} solid transparent;
    border-bottom: ${arrowSmallAny} solid ${arrowColor};

    top: calc(100% - 2 * ${arrowSmallAny});
    left: calc((100% - 2 * ${borderWidth} - ${arrowSmallAny} / 2) / 2);
  }

  @media screen and (orientation: portrait) {
    /* portrait-specific styles */

    .ball {
  
    }
    .balltarget {
      
    }

    .arrow-left {
    
    }
    .arrow-right {
     
    }
    .arrow-down-upper {
      
    }
    .arrow-down-lower {
     
    }
    .arrow-up-upper {
      
    }
    .arrow-up-lower {
      
    }
  }

  @media screen and (orientation: landscape) {
    //.garden {
    //  /*width: 20%;*/
    //  height: calc(100% - 10px);
    //  left: 0;
    //  top: 0;
    //}
    //#garden.right {
    //  left: 80%;
    //}
    //
    ///* we default to right */
    //#gui_controls {
    //  width: 20%;
    //  height: 100%;
    //  right: 0;
    //}
  }
`;
