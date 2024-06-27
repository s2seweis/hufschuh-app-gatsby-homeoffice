import React, { useEffect } from "react";
import { navigate } from "gatsby"; // Ensure you have gatsby for navigation
import axios from 'axios';
import Layout from "../../../components/Layout"; // Ensure the path to Layout is correct

const GoogleCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log("line:100 - running?");

    const exchangeCodeForToken = async (authCode) => {
      try {
        const response = await axios.post('http://localhost:3210/v1/auth/google/callback', { code: authCode });
        const { access_token, id_token } = response.data;
        
        if (access_token) {
          localStorage.setItem('accessToken', access_token); // Store access token in local storage
          localStorage.setItem('idToken', id_token); // Store ID token in local storage
          navigate('/dashboard'); // Redirect to a dashboard or home page after storing the token
        } else {
          console.error('No tokens received');
        }
      } catch (error) {
        console.error('Error exchanging code for token:', error);
      }
    };

    if (code) {
      exchangeCodeForToken(code);
    } else {
      console.error("No code found in the URL");
    }
  }, []);

  return (
    <Layout>
      <div>Processing authentication...</div>
    </Layout>
  );
};

export default GoogleCallback;
