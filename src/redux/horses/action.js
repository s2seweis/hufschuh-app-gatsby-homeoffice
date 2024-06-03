import { base64ToFile } from "../../services/base64ToFile";
import { IMAGE_UPLOADED, UPLOAD_FAILED, UPLOAD_IMAGE } from "../upload/action";
import routes from "../../constants/routes";
import axios from "axios";
import store from "../store";
import { parseHorse, parseHorses } from "../../services/parseHorse";
import { createUiError } from "../appState/action";
import * as Sentry from "@sentry/gatsby";

/*
 * ACTION TYPES
 */
export const SET_HORSES = "SET_HORSES";

export const ADD_HORSE = "ADD_HORSE";
export const PATCH_LOCAL_HORSE = "PATCH_LOCAL_HORSE";
export const REMOVE_HORSE = "REMOVE_HORSE";
export const DELETE_LOCAL_HORSE = "DELETE_LOCAL_HORSE";

export const ADD_IMAGE = "ADD_IMAGE";
export const REMOVE_IMAGES_BUT = "REMOVE_IMAGES_BUT";

/* HELPERS */
// fetches the pferde of a auth
function fetchHorses() {
  const user = store.getState().auth.user;

  return axios.get(routes.api.horses, {
    headers: {
      Authorization: `Bearer ${user.tokenManager.jwt}`,
    },
  });
}

function deleteHorse(horseId) {
  const user = store.getState().auth.user;

  return axios.delete(routes.api.horse(horseId), {
    headers: {
      Authorization: `Bearer ${user.tokenManager.jwt}`,
    },
  });
}

export function patchStrapiHorse({ horseId, patch }) {
  const user = store.getState().auth.user;

  return axios.put(routes.api.horse(horseId), patch, {
    headers: {
      Authorization: `Bearer ${user.tokenManager.jwt}`,
    },
  });
}

/*
 * ACTION CREATORS
 */

export function setHorses(horses) {
  return {
    type: SET_HORSES,
    horses,
  };
}

export function addHorse({ id, name, profilePicture, strapiIds }) {
  return {
    type: ADD_HORSE,
    id,
    name,
    profilePicture,
    strapiIds,
  };
}

/**
 *
 * @param horseId
 * @param image
 * @param target One of: profile, leg, torso
 * @param pos number: 0,1,2 (hoof from side and from bottom)
 * @param imageSrc
 * @returns {{image, pos, type: string, target}}
 */
export function addImage(horseId, target, pos, image) {
  return {
    type: ADD_IMAGE,
    horseId,
    target,
    pos,
    image,
  };
}

/**
 * removes all images except the given one in one target/pos
 * @param horseId
 * @param target
 * @param pos
 * @param index
 * @returns {{pos, horseId, index, type: string, target}}
 */
export function removeImagesBut({ horseId, target, pos, index }) {
  return {
    type: REMOVE_IMAGES_BUT,
    horseId,
    target,
    pos,
    index,
  };
}

export function patchLocalHorse(id, patch) {
  return {
    type: PATCH_LOCAL_HORSE,
    id: id,
    patch: patch,
  };
}

export function deleteLocalHorse(id) {
  return {
    type: DELETE_LOCAL_HORSE,
    id: id,
  };
}

/* Thunks */

export function removeHorse(horseId) {
  return function (dispatch, getState) {
    return deleteHorse(horseId)
      .then(() => {
        // save to local state
        dispatch(deleteLocalHorse(horseId));
      })
      .catch((err) => {
        Sentry.captureException(err);
        throw err;
      });
  };
}

/**
 *
 * @param horseId - id of the pferde to patch
 * @param patch  - object with the properties that should be patched
 * @returns {{patch, horseId, type: string}}
 */
export function patchHorse(horseId, patch) {
  return function (dispatch, getState) {
    return patchStrapiHorse({ horseId, patch })
      .then((result) => {
        // do not replace profile picture, as this is uploaded separately
        // completed is only local
        const parsedHorse = parseHorse(result.data);

        // profilePicture: patch.profilePicture
        //   ? patch.profilePicture
        //   : `${routes.api.base}${result.data.Profil_Bild.url}`,

        if (patch.profilePicture) {
          parsedHorse.profilePicture = patch.profilePicture;
        }

        if (patch.completed) {
          parsedHorse["completed"] = patch.completed;
        }
        dispatch(patchLocalHorse(horseId, parsedHorse));
      })
      .catch((err) => {
        Sentry.captureException(err);
        throw err;
      });
  };
}

// replace local state with the information from the server
export function updateHorses() {
  return function (dispatch) {
    return fetchHorses()
      .then((result) => {
        dispatch(setHorses(parseHorses(result.data)));
      })
      .catch((err) => {
        Sentry.captureException(err);
        dispatch(createUiError(err));
      });
  };
}

function uploadImage({ file, ref, refId, field, jwt, target, pos }) {
  const formData = new FormData();
  formData.append("files", file);
  formData.append("ref", ref);
  formData.append("refId", refId);
  formData.append("field", field);

  console.log(file, ref, refId, field, jwt, target, pos);

  return {
    type: UPLOAD_IMAGE,
    payload: { formData, jwt, target, pos },
    meta: {
      offline: {
        // the network action to execute:
        effect: {
          url: routes.api.fileUpload,
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-type": "multipart/form-data",
          },
          data: formData,
        },
        // action to dispatch when effect succeeds:
        commit: { type: IMAGE_UPLOADED, meta: { target, pos } },
        // action to dispatch if network action fails permanently:
        rollback: { type: UPLOAD_FAILED, meta: { target, pos } },
      },
    },
  };
}

export function uploadTorsoImage(horseId) {
  return function (dispatch, getState) {
    const horse = getState().horses[horseId];
    const user = getState().auth.user;
    // convert base64 image to file
    const file = base64ToFile({
      base64string: horse.profilePicture,
      name: `torso.png`,
    });

    // dispatch upload action
    dispatch(
      uploadImage({
        file,
        ref: `horse`,
        refId: horse.strapiIds.horse,
        field: "Profil_Bild",
        jwt: user.tokenManager.jwt,
      })
    );
  };
}
