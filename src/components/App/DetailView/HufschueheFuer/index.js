import { InputGroup, TypedInput } from "../../FactFile/TypedInput";
import React, { useState } from "react";
import { FactFileForm } from "../../FactFile/styled";
import { Styles } from "./styled";
import { pick } from "lodash";

export function HufschuheFuer({ cms, patchHorse, disabled, horse }) {
  const [state, setState] = useState(pick(horse, "hoofBootsFor"));

  return (
    <Styles>
      <FactFileForm>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <InputGroup
            title={cms.Hufschuhe_Fuer.Titel}
            subtext={cms.Hufschuhe_Fuer.Subtext}
            help={cms.Hufschuhe_Fuer.Hilfstext}
            // hint={cms.Hufschuhe_Fuer.Hinweis}
            // showHint={true}
          >
            <TypedInput
              state={state}
              value={state["hoofBootsFor"]}
              setState={(updateFunc) => {
                const newState = updateFunc();
                setState(newState);
                patchHorse(newState);
              }}
              name={"hoofBootsFor"}
              options={cms.Hufschuhe_Fuer.Optionen}
              type={"image-select"}
              images={[
                cms.Hufschuhe_Fuer.Bild1?.localFile,
                cms.Hufschuhe_Fuer.Bild2?.localFile,
                cms.Hufschuhe_Fuer.Bild3?.localFile,
              ]}
              disabled={disabled}
            />
          </InputGroup>
        </form>
      </FactFileForm>
    </Styles>
  );
}
