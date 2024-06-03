import axios from "axios";
import routes from "../../constants/routes";
import store from "../../redux/store";
import { getStrapiIds } from "../getStrapiIds";

const legInitial = {
  Seite: "",
  Laenge: "",
  Breite: "",
};

const fotoInitialState = {
  Koerper: "",
  VR: legInitial,
  VL: legInitial,
  HR: legInitial,
  HL: legInitial,
};

/*
  creates a new pferde in strapi
 */
export function createHorse(name) {
  const user = store.getState().auth.user;

  return new Promise((resolve, reject) => {
    axios
      .post(
        routes.api.horses,
        {
          Steckbrief_Allgemeines: {},
          Steckbrief_Besonderheiten: {},
          Fotos: fotoInitialState,
          Name: name,
          user: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.tokenManager.jwt}`,
          },
        }
      )
      .then((result) => result.data)
      .then((data) => {
        resolve(getStrapiIds(data));
      })
      .catch((err) => reject(err));
  });
}
