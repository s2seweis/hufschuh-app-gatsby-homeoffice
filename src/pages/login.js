import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { login } from "../services/auth";
import { AuthBox } from "../components/AuthBox";
import queryString from 'query-string';
import { navigate } from "gatsby";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/auth/authSlice";
import routes from "../constants/routes";

export default function LoginPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);

    // Combine the tokens into the desired object format
    const tokens = {
      access: {
        token: parsed.accessToken,
        expires: parsed.accessExpires
      },
      refresh: {
        token: parsed.refreshToken,
        expires: parsed.refreshExpires
      }
    };

    const user = parsed.user ? JSON.parse(parsed.user) : null;
    const horses = parsed.horses ? JSON.parse(parsed.horses) : null;

    console.log("Tokens:", tokens);
    console.log("User:", user);
    console.log("Horses:", horses);

    // Dispatch the credentials to the Redux store if necessary
    if (user && tokens) {
      navigate(routes.splashscreen);
      dispatch(setCredentials({ user, tokens }));
    }

    // Navigate to the splashscreen if necessary
    // navigate("/splashscreen");
  }, [dispatch]);

  return (
    <Layout>
      <AuthBox mode={"login"} />
    </Layout>
  );
}
