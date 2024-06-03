import React, { SyntheticEvent, useState } from "react";
import Layout from "../components/Layout";
import { PasswordReset } from "../components/App/ResetPassword/styled";
import { Button } from "../components/App/Misc/Button";
import routes from "../constants/routes";
import { navigate } from "gatsby";
import axios from "axios";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    axios
      .post(routes.api.forgotPassword, {
        email, // user's email
      })
      .then(async (response) => {
        await navigate(routes.passwordResetMailSent);
        // setMessage("Bitte überprüfe deine Mails.");
        // setEmail("");
        // setColor("green");
      })
      .catch((error) => {
        setMessage(
          "Ein Fehler ist aufgetreten. Bitte versuche es später erneut."
        );
        setColor("red");
        console.log("An error occurred:", error.response);
      });
  }

  return (
    <Layout>
      <PasswordReset>
        <p>Gib deine Mailadresse ein, um dein Passwort zurückzusetzen.</p>
        <form onSubmit={onSubmit}>
          <div className={"input-group"}>
            <label htmlFor={"email-input"}>E-Mail</label>
            <input
              type={"email"}
              id={"email-input"}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
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
        </form>
      </PasswordReset>
    </Layout>
  );
}
