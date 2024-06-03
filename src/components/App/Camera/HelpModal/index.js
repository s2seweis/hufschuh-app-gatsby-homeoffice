import React, { useState } from "react";
import { HelpBlock, HelpModalWrapper, SmallImage } from "./styled";
import { GatsbyImage } from "gatsby-plugin-image";
import { Button } from "../../Misc/Button";
import { getHelpImages, getHelpTexts } from "../getHelpParams";
import { getHoofHelpPage } from "./getHoofHelpPage";
import { Blur } from "../../Misc/Blur";
import { CloseIcon } from "../../../../assets/icons/Close";

export function HelpModal({ cms, show, close, pages, pos, target }) {
  const [navState, setNavState] = useState(0);

  const texts = getHelpTexts({ target, pos, cms });
  const images = getHelpImages({ target, pos, cms });

  const lastPage = pages - 1;

  function navigate(mode) {
    const next = mode === "next" ? navState + 1 : navState - 1;
    if (next < 0) setNavState(lastPage);
    else if (next > lastPage) setNavState(0);
    else setNavState(next);
  }

  // Hochformat
  if (pos === "fetlock") {
    return (
      <>
        <Blur
          style={{
            display: show ? "flex" : "none",
          }}
        />
        <HelpModalWrapper show={show} horizontal={pos !== 1}>
          <div className={"blur"} />
          <button className={"close"} onClick={close}>
            <CloseIcon stroke={"red"} strokeWidth={"3px"} />
          </button>
          <p className={"text"}>{texts[navState]}</p>
          <div className={"image"}>
            <GatsbyImage image={images[navState]} alt={""} />
          </div>
          <div className={"button-row"}>
            <Button
              className={"secondary"}
              onClick={() => navigate("previous")}
            >
              Vorherige
            </Button>
            <Button className={"primary"} onClick={() => navigate("next")}>
              Nächste
            </Button>
          </div>
        </HelpModalWrapper>
      </>
    );
  }

  // torso
  else if (pos === "torso")
    return (
      <>
        <Blur
          style={{
            display: show ? "flex" : "none",
          }}
        />
        <HelpModalWrapper show={show} horizontal={true}>
          <button className={"close"} onClick={close}>
            <CloseIcon stroke={"red"} strokeWidth={"3px"} />
          </button>
          <div className={"help-block-container"}>
            <div className={"left"}>
              <HelpBlock>
                <p>{texts[navState]}</p>
              </HelpBlock>
            </div>
            <div className={"right"}>
              <HelpBlock style={{ backgroundColor: "#a8a9a9" }}>
                <SmallImage image={images[navState]} alt={""} />
              </HelpBlock>
            </div>
          </div>
          <div className={"button-row"}>
            <Button
              className={"secondary"}
              onClick={() => navigate("previous")}
            >
              Vorherige
            </Button>
            <Button className={"primary"} onClick={() => navigate("next")}>
              Nächste
            </Button>
          </div>
        </HelpModalWrapper>
      </>
    );

  // hoof
  if (pos === "hoofLength" || pos === "hoofWidth") {
    // can't be mapped like the pos 1 help, as images and texts are mixed etc.
    return (
      <>
        <Blur
          style={{
            display: show ? "flex" : "none",
          }}
        />
        <HelpModalWrapper show={show} horizontal={true}>
          <button className={"close"} onClick={close}>
            <CloseIcon stroke={"red"} strokeWidth={"3px"} />
          </button>
          <div className={"help-block-container"}>
            <div className={"left"}>
              {getHoofHelpPage({ page: navState, left: true, texts, images })}
            </div>
            <div className={"right"}>
              {getHoofHelpPage({ page: navState, left: false, texts, images })}
            </div>
          </div>
          <div className={"button-row"}>
            <Button
              className={"secondary"}
              onClick={() => navigate("previous")}
            >
              Vorherige
            </Button>
            <Button className={"primary"} onClick={() => navigate("next")}>
              Nächste
            </Button>
          </div>
        </HelpModalWrapper>
      </>
    );
  }
}
