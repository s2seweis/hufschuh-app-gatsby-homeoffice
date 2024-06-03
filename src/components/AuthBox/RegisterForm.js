import React from "react";
import { WarningIcon } from "./assets/icons/WarningIcon";
import AuthBoxText from "./AuthBoxText";

export default function RegisterForm({
  requestRegistration,
  message,
  text,
  state,
  setState,
  validatePassword,
  handleAuthError,
  setMessage,
  setShaking,
}) {
  function handleInputChange(event) {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  console.log("line:9", requestRegistration);
  console.log("line:10", message);
  console.log("line:11", text);
  console.log("line:12", state);

  const texts = AuthBoxText("register");

  function onSubmit(event) {
    event.preventDefault();

    // check password against guidelines
    let rules = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/);
    if (!rules.test(state.password)) {
      setMessage(
        "Das Passwort muss mindestens 8 Zeichen enthalten, darunter mindestens eine Zahl, ein Groß- und ein Kleinbuchstabe."
      );
      setShaking(true);
      return;
    }

    requestRegistration({
      email: state.email,
      password: state.password,
      handleAuthError: handleAuthError,
    });
    console.log("line:100", handleAuthError);
    console.log("line:101", requestRegistration);
  }

  return (
    <form className={"auth-box-form"} onSubmit={(event) => onSubmit(event)}>
      <div className={"row"}>
        <label htmlFor={"emailInput"}>{texts.email}</label>
        <input
          id={"emailInput"}
          type={"email"}
          name={"email"}
          value={state.email}
          onChange={handleInputChange}
          required={true}
          autoFocus
        />
      </div>

      <div className={"row"}>
        <div className={"labelRow"}>
          <label htmlFor={"passwordInput"}>{texts.password}</label>
        </div>
        <input
          id={"passwordInput"}
          type={"password"}
          name={"password"}
          value={state.password}
          onChange={handleInputChange}
          required={true}
        />
      </div>

      <div className={"row"}>
        <div className={"labelRow"}>
          <label htmlFor={"confirmPasswordInput"}>{texts.confirmPassword}</label>
        </div>
        <input
          id={"confirmPasswordInput"}
          type={"password"}
          name={"confirmPassword"}
          value={state.confirmPassword}
          onChange={(event) => {
            handleInputChange(event);
            validatePassword(event);
          }}
          required={true}
        />
      </div>

      <div className={"message"} style={{ display: message ? "flex" : "none" }}>
        <WarningIcon stroke={"#e85d75"} />
        {message}
      </div>

      <div className={"row"}>
        <button className={"signInButton"} type={"submit"}>
          {text.buttonText}
        </button>
      </div>
    </form>
  );
}
