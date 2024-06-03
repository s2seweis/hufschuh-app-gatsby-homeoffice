import { PATCH_SELECTED_HORSE, SET_ERROR } from "./action";

export const initialState = {
  selectedHorse: {
    id: 0,
    target: "",
    pos: 0,
  },
  error: false
};

export const appState = (state = initialState, action) => {
  switch (action.type) {
    case PATCH_SELECTED_HORSE: {
      const newState = Object.assign(state.selectedHorse, action.patch);
      return Object.assign({}, state, {
        selectedHorse: newState,
      });
    }

    case SET_ERROR: {
      return Object.assign({}, state, {
        error: action.error,
      });
    }

    default:
      return state;
  }
};
