import React, { useRef, useState } from "react";
import { FactFileForm } from "../styled";
import { Button } from "../../Misc/Button";
import { InputGroup, TypedInput } from "../TypedInput";
import routes from "../../../../constants/routes";
import ConfirmText from "./ConfirmText";
import Logo from "../../Misc/Logo";

export const f1initial = {
  Geburtsjahr: "",
  Groesse: "",
  Gewicht: "",
  Letzte_Hufbearbeitung: "",
  Letzte_Hufschuhe: {},
  Letzte_Hufschuhe_selected: [],
  Terrain: "",
  Terrain_Andere: "",
  Hufform: "",
  Hufbearbeitung_Gelesen: false,
};

export default function FactFileGeneralForm({
  cms,
  saveFactFileGeneral,
  horse,
  cmsMisc,
  initialState,
}) {
  // manages input vales, gets send to strapi
  const [state, setState] = useState(initialState || f1initial);
  // this element shows a message that all fields need to be filled out
  const messagRef = useRef();
  const [message, setMessage] = useState("");

  // saves form
  function onSubmit(event) {
    event.preventDefault();

    let findEmptyField = false;
    // check if all fields are filled out
    const excluded = [
      "Letzte_Hufschuhe",
      "Letzte_Hufschuhe_selected",
      "Hufschuhe_Fuer",
      "Stellungsfehler",
      "Terrain_Andere",
    ];
    Object.keys(state).forEach((key) => {
      const item = state[key];
      if (
        !item &&
        ((typeof item === "object" && Object.keys(item).length === 0) ||
          !item) &&
        !key.endsWith("Andere") &&
        !excluded.includes(key)
      ) {
        findEmptyField = true;
      }
      if (key === "Letzte_Hufschuhe") {
        // TODO
        // Object.keys(item).map((key) => {
        //   const shoe = item[key];
        //   if (!shoe.rating) findEmptyField = true;
        // });
      }
    });

    if (findEmptyField) {
      setMessage(cms.Meta.FelderFehlen);

      messagRef.current.style.display = "inline";
      return;
    }

    saveFactFileGeneral(horse.id, state);
  }

  return (
    // Queries for the images used for image select inputs
    // order is given by the query in the page.
    // Alternatively, add order fields in strapi and sort here.
    <FactFileForm onSubmit={onSubmit}>
      <Logo />
      {Object.keys(cms).map((key, index) => {
        if (
          key === "Meta" ||
          key === "Hufschuhe_Fuer" ||
          key === "Stellungsfehler"
        )
          return;
        const field = cms[key];

        /*
             Fields that have special conditions etc.
             */
        let showHint;
        let insertAfterInput;

        if (key === "Letzte_Hufbearbeitung") {
          // if last option is selected (>30 days)
          if (
            state.Letzte_Hufbearbeitung ===
            field.Optionen.strapi_json_value[field.Optionen.length - 1]
          ) {
            showHint = true;
          }
          insertAfterInput = (
            <ConfirmText
              text={field.Erklaerung}
              checkboxText={field.Gelesen}
              buttonText={field.InfoButton}
              link={routes.padsInformation}
              value={state.Hufbearbeitung_Gelesen}
              onChange={(event) => {
                event.persist();
                setState((prev) => ({
                  ...prev,
                  Hufbearbeitung_Gelesen: event.target.checked,
                }));
              }}
            />
          );
        }

        /* Terrain */
        // if "Andere" is selected, show another input field
        const optionsHV = cms["Terrain"].Optionen;
        if (
          key === "Terrain" &&
          state["Terrain"]?.value === optionsHV[optionsHV.length - 1]
        ) {
          insertAfterInput = (
            <div className={"insert-field"}>
              <label htmlFor={key + "additional-field"}>
                {cms.Terrain.Titel_Andere}
              </label>
              <TypedInput
                id={key + "additional-field"}
                state={state}
                setState={setState}
                name={"Terrain_Andere"}
                value={state["Terrain_Andere"]}
                type={"text"}
              />
            </div>
          );
        }

        /*
            Automatic Generation for fields with no special instructions etc.
             */

        return (
          <InputGroup
            title={field.Titel}
            subtext={field.Subtext}
            help={field.Hilfstext}
            hint={field.Hinweis}
            showHint={showHint}
            key={"input-group" + index}
            insertAfterInput={insertAfterInput}
          >
            <TypedInput
              state={state}
              value={state[key]}
              setState={setState}
              name={key}
              options={field.Optionen}
              type={field.Typ?.toLowerCase() || "select"}
              images={[
                field.Bild1?.localFile,
                field.Bild2?.localFile,
                field.Bild3?.localFile,
              ]}
              showRanking={
                state.Letzte_Hufschuhe &&
                !!Object.keys(state.Letzte_Hufschuhe)?.length
              }
              starSelectTitle={cmsMisc.StarSelectTitle}
            />
          </InputGroup>
        );
      })}

      <div className={"bottom-row"}>
        <span className={"fill-out"} ref={messagRef}>
          {message}
        </span>
        <Button className={"primary save-button"}>{cms.Meta.Speichern}</Button>
      </div>
    </FactFileForm>
  );
}
