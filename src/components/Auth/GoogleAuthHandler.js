// src/components/Auth/GoogleAuthHandler.js
import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/auth/authSlice";
import routes from "../../constants/routes";

const GoogleAuthHandler = ({ token }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      if (token) {
        const response = await fetch(`${routes.api.connectGoogleCallback}?token=${token}`, {
          method: 'GET',
          credentials: 'include', // If needed for cookies or other auth data
        });
        const data = await response.json();

        if (data.user && data.tokens) {
          dispatch(setCredentials({ user: data.user, tokens: data.tokens, horses: data.horses }));
          navigate(routes.splashscreen);
        } else {
          navigate(routes.login);
        }
      } else {
        navigate(routes.login);
      }
    };

    handleGoogleCallback();
  }, [dispatch, token]);

  return <div>Loading...</div>;
};

export default GoogleAuthHandler;
