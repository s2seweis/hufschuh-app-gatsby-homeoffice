import React from "react";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { navigate } from "gatsby";
import routes from "../../constants/routes";

export default function SSOProvidersComponent() {
  const handleOAuth = (providerUrl) => {
    window.location.href = providerUrl;
  };

  return (
    <div className="sso-wrapper">
      <FacebookLoginButton onClick={() => handleOAuth(routes.api.connectFacebook)}>
        Weiter mit Facebook
      </FacebookLoginButton>
      <GoogleLoginButton onClick={() => handleOAuth(routes.api.connectGoogle)}>
        Weiter mit Google
      </GoogleLoginButton>
    </div>
  );
}
