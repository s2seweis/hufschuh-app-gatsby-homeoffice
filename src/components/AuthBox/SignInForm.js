import React, { useRef } from "react";
import { WarningIcon } from "./assets/icons/WarningIcon";
import { Link } from "gatsby";
import routes from "../../constants/routes";
import AuthBoxText from "./AuthBoxText";
import { EyeIcon } from "../../assets/icons/Eye";

export default function SignInForm(
  { requestLogin, message, state, setState, errorButton },
  cursor = "pointer"
) {
  function handleInputChange(event) {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  const texts = AuthBoxText("signIn");

  const passwordInputRef = useRef();

  return (
    <form className={"auth-box-form"} onSubmit={requestLogin}>
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
          <Link
            className={"passwordResetLink"}
            to={routes.resetPassword}
            type={"button"}
          >
            {texts.forgotPassword}
          </Link>
        </div>

        <input
          id={"passwordInput"}
          type={"password"}
          name={"password"}
          value={state.password}
          onChange={handleInputChange}
          required={true}
          ref={passwordInputRef}
        />

        <div
          className={"eye-wrapper"}
          onClick={() => {
            passwordInputRef.current.type === "password"
              ? (passwordInputRef.current.type = "text")
              : (passwordInputRef.current.type = "password");
          }}
        >
          <EyeIcon />
        </div>
      </div>

      <div className={"message"} style={{ display: message ? "flex" : "none" }}>
        <WarningIcon stroke={"#e85d75"} />
        {message}
        {errorButton}
      </div>

      <div className={"row"}>
        <button className={"signInButton"} type={"submit"}>
          {texts.buttonText}
        </button>
      </div>
    </form>
  );
}
