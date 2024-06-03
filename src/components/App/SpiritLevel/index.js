import React, { useEffect, useRef, useState } from "react";
import { Level } from "./styled";
import { PermissionModal } from "./PermissionModal";

export default function SpiritLevel({ setDegree, betaOffset, gammaOffset }) {
  const [orientationSupport, setOrientationSupport] = useState(false);
  const indicatorRef = useRef();

  const [ios, setIos] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [landscape, setLandscape] = useState(false);

  let betaCurrent = 0;
  let gammaCurrent = 0;
  let betaCorrected = 0;
  let gammaCorrected = 0;
  // let betaOffset = 0;
  // let gammaOffset = 0;
  let scrnOr = "";
  let devType = "";

  //client size
  let maxX = 48;
  let maxY = 192;

  //settings
  let centerTol = 0.2;
  let menuExp = false;
  let isCal = false;
  let infExp = false;
  let soundOn = false;
  let devorSup = false;

  function handleResize() {
    setLandscape(window.innerWidth > window.innerHeight);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // detect ios for permissino request
  useEffect(() => {
    const regex = new RegExp("iPhone|iPad|iPod");
    if (regex.test(navigator.userAgent)) {
      setIos(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("deviceorientation", onDeviceOrientationChange);

    return () => {
      window.removeEventListener(
        "deviceorientation",
        onDeviceOrientationChange
      );
    };
  }, []);

  function onDeviceOrientationChange(event) {
    // let orient = detectOrientation();
    // let orient2 = detectOrientStr();
    // scrnOr = orient2;
    maxX = 48;
    maxY = 192;
    //console.log(maxX, maxY);

    let absolute = event.absolute;
    let alpha = event.alpha; // In degree in the range [-360,360]
    betaCurrent = event.beta;

    //check for value here...?
    if (isNaN(betaCurrent) || betaCurrent === null) {
      console.log("not a number - no support");
      // setNoSup();
    } else {
      // setSup();
    }
    ///////////////////////////////////

    betaCorrected = betaCurrent * 1 - betaOffset; //0.97
    let beta = betaCurrent - betaOffset; // In degree in the range [-180,180]
    gammaCurrent = event.gamma;
    gammaCorrected = gammaCurrent * 1 - gammaOffset; //0.95
    let gamma = gammaCurrent - gammaOffset; // In degree in the range [-90,90]

    setDegree({ beta, gamma });

    // To make computation easier we shift the range of
    // x and y to [0,180]
    //alpha += 90;
    beta += 90;
    gamma += 90;

    let toLeft;
    let toTop;
    if (landscape) {
      toLeft = (maxX / 180) * beta - 10 + "px";
      toTop = (maxY / 180) * gamma - 10 + "px";
    } else {
      toLeft = (maxX / 180) * gamma - 10 + "px";
      toTop = (maxY / 180) * beta - 10 + "px";
    }

    // let device = deviceType();
    // devType = device;

    const indicator = indicatorRef.current;

    indicator.style.top = toTop;
    indicator.style.left = toLeft;

    setIsWorking(true);

    // UpdateDataView();
  }




  return (
    <>
      <Level>
        <div className={"indicator"} ref={indicatorRef} />
        <div className={"center"} />
        <div className={"lines"}>
          <div className={"lines-tl"} />
          <div className={"lines-tr"} />
          <div className={"lines-bl"} />
          <div className={"lines-br"} />
        </div>
        {ios &&
        !isWorking &&
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function" ? (
          <PermissionModal />
        ) : (
          ""
        )}
      </Level>
    </>
  );
}
