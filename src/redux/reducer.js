import { combineReducers } from "redux";
import { appState } from "./appState/reducer";
import { auth } from "./auth/reducer";
import { upload } from "./upload/reducer";
import {horses} from "./horses/reducer";


// combined reducer
const combinedReducer = combineReducers({
  horses: horses,
  appState: appState,
  auth,
  upload
});

// resets auth data (e.g. after logout)
// has to be at top level
const RESET = "RESET";
export function reset() {
  return {
    type: RESET,
  };
}

/* ROOT REDUCER */
const rootReducer = (state, action) => {
  if (action.type === RESET) {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export default rootReducer;
