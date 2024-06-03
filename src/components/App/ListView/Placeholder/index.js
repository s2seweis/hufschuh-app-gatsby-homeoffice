import React from "react";
import { PlaceholderWrapper } from "./styled";
import { HorseHead } from "../../../../assets/icons/HorseHead";
import { Button } from "../../Misc/Button";

export default function Placeholder({ openModal, cms }) {
  return (
    <PlaceholderWrapper>
      <div className={"svg-wrapper"}>
        <HorseHead />
      </div>
      <p>{cms.CTA}</p>
      <Button onClick={openModal} className={"primary"}>
        {cms.Button}
      </Button>
    </PlaceholderWrapper>
  );
}
