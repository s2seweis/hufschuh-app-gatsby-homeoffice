import React from "react";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { navigate } from "gatsby";
import routes from "../../constants/routes";
// import GoogleButton from "react-google-button";

// const twitterLogo = require("./assets/logos/twitterLogo.png");

// TODO implement Twitter Auth
// TODO Reimplement Google Auth (only have to unlock in Firebase?)
export default function SSOProvidersComponent({
  twitterButtonText,
  googleButtonText,
  signInWithGoogle,
}) {
  return (
    <div className={"sso-wrapper"}>
      <FacebookLoginButton onClick={() => navigate(routes.api.connectFacebook)}>
        Weiter mit Facebook
      </FacebookLoginButton>
      <GoogleLoginButton onClick={() => navigate(routes.api.connectGoogle)}>
        Weiter mit Google
      </GoogleLoginButton>
    </div>
  );
}
