import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { spacing } from "../../../constants/spacing";
import { Button } from "../Misc/Button";
import { Blur } from "../Misc/Blur";

const Modal = styled.div`
  position: absolute;
  top: calc(50vh - 100px);
  left: calc(50vw - 150px);
  width: 300px;
  height: 200px;
  box-sizing: border-box;
  z-index: 10;

  padding: ${spacing.spaceSm};

  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  background-color: white;
`;

export function PermissionModal({ setPermissionGranted, setMessage }) {
  const [permissonState, setPermissionState] = useState(false);

  async function requestPermission() {
    console.log("requesting permission");
    if (
      DeviceOrientationEvent &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      const permissionState = await DeviceOrientationEvent.requestPermission();

      if (permissionState === "granted") {
        console.log("granted");
        setPermissionGranted(true);
      } else {
        console.log("denied");
        setMessage(
          "Du hast den Zugriff auf die Bewegungssensoren deines Gerätes verweigert."
        );
      }
    }
  }

  return (
    <>
      <Blur zIndex={9} />

      <Modal show={!permissonState}>
        {/*TODO add in strapi*/}
        <p>
          Wir benötigen deine Erlaubnis, um auf die Bewegungssensoren deines
          Gerätes zugreifen zu können.
        </p>
        <Button
          className={"primary"}
          onClick={() => {
            requestPermission();
          }}
        >
          Ok
        </Button>
      </Modal>
    </>
  );
}
