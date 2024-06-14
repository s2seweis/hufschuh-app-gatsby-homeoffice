/*
 * ACTION TYPES
 */
import routes from "../../constants/routes";
import { IMAGE_UPLOADED, UPLOAD_FAILED, UPLOAD_IMAGE } from "../upload/action";

export const SET_USER = "SET_USER";
export const SET_USER_DATA = "SET_USER_DATA";
export const USER_UPDATED = "USER_UPDATED";
export const USER_UPDATE_FAILED = "USER_UPDATE_FAILED";

/*
 * ACTION CREATORS
 */

export function setUser(user) {
  console.log("line:200", user);
  return {
    type: SET_USER,
    user: user,
  };
}

export function setUserData(user, userData) {
  console.log("line:201", user);
  console.log("line:202", userData);
  return {
    type: SET_USER_DATA,
    payload: { user, userData },
    meta: {
      offline: {
        // the network action to execute:
        effect: {
          url: routes.api.user,
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.tokenManager.jwt}`,
          },
          data: { Daten: userData },
        },
        // action to dispatch when effect succeeds:
        commit: { type: USER_UPDATED, meta: { userData } },
        // action to dispatch if network action fails permanently:
        rollback: { type: USER_UPDATE_FAILED, meta: { userData } },
      },
    },
  };
}


/* thunks */

