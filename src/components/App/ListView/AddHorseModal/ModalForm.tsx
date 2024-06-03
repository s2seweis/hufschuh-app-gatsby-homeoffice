import React, { FormEventHandler, useEffect, useState } from "react";
import { ProfilePicWrapper } from "../../Misc/ProfilePicWrapper";
import { HorseHead } from "../../../../assets/icons/HorseHead";
import { TrashIcon } from "../../../../assets/icons/Trash";
import { Button } from "../../Misc/Button";
import { AddHorseForm } from "./styled";
import routes from "../../../../constants/routes";
import { navigate } from "gatsby";

type FormState = {
  name: string;
  profilePicture: string;
};

export const ModalForm = ({
  initialState,
  onSubmit,
  cms,
  newHorse,
  deleteHorse,
}: {
  initialState: FormState;
  onSubmit: (state: FormState) => void;
  deleteHorse?: () => void;
  cms: any;
  newHorse: boolean;
}) => {
  const [state, setState] = React.useState(
    initialState || {
      name: "",
      profilePicture: "",
    }
  );

  const fileInput = React.createRef();
  const [fileInputChange, setFileInputChange] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    // @ts-ignore
    if (fileInput?.current?.files && fileInput?.current?.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // @ts-ignore
        setState((prevState) => ({
          ...prevState,
          // @ts-ignore
          profilePicture: event.target.result,
        }));
      };
      // @ts-ignore
      reader.readAsDataURL(fileInput.current.files[0]);
    }
  }, [fileInputChange]);

  return (
    <AddHorseForm
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(state);
      }}
      // onReset={onReset}
    >
      <div className={"form-meta"}>
        <h2>{!newHorse ? cms.Titel_Pferd_Bearbeiten : cms.Titel}</h2>
        <p>{cms.Hinweis}</p>
      </div>

      <div className={"input-group form-row"}>
        <label htmlFor={"new-pferde-name"}>{cms.Input_Name}</label>
        <input
          id={"new-pferde-name"}
          name={"name"}
          type={"text"}
          value={state.name}
          className={"input"}
          onChange={(event) => {
            onInputChange(event);
          }}
        />
      </div>
      <div className={"input-group form-row"}>
        <label>{cms.Input_Foto}</label>
        <div className={"picture-input-row"}>
          <ProfilePicWrapper className={"small"}>
            {state.profilePicture ? (
              <img
                id="Profilbild Platzhalter"
                src={state.profilePicture}
                alt="Profilbild Platzhalter"
              />
            ) : (
              <HorseHead
                fill={undefined}
                stroke={undefined}
                strokeLinecap={undefined}
                strokeLinejoin={undefined}
                strokeWidth={undefined}
              />
            )}
          </ProfilePicWrapper>
          <label htmlFor="file-upload" className="input input-file">
            {cms.Input_Foto_Aendern}
          </label>

          <input
            id="file-upload"
            type="file"
            name={"imageSrc"}
            // @ts-ignore
            ref={fileInput}
            accept={"image/png, image/jpeg"}
            onChange={() => {
              setFileInputChange(!fileInputChange);
            }}
          />
        </div>
      </div>

      {!newHorse ? (
        <button
          className={"delete-pferde"}
          onClick={deleteHorse}
          style={{
            display: !newHorse ? "flex" : "none",
            color: "red",
            marginTop: "1rem",
            backgroundColor: "transparent",
            border: "none",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
          type={"button"}
        >
          <TrashIcon
            fill={undefined}
            stroke={undefined}
            strokeLinecap={undefined}
            strokeLineJoin={undefined}
            strokeWidth={undefined}
          />{" "}
          {cms.Pferd_Loeschen}
        </button>
      ) : (
        ""
      )}

      <div className={"form-row button-row"}>
        <Button
          className={"secondary"}
          type={"button"}
          onClick={() => {
            navigate(routes.app);
          }}
        >
          {cms.Abbrechen}
        </Button>
        <Button className={"primary"} type={"submit"}>
          {cms.Speichern}
        </Button>
      </div>
    </AddHorseForm>
  );
};
