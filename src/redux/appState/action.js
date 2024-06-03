/*
 * ACTION TYPES
 */
export const PATCH_SELECTED_HORSE = "PATCH_SELECTED_HORSE";
export const SET_ERROR = "SET_ERROR";

/*
 * ACTION CREATORS
 */

export function patchSelectedHorse(patch) {
  return {
    type: PATCH_SELECTED_HORSE,
    patch,
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}
