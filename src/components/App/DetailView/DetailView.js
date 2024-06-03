import React, { useEffect, useState } from "react";
import {
  DetailViewWrapper,
  LegThumbnails,
  LegWrapper,
  CharacteristicsWrapper,
  UploadWrapper,
  TorsoThumbnail,
  Progress,
} from "./styled";
import { Button } from "../Misc/Button";
import { Link } from "gatsby";
import ImageWithSkeleton from "../Misc/ImageWithSkeleton";
import { HufschuheFuer } from "./HufschueheFuer";
import { Checkmark } from "../Misc/Checkmark";
import routes from "../../../constants/routes";
import { ProfilePicWrapper } from "../Misc/ProfilePicWrapper";
import { HorseHead } from "../../../assets/icons/HorseHead";
import Logo from "../Misc/Logo";

export default function DetailViewComponent({
  horse,
  cms,
  cmsHufschuheFuer,
  patchHorse,
  canSend,
}) {
  const [legs, setLegs] = useState(getLegsFromHoofBootsFor(horse.hoofBootsFor));
  const [message, setMessage] = useState("");

  function getLegsFromHoofBootsFor(hoofBootsFor) {
    switch (hoofBootsFor) {
      case cmsHufschuheFuer.Hufschuhe_Fuer.Optionen.strapi_json_value[0]: {
        return {
          vr: {
            germanDesignation: cms.VR,
            leg: "legFR",
          },
          vl: {
            germanDesignation: cms.VL,
            leg: "legFL",
          },
        };
      }
      case cmsHufschuheFuer.Hufschuhe_Fuer.Optionen.strapi_json_value[1]: {
        return {
          vr: {
            germanDesignation: cms.VR,
            leg: "legFR",
          },
          vl: {
            germanDesignation: cms.VL,
            leg: "legFL",
          },
          hr: {
            germanDesignation: cms.HR,
            leg: "legHR",
          },
          hl: {
            germanDesignation: cms.HL,
            leg: "legHL",
          },
        };
      }
      case cmsHufschuheFuer.Hufschuhe_Fuer.Optionen.strapi_json_value[2]: {
        return {
          hr: {
            germanDesignation: cms.HR,
            leg: "legHR",
          },
          hl: {
            germanDesignation: cms.HL,
            leg: "legHL",
          },
        };
      }
      default: {
        return {};
      }
    }
  }

  useEffect(() => {
    setLegs(getLegsFromHoofBootsFor(horse?.hoofBootsFor));
  }, [horse.hoofBootsFor]);

  function inquiry() {
    if (horse.inquiry_at) {
      return;
    }

    if (!canSend) {
      setMessage(cms.Alle_Felder);
      return;
    }

    patchHorse({ inquiryAt: Date.now() });

    // axios({
    //   method: "post",
    //   url: routes.webhooks.publish,
    //   headers: {
    //     Authorization: `Bearer ${user.tokenManager.jwt}`,
    //     // "Content-Type": "multipart/form-data",
    //   },
    //   data: {
    //     func: "publish",
    //     userid: store.getState().auth.user.id,
    //     horseid: horse.id,
    //   },
    // })
    //   .then((result) => console.log(result))
    //   .catch((err) => console.error(err, err.message));
  }

  return (
    <DetailViewWrapper>
      <section>
        <Logo />
      </section>

      <Progress>
        <div className="breadcrumbs">
          <ul>
            <li>
              <Link
                to="#characteristics"
                className={
                  horse?.factFileGeneral && horse?.factFileParticularities
                    ? "completed"
                    : ""
                }
              >
                <i className="fa fa-shopping-bag" /> Steckbriefe
              </Link>
            </li>
            <li>
              <Link
                to="#torso-pic"
                className={horse?.completed?.allFotos ? "completed" : ""}
              >
                <i className="fa fa-cart-plus" /> Fotos
              </Link>
            </li>
            <li>
              <Link to="#inquiry">
                <i className="fa fa-credit-card-alt" /> Senden
              </Link>
            </li>
          </ul>
        </div>
      </Progress>

      <section className={"section-profile-pic"}>
        <ProfilePicWrapper className={"large"}>
          {horse?.profilePicture ? (
            <img src={horse.profilePicture} alt={"Pferd Profilbild"} />
          ) : (
            <HorseHead />
          )}
        </ProfilePicWrapper>
      </section>

      {/*Steckbriefe*/}
      <CharacteristicsWrapper id={"characteristics"}>
        <h3>{cms.Steckbriefe}</h3>
        <Link to={routes.factFileGeneral(horse.id)}>
          {cms.Allgemeines}
          <div className={"checkmark"}>
            <Checkmark completed={horse?.factFileGeneral} />
          </div>
        </Link>

        <Link
          className={"secondary"}
          to={routes.factFileParticularities(horse.id)}
        >
          {cms.Besonderheiten}{" "}
          <div className={"checkmark"}>
            <Checkmark completed={horse?.factFileParticularities} />
          </div>
        </Link>
      </CharacteristicsWrapper>

      {/*Picture Torso*/}
      <p style={{ textAlign: "center" }}>
        Über die folgenden Symbole gelangst du in den Kamera-Modus, um Bilder
        deines Equiden und seiner Hufe aufzunehmen. Klicke auf die Symbole, und
        eine genaue Anweisung anzuzeigen und die Aufnahme zu starten.
      </p>

      <TorsoThumbnail id={"torso-pic"}>
        <h3>{cms.Torso_Bild}</h3>
        <Link
          onClick={() => patchSelectedHorse("torso", 0)}
          to={`photo-guide?target=torso&pos=torso`}
          className={"thumbnail-link"}
        >
          <ImageWithSkeleton
            image={
              cms.Thumbnails.Koerper.localFile.childImageSharp.gatsbyImageData
            }
            className={"thumbnail"}
            // showCheckmark={true}
            checked={!!horse?.images?.["torso"]}
          />
        </Link>
      </TorsoThumbnail>

      <HufschuheFuer
        horse={horse}
        patchHorse={patchHorse}
        cms={cmsHufschuheFuer}
        disabled={!!horse?.inquiry_at}
      />

      {/*Leg Thumbnails*/}
      <LegThumbnails>
        {Object.keys(legs).map((key, index) => {
          const germanDesignation = legs[key].germanDesignation;
          const leg = legs[key];
          return (
            <LegWrapper key={"tn-" + germanDesignation + index}>
              <p className={"germanDesignation"}>{germanDesignation}</p>
              <Link
                to={`photo-guide?target=${leg.leg}&pos=fetlock`}
                className={"thumbnail-link"}
              >
                <ImageWithSkeleton
                  image={
                    cms.Thumbnails.Fessel.localFile.childImageSharp
                      .gatsbyImageData
                  }
                  className={"thumbnail"}
                  checked={!!horse.images?.[leg.leg]?.fetlock}
                />
              </Link>

              <Link
                to={`photo-guide?target=${leg.leg}&pos=hoofWidth`}
                className={"thumbnail-link"}
              >
                <ImageWithSkeleton
                  image={
                    cms.Thumbnails.Hufbreite.localFile.childImageSharp
                      .gatsbyImageData
                  }
                  className={"thumbnail"}
                  checked={!!horse.images?.[leg.leg]?.hoofWidth}
                />
              </Link>

              <Link
                to={`photo-guide?target=${leg.leg}&pos=hoofLength`}
                className={"thumbnail-link"}
              >
                <ImageWithSkeleton
                  image={
                    cms.Thumbnails.Huflaenge.localFile.childImageSharp
                      .gatsbyImageData
                  }
                  className={"thumbnail"}
                  checked={!!horse.images?.[leg.leg]?.hoofLength}
                />
              </Link>
            </LegWrapper>
          );
        })}
      </LegThumbnails>

      <UploadWrapper>
        <Button
          className={`primary ${
            !!horse?.inquiryAt || !canSend ? "inactive" : "active"
          }`}
          onClick={inquiry}
        >
          {cms.Verooeffentlichen}
        </Button>
        <p className={"upload-message"}>{message}</p>

        <p className={"inquiry"} id={"inquiry"}>
          <span>{!!horse?.inquiryAt ? cms.Veroeffentlicht_Am : ""}</span>
          <span>
            {!!horse?.inquiryAt
              ? " " + new Date(horse.inquiryAt).toLocaleString()
              : ""}
          </span>
        </p>
      </UploadWrapper>
    </DetailViewWrapper>
  );
}
