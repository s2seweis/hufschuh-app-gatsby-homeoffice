import store from "../../../redux/store";
import axios from "axios";
import routes from "../../../constants/routes";
import { localToStrapi } from "./parseFactFileParticularities";
import * as Sentry from "@sentry/gatsby";

export function putFactFileParticularities({ data, strapiHorseId }) {
  const user = store.getState().auth.user;

  return new Promise((resolve, reject) => {
    axios
      .put(
        routes.api.horse(strapiHorseId),
        {
          Steckbrief_Besonderheiten: localToStrapi(data),
        },
        {
          headers: {
            Authorization: `Bearer ${user.tokenManager.jwt}`,
          },
        }
      )
      .then((result) => result.data)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
          Sentry.captureException(err);
          reject(err)
      });
  });
}
