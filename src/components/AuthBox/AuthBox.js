import React, { useEffect, useState } from "react";
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
import "./styles.css";

export default function AuthBoxComponent({ mode = "login" }) {
  const [message, setMessage] = useState("");
  const [errorButton, setErrorButton] = useState();
  const [shaking, setShaking] = useState(false);
  const [state, setState] = useState({ email: "", password: "", confirmPassword: "" });
  const [modeInternal, setModeInternal] = useState(mode);
  const text = AuthBoxText(modeInternal);

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const dispatch = useDispatch();

  const validatePassword = () => state.password === state.confirmPassword;

  const requestRegistration = async () => {
    if (!validatePassword()) {
      setMessage(text.noMatch);
      setShaking(true);
      return;
    }

    const result = await register({ email: state.email, password: state.password });
    if (!result.data) {
      handleAuthError({ error: result.error, setMessage, setErrorButton, setShaking });
      return;
    }

    const { user, tokens } = result.data;
    dispatch(setCredentials({ user, tokens }));
  };

  const requestLogin = async (event) => {
    event.preventDefault();
    const result = await login({ email: state.email, password: state.password });
    if (result.error) {
      handleAuthError({
        error: result.error,
        setMessage,
        setShaking,
        setErrorButton,
        sendEmailConfirmation: () => sendEmailConfirmation({ email: state.email }),
      });
      setShaking(true);
      return;
    }

    const { user, tokens, horses } = result.data;
    await navigate(routes.splashscreen);
    dispatch(setCredentials({ user, tokens, horses }));
  };

  useEffect(() => {
    if (shaking) {
      const timeout = setTimeout(() => setShaking(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [shaking]);

  return (
    <div className="auth-box-wrapper">
      <AuthBackground />
      <div className={`auth-box-root ${shaking ? "shake" : ""}`}>
        <div className="auth-box-message">
          <span>{text.authText}</span>
        </div>

        {modeInternal === "register" ? (
          <RegisterForm
            requestRegistration={requestRegistration}
            message={message}
            text={text}
            state={state}
            setState={setState}
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

        <div className="sso-container">
          <div className="text-row">
            <div className="line" />
            <span className="text">{text.ssoText}</span>
            <div className="line" />
          </div>
          <SSOProvidersComponent />
        </div>

        <div className="switch-modes">
          <span>
            {text.switchModes}
            <button
              onClick={() => setModeInternal(modeInternal === "register" ? "login" : "register")}
              className="switch-mode-button"
            >
              {text.switchModesCTA}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
