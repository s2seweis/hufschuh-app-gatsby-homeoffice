import React from "react";
import { useEffect, useState } from "react";
import SSOProvidersComponent from "./SSOProviders";
import RegisterForm from "./RegisterForm";
import AuthBoxText from "./AuthBoxText";
import handleAuthError from "./handleAuthError";
import SignInForm from "./SignInForm";
import { AuthBackground } from "./authBackground";
import { useLoginMutation, useRegisterMutation } from "../../redux/api/userApi";
import { setCredentials } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { navigate } from "gatsby";
import routes from "../../constants/routes";
import { sendEmailConfirmation } from "../../services/auth";

/**
 *
 * @param mode - "register" or "signIn"
 * @returns {JSX.Element}
 * @constructor
 */
export default function AuthBoxComponent({ mode = "login" }) {
  require("./styles.css");

  // error message, displayed below the password field
  const [message, setMessage] = useState("");
  // optional: a button that is displayed in case of error
  // gets set by HandleAuthError (i.e. resend confirmation mail)
  const [errorButton, setErrorButton] = useState();
  // Auth box shakes when an error occurs
  const [shaking, setShaking] = useState(false);
  // this holds the form fields
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // copy of mode, initial value is the given paramter. User can switch it.
  const [modeInternal, setModeInternal] = useState(mode);
  // text strings for button texts etc
  const text = AuthBoxText(modeInternal);

  const [login, { isLoading }] = useLoginMutation();
  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();

  const dispatch = useDispatch();

  // validate password and request registration if they match
  async function requestRegistration(event) {
    if (!validatePassword()) {
      setMessage(text.noMatch);
      setShaking(true);
      return;
    }

    await register({ email: state.email, password: state.password }).then(
      (result) => {
        if (!result.data) {
          console.log(result)
          handleAuthError({
            error: result.error,
            setMessage,
            setErrorButton,
            setShaking,
          });
          return;
        }
        const { user, tokens } = result.data;

        dispatch(setCredentials({ user, tokens }));
      }
    );
  }

  async function requestLogin(event) {
    event.preventDefault();

    await login({ email: state.email, password: state.password }).then(
      async (result) => {
        if (result.error) {
          console.log(result.error);
          handleAuthError({
            error: result.error,
            setMessage: (message) => setMessage(message),
            setShaking: (bool) => setShaking(bool),
            setErrorButton: (button) => setErrorButton(button),
            sendEmailConfirmation: () =>
              sendEmailConfirmation({
                email: state.email,
              }),
          });
          setShaking(true);
          return;
        }

        const { user, tokens } = result.data;
        console.log("line:660", user);
        console.log("line:661", tokens);

        await navigate(routes.splashscreen);
        dispatch(setCredentials({ user, tokens }));
      }
    );
  }

  /* checks if passwords match */
  function validatePassword(event) {
    // check before submit
    if (!event) {
      return state.password === state.confirmPassword;
    }

    // check during input
    event.persist();
    if (event.target.value !== state.password) {
      setMessage(text.noMatch);
      return false;
    } else {
      setMessage("");
      return true;
    }
  }

  // stops shaking after 1000ms
  useEffect(() => {
    window.setTimeout(() => {
      setShaking(false);
    }, 1000);
  }, [shaking]);

  return (
    <div className={"auth-box-wrapper"}>
      <AuthBackground />
      <div
        className={"auth-box-root"}
        id={"signInBox"}
        style={{
          animation: shaking ? "shake 1s linear infinite" : "none",
        }}
      >
        <div className={"auth-box-message"}>
          <span>{text.authText} </span>
        </div>

        {/* display either register form or sign in form based on mode */}
        {modeInternal === "register" ? (
          <RegisterForm
            requestRegistration={requestRegistration}
            message={message}
            text={text}
            state={state}
            setState={setState}
            validatePassword={validatePassword}
            handleAuthError={(error) =>
              handleAuthError(error, setMessage, setShaking)
            }
            setMessage={setMessage}
            setShaking={setShaking}
          />
        ) : (
          <SignInForm
            requestLogin={requestLogin}
            message={message}
            text={text}
            state={state}
            setState={setState}
            errorButton={errorButton}
          />
        )}

        {/* third party sign ins */}
        <div className={"sso-container"}>
          <div className={"text-row"}>
            <div className={"line"} />
            <span className={"text"}>{text.ssoText}</span>
            <div className={"line"} />
          </div>

          <SSOProvidersComponent
            twitterButtonText={text.twitterButton}
            googleButtonText={text.googleButton}
            signInWithGoogle={() => {}}
          />
        </div>

        {/* switch mode (register vs log in */}
        <div className={"switch-modes"}>
          <div className={"spacer"} />
          <span>
            {text.switchModes}
            <button
              onClick={() => {
                if (modeInternal === "register") setModeInternal("logIn");
                else {
                  setModeInternal("register");
                }
              }}
              className={"switch-mode-button"}
            >
              {text.switchModesCTA}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
