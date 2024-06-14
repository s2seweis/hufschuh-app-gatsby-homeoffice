import { SET_USER } from "./action";

const initialState = {
  user: false,
};

export const auth = (state = initialState, action) => {
  console.log("line:300", state);
  console.log("line:301", action);
  console.log("line:302", action.user);
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
