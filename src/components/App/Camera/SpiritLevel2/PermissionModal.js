import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { spacing } from "../../../../constants/spacing";
import { Button } from "../../Misc/Button";

const Modal = styled.div`
  position: absolute;
  top: calc(50vh - 100px);
  left: calc(50vw - 150px);
  width: 300px;
  height: 200px;
  box-sizing: border-box;

  padding: ${spacing.spaceSm};

  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  background-color: white;
`;

export function PermissionModal() {
  const [permissonState, setPermissionState] = useState(false);

  useEffect(() => {
    // requestPermission();
  }, []);

  async function requestPermission() {
    console.log(
      DeviceOrientationEvent,
      DeviceOrientationEvent.requestPermission()
    );
    if (
      DeviceOrientationEvent &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      const permissionState = await DeviceOrientationEvent.requestPermission();

      if (permissionState === "granted") {
        console.log("granted");
      } else {
        console.log("denied");
      }
    }
  }

  return (
    <Modal show={!permissonState}>
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
  );
}
