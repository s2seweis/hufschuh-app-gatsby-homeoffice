import React, { SyntheticEvent, useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import routes from "../constants/routes";
import styled from "styled-components";
import { spacing } from "../constants/spacing";
import { Button } from "../components/App/Misc/Button";
import {navigate} from "gatsby";

const SetNewPassword = styled.form`
  padding: ${spacing.spaceMd};
  max-width: 800px;

  .input-group + .input-group {
    margin-top: ${spacing.spaceSm};
  }

  .input-group {
    display: flex;
    flex-direction: column;

    label {
      font-weight: bold;
    }

    input {
      padding: ${spacing.space2xs};
    }
  }


  .button-row {
    display: flex;
    justify-content: space-between;
  }
`;

export default function NewPasswordPage({ location }: { location: any }) {
  const [state, setState] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    // check password against guidelines
    let rules = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/
    );
    if (!rules.test(state.password)) {
      setMessage(
        "Das Passwort muss mindestens 8 Zeichen enthalten, darunter mindestens eine Zahl, ein Groß- und ein Kleinbuchstabe."
      );
      setColor("red");
      return;
    }

    if (state.password !== state.passwordConfirmation) {
      setMessage("Die Passwörter stimmen nicht überein.");
      setColor("red");
      return;
    }

    // get token from search params
    const url = new URL(location.href);
    const token = url.searchParams.get("token");

    axios
      .post(routes.api.resetPassword, {
        token,
        password: state.password,
      })
      .then((response) => {
        // Handle success.
        setMessage("Dein Passwort wurde geändert.");
        setColor("green");
        setState({
          password: "",
          passwordConfirmation: "",
        });
        // TODO source form strapi
      })
      .catch((error) => {
        // Handle error.
        setMessage("Ein Fehler ist aufgetreten.");
        console.log("An error occurred:", error.response);
        setColor("red");
      });
  }

  function onChange(event: SyntheticEvent) {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      // @ts-ignore
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <Layout>
      <SetNewPassword onSubmit={onSubmit}>
        <p>Hier kannst du ein neues Password vergeben.</p>
        <div className={"input-group"}>
          <label htmlFor={"password-input"}>Neues Passwort</label>
          <input
            type={"password"}
            name={"password"}
            id={"password-input"}
            value={state.password}
            onChange={(event) => onChange(event)}
          />
        </div>

        <div className={"input-group"}>
          <label htmlFor={"password-confirmation-input"}>
            Passwort Bestätigen
          </label>
          <input
            type={"password"}
            name={"passwordConfirmation"}
            id={"password-confirmation-input"}
            value={state.passwordConfirmation}
            onChange={(event) => onChange(event)}
          />
        </div>

        <p style={{ color: color }}>{message}</p>

        <div className={"button-row"}>
          <Button
              className={"secondary"}
              type={"button"}
              onClick={() => navigate(routes.login)}
          >
            Zurück
          </Button>
          <Button className={"primary"} type={"submit"}>
            Senden
          </Button>
        </div>
      </SetNewPassword>
    </Layout>
  );
}
