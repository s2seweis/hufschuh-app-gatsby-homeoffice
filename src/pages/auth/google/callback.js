// src/pages/auth/google/callback.js
import React from "react";
import GoogleAuthHandler from "../../../components/Auth/GoogleAuthHandler";
import Layout from "../../../components/Layout"; // Ensure the path to Layout is correct

const GoogleCallback = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  return (
    <Layout>
      <GoogleAuthHandler token={token} />
    </Layout>
  );
};

export default GoogleCallback;
