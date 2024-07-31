import { SET_USER } from "./action";

const initialState = {
  user: false,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return Object.assign({}, state, {
        user: action.user,
      });
    }

    default:
      return state;
  }
};
