import React, { useState } from "react";
import routes from "../../../constants/routes";
import { PhotoGuideWrapper } from "./styled";
import { parsePos, parseTarget } from "./parse";
import { Button } from "../Misc/Button";
import { navigate } from "gatsby";
import { CameraIcon } from "../../../assets/icons/CameraIcon";
import { CrosshairIcon } from "../../../assets/icons/CroasshairIcon";
import { InfoIcon } from "../../../assets/icons/InfoIcon";
import colors from "../../../constants/colors";
import ImageSelect from "../FactFile/ImageSelect";
import { onImageSelectChange } from "../FactFile/inputChangeHandlers";
import ImageWithSkeleton from "../Misc/ImageWithSkeleton";
import ImageExtended from "./ImageExtended";

const posValues = ["fetlock", "hoofWidth", "hoofLength"];
const targetValues = ["legFR", "legFL", "legHR", "legHL"];

export default function PhotoGuideComponent({
  pos,
  target,
  images,
  cms,
  completed,
  reset,
  horse,
  saveImage,
}) {
  const [state, setState] = useState({ selectedImageIndex: undefined });

  async function next() {
    if (target.startsWith("leg")) {
      if (posValues.indexOf(pos) < posValues.length - 1) {
        await navigate(
          routes.photoGuide({
            id: horse.id,
            target,
            pos: posValues[posValues.indexOf(pos) + 1],
          })
        );
      } else if (targetValues.indexOf(target) < targetValues.length - 1) {
        await navigate(
          routes.photoGuide({
            id: horse.id,
            target: targetValues[targetValues.indexOf(target) + 1],
            pos: posValues[0],
          })
        );
      } else {
        await navigate(routes.detailView(horse.id));
      }
    } else {
      await navigate(routes.detailView(horse.id));
    }
  }

  return (
    <PhotoGuideWrapper>
      <section className={"thumbnails"}>
        <div className={"icon"}>
          <CrosshairIcon height={32} width={32} stroke={colors.red.primary} />
        </div>
        <div className={"content"}>
          <p className={"hint"}>{cms.Hinweis[parsePos(pos)]}</p>
          <ImageWithSkeleton
            image={
              pos === 0
                ? ""
                : cms.Thumbnails[parsePos(pos)]?.localFile.childImageSharp
                    ?.gatsbyImageData
            }
          />
          <ImageWithSkeleton
            image={
              cms.Thumbnails[parseTarget(target)]?.localFile.childImageSharp
                ?.gatsbyImageData
            }
            width={64}
            height={64}
          />
        </div>
      </section>
      <section className={"instructions"}>
        <div className={"icon"}>
          <InfoIcon height={32} width={32} stroke={colors.yellow.primary} />
        </div>
        <div className={"content"}>
          <p>{cms.Photo_Guide_Texte.Starte_Aufnahme}</p>
        </div>
      </section>

      <section className={"image-preview"}>
        <div className={"icon"}>
          <CameraIcon height={32} width={32} stroke={colors.green.primary} />
        </div>
        <div className={"content"}>
          {images?.length === 1 && (
            <div className={"single-image-container"}>
              <ImageExtended alt={""} src={images[0]} />
            </div>
          )}
          {images?.length === 3 && (
            <>
              <ImageSelect
                images={images.map((key, index) => (
                  <ImageExtended
                    src={images?.[index]}
                    alt={"Aufgenommenes Bild"}
                    onShortClick={() => {
                      onImageSelectChange({
                        setState,
                        newState: index + 1,
                        property: "selectedImageIndex",
                      });
                    }}
                  />
                ))}
                options={[1, 2, 3]}
                value={state.selectedImageIndex}
                onChange={(newState) => {
                  onImageSelectChange({
                    setState,
                    newState,
                    property: "selectedImageIndex",
                  });
                }}
              />
              <Button
                style={{ display: completed ? "none" : "flex" }}
                onClick={() => {
                  console.log(state, state.selectedImageIndex);
                  saveImage(state.selectedImageIndex);
                }}
                className={"primary"}
              >
                {cms.Photo_Guide_Texte.Speichern}
              </Button>
            </>
          )}
          {(images?.length === 0 || !images) && (
            <div className={"placeholder"}>
              <p>{cms.Photo_Guide_Texte.Keine_Bilder}</p>
              <Button
                className={"primary"}
                onClick={() => {
                  if (
                    DeviceOrientationEvent &&
                    typeof DeviceOrientationEvent.requestPermission ===
                      "function"
                  ) {
                    DeviceOrientationEvent.requestPermission()
                      .then((r) => {
                        navigate(routes.camera({ id: horse.id, pos, target }));
                        console.log(r);
                      })
                      .catch((err) => console.err(err));
                  } else {
                    navigate(routes.camera({ id: horse.id, pos, target }));
                  }
                }}
              >
                {cms.Photo_Guide_Texte.Aufnahme_Starten}
              </Button>
            </div>
          )}
          <div className={"button-row"}>
            <div className={"button-row-button"}>
              <Button
                className={"secondary"}
                onClick={reset}
                style={{ display: completed ? "flex" : "none" }}
              >
                {cms.Photo_Guide_Texte.Zuruecksetzen}
              </Button>
              <Button
                className={"primary"}
                onClick={next}
                style={{ display: completed ? "flex" : "none" }}
              >
                Weiter
                {/*  todo source from strapi */}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PhotoGuideWrapper>
  );
}
