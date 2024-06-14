import axios from "axios";
import routes from "../constants/routes";
import store from "../redux/store";
import { setUser } from "../redux/auth/action";
import { navigate } from "gatsby";
import { setHorses } from "../redux/horses/action";
import { parseHorses } from "./parseHorse";
import { baseApi } from "../redux/api/baseApi";

/**
 * Register a new auth with strapi
 * @param email
 * @param password
 * username = email
 * @param handleAuthError
 * @returns {Promise<unknown>}
 * * * resolves with {auth: userData, jwt: jwtToken}
 * * * rejects with an error ({status, data}
 */
export function register({ email, password, handleAuthError }) {
  // Request API.
  // Add your own code here to customize or restrict how the public can auth new users.
  // return new Promise((resolve, reject) => {
  axios
    .post(routes.api.register, {
      email: email,
      password: password,
    })
    .then((response) => {
      navigate(routes.confirmMail);
    })
    .catch((error) => {
      // Handle error.
      console.error(error);
      handleAuthError(error);
    });
  // });
}

/**
 *
 * @param email
 */
export function sendEmailConfirmation({ email }) {
  return axios.post(routes.api.sendEmailConfirmation, {
    email: email, // auth's email
  });
}
