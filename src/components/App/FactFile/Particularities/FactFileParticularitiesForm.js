import React, { useEffect, useRef, useState } from "react";
import { FactFileForm } from "../styled";
import { InputGroup, TypedInput } from "../TypedInput";
import { Button } from "../../Misc/Button";
import {
  localToStrapi,
  strapiToLocal,
} from "../../../../services/upload/factFileParticularities/parseFactFileParticularities";
import Logo from "../../Misc/Logo";

export const f2initial = {
  Equidenart: "",
  Rasse: "",
  Rasse_Andere: "",
  Reitweise: "",
  Reitweise_Andere: "",
  Nutzungszeit: "",
  Beschlagen: false,
  Vorerkrankungen: "",
  Vorerkrankungen_Andere: "",
  Hufvorerkrankungen: "",
  Hufvorerkrankungen_Andere: "",
  Stellungsanomalien: "",
  Stellungsanomalien_Andere: "",
};

export default function FactFileParticularitiesForm({
  cms,
  initialState,
  saveFactFileParticularities,
}) {
  const [state, setState] = useState(initialState || f2initial);

  const messagRef = useRef();
  const [message, setMessage] = useState("");
  const fileInputRef = useRef();
  const [fileInputChange] = useState(false);

  // if data is sourced from strapi, need to parse some field, e.g. checkbox and selects
  useEffect(() => {
    // check if one field that should be a select value is a string,
    // if yes all are sourced from strapi and not yet converted
    if (typeof state.Equidenart === "string" && state.Equidenart) {
      setState(strapiToLocal(state, cms));
    }
  }, []);

  // read file
  useEffect(() => {
    if (fileInputRef.current?.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setState((prevState) => ({
          ...prevState,
          StellungsanomalienFotos: event.target.result,
        }));
      };
      reader.readAsDataURL(fileInputRef.current.files[0]);
    }
  }, [fileInputChange]);

  // saves form
  function onSubmit(event) {
    event.preventDefault();

    let findEmptyField = false;

    /* TODO: Redo validation */

    // toggle flag to true if field is missing
    Object.keys(state).forEach((key) => {
      const item = state[key];
      if (
        item &&
        ((typeof item === "object" && Object.keys(item).length === 0) ||
          !item) &&
        !key.endsWith("Andere") &&
        !key.endsWith("Fotos") &&
        key !== "Rasse" &&
        key !== "Beschlagen"
      ) {
        findEmptyField = true;
      }
    });

    // check if the additional fields need to be filled out
    [
      "Rasse",
      "Reitweise",
      "Vorerkrankungen",
      "Hufvorerkrankungen",
      "Stellungsanomalien",
    ].forEach((p) => {
      if (
        !state[p] ||
        (state[p].index === cms[p].Optionen.strapi_json_value.length - 1 &&
          !state[p + "_Andere"])
      ) {
        if (
          p === "Rasse" &&
          state["Rasse"] &&
          (state["Equidenart"] === "Pferd" || state["Equidenart"] === "Pony")
        ) {
          findEmptyField = true;
        } else if (p !== "Rasse") {
          findEmptyField = true;
        }
      }
    });

    if (
      (!state["Rasse"] &&
        (state["Equidenart"] === "Pferd" || state["Equidenart"] === "Pony")) ||
      state["Rasse"].index ===
        cms["Rasse"].Optionen.strapi_json_value.length - 1 ||
      (state["Rasse"].index ===
        cms["Rasse"].Optionen.strapi_json_value.length - 2 &&
        !state["Rasse" + "_Andere"])
    ) {
      findEmptyField = true;
    }

    if (findEmptyField) {
      setMessage(cms.Meta.FelderFehlen);
      messagRef.current.style.display = "inline";
      return;
    }

    saveFactFileParticularities(localToStrapi(state));
  }

  return (
    // Queries for the images used for image select inputs
    // order is given by the query in the page.
    // Alternatively, add order fields in strapi and sort here.
    <FactFileForm onSubmit={onSubmit}>
      <Logo />
      {Object.keys(cms).map((key, index) => {
        if (key === "Meta") return;
        const field = cms[key];

        /*
          Fields that have special conditions etc.
          */
        let showHint;
        let insertAfterInput;

        /* RASSE */
        if (key === "Rasse") {
          // display only if pferde or pony is selected
          if (
            !(
              state["Equidenart"]?.value ===
                cms["Equidenart"]?.Optionen.strapi_json_value[0] ||
              state["Equidenart"]?.value ===
                cms["Equidenart"]?.Optionen.strapi_json_value[1]
            )
          ) {
            return;
          }
          // if "Andere" or "Rassenmix" is selected, show another input field
          if (
            state[key] &&
            (state[key].value ===
              cms["Rasse"].Optionen[cms["Rasse"].Optionen.length - 1] ||
              state[key].value ===
                cms["Rasse"].Optionen[cms["Rasse"].Optionen.length - 2])
          ) {
            insertAfterInput = (
              <>
                <div className={"insert-field"}>
                  <label htmlFor={key + "additional-field"}>
                    {cms.Rasse.Titel_Mischung}
                  </label>
                  <TypedInput
                    id={key + "additional-field"}
                    state={state}
                    setState={setState}
                    name={"Rasse_Andere"}
                    value={state["Rasse_Andere"]}
                    type={"text"}
                  />
                </div>
              </>
            );
          }
        }

        /* REITWEISE */
        if (key === "Reitweise") {
          // if "Andere" is selected, show another input field
          if (
            state["Reitweise"] &&
            state["Reitweise"].value ===
              cms["Reitweise"].Optionen[cms["Reitweise"].Optionen.length - 1]
          ) {
            insertAfterInput = (
              <div className={"insert-field"}>
                <label htmlFor={key + "additional-field"}>
                  {cms.Reitweise.Titel_Andere}
                </label>
                <TypedInput
                  id={key + "additional-field"}
                  state={state}
                  setState={setState}
                  name={"Reitweise_Andere"}
                  value={state["Reitweise_Andere"]}
                  type={"text"}
                />
              </div>
            );
          }
        }

        /* VORERKRANKUNGEN */
        // if "Andere" is selected, show another input field
        const optionsV = cms["Vorerkrankungen"].Optionen;
        if (
          key === "Vorerkrankungen" &&
          state["Vorerkrankungen"] &&
          state["Vorerkrankungen"].value === optionsV[optionsV.length - 1]
        ) {
          insertAfterInput = (
            <div className={"insert-field"}>
              <label htmlFor={key + "additional-field"}>
                {cms.Vorerkrankungen.Titel_Andere}
              </label>
              <TypedInput
                id={key + "additional-field"}
                state={state}
                setState={setState}
                name={"Vorerkrankungen_Andere"}
                value={state["Vorerkrankungen_Andere"]}
                type={"textarea"}
              />
            </div>
          );
        }

        /* HUFVORERKRANKUNGEN */
        // if "Andere" is selected, show another input field
        const optionsHV = cms["Hufvorerkrankungen"].Optionen;
        if (
          key === "Hufvorerkrankungen" &&
          state["Hufvorerkrankungen"] &&
          state["Hufvorerkrankungen"].value === optionsHV[optionsHV.length - 1]
        ) {
          insertAfterInput = (
            <div className={"insert-field"}>
              <label htmlFor={key + "additional-field"}>
                {cms.Hufvorerkrankungen.Titel_Andere}
              </label>
              <TypedInput
                id={key + "additional-field"}
                state={state}
                setState={setState}
                name={"Hufvorerkrankungen_Andere"}
                value={state["Hufvorerkrankungen_Andere"]}
                type={"textarea"}
              />
            </div>
          );
        }

        /* STELLUNGSANOMALIEN */
        const optionsSA = cms["Stellungsanomalien"].Optionen;
        if (
          key === "Stellungsanomalien" &&
          state["Stellungsanomalien"] &&
          state["Stellungsanomalien"].value === optionsSA[optionsSA.length - 1]
        ) {
          insertAfterInput = (
            <div className={"insert-field"}>
              <label htmlFor={key + "additional-field"}>
                {cms.Stellungsanomalien.Titel_Andere}
              </label>
              <TypedInput
                id={key + "additional-field"}
                state={state}
                setState={setState}
                name={"Stellungsanomalien_Andere"}
                value={state["Stellungsanomalien_Andere"]}
                type={"textarea"}
              />
            </div>
          );
        }

        /*
          Automatic generation for default fields
           */
        return (
          <InputGroup
            title={field.Titel}
            subtext={field.Subtext}
            help={field.Hilfstext}
            hint={field.Hinweis}
            showHint={showHint}
            key={"input-group" + index}
          >
            <TypedInput
              state={state}
              setState={setState}
              name={key}
              value={state[key]}
              options={field.Optionen}
              type={field.Typ?.toLowerCase() || "select"}
              images={[
                field.Bild1?.localFile,
                field.Bild2?.localFile,
                field.Bild3?.localFile,
              ]}
            />
            {insertAfterInput}
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
