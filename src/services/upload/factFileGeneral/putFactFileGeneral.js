import store from "../../../redux/store";
import axios from "axios";
import routes from "../../../constants/routes";
import { localToStrapi } from "./parseFactFileGeneral";

export function putFactFileGeneral({ data, strapiHorseId }) {
  const user = store.getState().auth.user;

  return new Promise((resolve, reject) => {
    axios
      .put(
        routes.api.horse(strapiHorseId),
        {
          Steckbrief_Allgemeines: localToStrapi(data),
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
      .catch((err) => reject(err));
  });
}
