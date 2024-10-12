import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { AuthBox } from "../components/AuthBox";
import queryString from 'query-string';
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/auth/authSlice";

export default function LoginPage() {
  const dispatch = typeof window !== "undefined" ? useDispatch() : null; // Check if window is available

  useEffect(() => {
    if (typeof window !== "undefined") {  // Ensure window is available
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
      if (user && tokens && dispatch) {
        dispatch(setCredentials({ user, tokens }));
      }

      // You can uncomment this to navigate to the splashscreen if needed
      // navigate("/splashscreen");
    }
  }, [dispatch]);

  return (
    <Layout>
      <AuthBox mode={"login"} />
    </Layout>
  );
}
