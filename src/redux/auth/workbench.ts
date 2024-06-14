import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";
import { pick } from "lodash";

export type Horse = {
  factFileGeneral: any;
  factFileParticularities: any;
  name: string;
  profilePicture: string;
  owner: string;
};

export type AuthState = {
  user?: Partial<User>;
  tokens?: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
  horses?: Horse[];
};

const initialState: AuthState = {
  user: undefined,
  tokens: undefined,
  horses: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      console.log("line:400", state);
      console.log("line:401", action);
      
      if (action.payload.user) {
        state.user = pick(action.payload.user, ["id", "role"]);
      }

      if (action.payload.tokens) {
        state.tokens = action.payload.tokens;
      }

      if (action.payload.horses) {
        state.horses = action.payload.horses;
      }
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
