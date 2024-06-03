import React, { useEffect, useRef, useState } from "react";
import { SpiritLevelStyles } from "./styled";
import { PermissionModal } from "../../SpiritLevel/PermissionModal";
import { detectIos } from "../functions";

export default function SpiritLevel({
  landscapeMode,
  setVertical,
  setHorizontal,
}) {
  // Global variables
  const ball = useRef();
  const garden = useRef();
  const arrow = useRef();

  const degtorad = Math.PI / 180; // Degree-to-Radian conversion

  function detectOrientation() {
    if (typeof window.onorientationchange !== "undefined") {
      return window.orientation;
    }
  }

  function getRotationMatrix(alpha, beta, gamma) {
    const _x = beta ? beta * degtorad : 0; // beta value
    const _y = gamma ? gamma * degtorad : 0; // gamma value
    const _z = alpha ? alpha * degtorad : 0; // alpha value
    const cX = Math.cos(_x);
    const cY = Math.cos(_y);
    const cZ = Math.cos(_z);
    const sX = Math.sin(_x);
    const sY = Math.sin(_y);
    const sZ = Math.sin(_z);

    //
    // ZXY rotation matrix construction.
    //

    const m11 = cZ * cY - sZ * sX * sY;
    const m12 = -cX * sZ;
    const m13 = cY * sZ * sX + cZ * sY;

    const m21 = cY * sZ + cZ * sX * sY;
    const m22 = cZ * cX;
    const m23 = sZ * sY - cZ * cY * sX;

    const m31 = -cX * sY;
    const m32 = sX;
    const m33 = cX * cY;

    return [m11, m12, m13, m21, m22, m23, m31, m32, m33];
  }

  function handleOrientation(event) {
    const x = event.beta; // In degree in the range [-180,180]
    const y = event.gamma; // In degree in the range [-90,90]
    const z = event.alpha; //
    //    output.innerHTML = "";
    const absolute = getRotationMatrix(z, x, y);
    const o = detectOrientation();
    let abstandoben = 0;
    let abstandlinks = 0;
    const gardenstyle = getComputedStyle(garden.current);
    const arrowstyle = getComputedStyle(arrow.current);
    const ballstyle = getComputedStyle(ball.current);
    const boxwidth = parseInt(gardenstyle.width, 10); //56
    const boxheight = parseInt(gardenstyle.height, 10); // 216
    const borderwidth = parseInt(gardenstyle.getPropertyValue("border"), 10);
    const arrowheight = parseInt(arrowstyle.getPropertyValue("border-top"), 10); // 20
    const diameter = parseInt(ballstyle.height);
    const targetoben = (boxheight - 2 * borderwidth) / 2;
    const targetobendelta = 3;
    const targetlinksdelta = 2;
    const targetlinks = (boxwidth - 2 * borderwidth) / 2;
    let tmp = 0;

    if (o === 0) {
      var horizontal = absolute[6];
      var vertical = absolute[8];
      // Portrait, unten ist unten
      tmp = targetoben - targetoben * vertical;
      if (vertical > 0) {
        abstandoben = targetoben - targetoben * vertical;
      } else {
        abstandoben = targetoben + targetoben * -1 * vertical;
      }
      if (horizontal > 0) {
        abstandlinks = targetlinks - 2 * (targetlinks * horizontal);
      } else {
        abstandlinks = targetlinks + 2 * (targetlinks * -1 * horizontal);
      }
    }
    if (o === -90) {
      var vertical = absolute[8];
      var horizontal = absolute[7];
      // landscape unten ist links
      if (vertical > 0) {
        abstandoben = 90 - 90 * vertical;
      } else {
        abstandoben = 90 + 90 * -1 * vertical;
      }
      if (horizontal > 0) {
        abstandlinks = 30 + 30 * -1 * horizontal;
      } else {
        abstandlinks = 30 - 30 * horizontal;
      }
    }
    if (o === 90) {
      var vertical = absolute[8];
      var horizontal = absolute[7];
      // landscape unten ist rechts
      if (vertical > 0) {
        abstandoben = 90 - 90 * vertical;
      } else {
        abstandoben = 90 + 90 * -1 * vertical;
      }
      if (horizontal > 0) {
        abstandlinks = 30 + 30 * horizontal;
      } else {
        abstandlinks = 30 - 30 * -1 * horizontal;
      }
    }

    setHorizontal(horizontal);
    setVertical(vertical);

    if (landscapeMode) {
      ball.current.style.top = abstandoben - 30 + "px";
      ball.current.style.left = abstandlinks - 20 + "px";
    } else {
      ball.current.style.top = abstandoben - 10 + "px";
      ball.current.style.left = abstandlinks - 10 + "px";
    }

    if (
      abstandoben >= targetoben - targetobendelta &&
      abstandoben <= targetoben + targetobendelta &&
      abstandlinks >= targetlinks - targetlinksdelta &&
      abstandlinks <= targetlinks + targetlinksdelta
    ) {
      ball.current.style.backgroundColor = "#00FF00";
    } else {
      var green = 230 - 160 * (Math.abs(vertical) + Math.abs(horizontal));
      var red = 50 * (Math.abs(vertical) + Math.abs(horizontal));
      ball.current.style.backgroundColor =
        "rgb(" + red.toFixed(0) + "," + green.toFixed(0) + ",0)";
    }
  }

  function requestDeviceOrientation() {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(console.error);
      return 3;
    } else {
      // handle regular non iOS 13+ devices
      return 5;
    }
  }

  // init
  useEffect(() => {
    const ret = requestDeviceOrientation();

    if (ret === 5) {
      //output.innerHTML = "Device does not support the sensor\n";
      window.addEventListener("deviceorientation", handleOrientation);
    }
    if (ret === 3) {
      //
    }
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return (
    <SpiritLevelStyles>
      <div id="container">
        <div className="garden" ref={garden}>
          <div className="balltarget" />
          <div className="ball" ref={ball} />
          <div className="arrow-down-upper" />
          <div className="arrow-down-lower" />
          <div className="arrow-left" ref={arrow} />
          <div className="arrow-right" />
          <div className="arrow-up-upper" />
          <div className="arrow-up-lower" />
        </div>
      </div>
    </SpiritLevelStyles>
  );
}
