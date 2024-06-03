import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type SelectedHorse = {
  id?: string;
  target?: "torso" | "leg0" | "leg1" | "leg2" | "leg3";
  pos?: number;
  temporaryImages: string[];
};

export const initialAppState: {
  selectedHorse: SelectedHorse;
  error: any;
} = {
  selectedHorse: {
    id: undefined,
    target: undefined,
    pos: undefined,
    temporaryImages: [],
  },
  error: false,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState: initialAppState,
  reducers: {
    setSelectedHorse: (
      state,
      action: PayloadAction<{ selectedHorse: SelectedHorse }>
    ) => {
      state.selectedHorse = action.payload.selectedHorse;
    },
    patchSelectedHorse: (
      state,
      action: PayloadAction<{ selectedHorse: Partial<SelectedHorse> }>
    ) => {
      state.selectedHorse = {
        ...state.selectedHorse,
        ...action.payload.selectedHorse,
      };
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
    setTemporaryImages: (
      state,
      action: PayloadAction<{ temporaryImages: string[] }>
    ) => {
      state.selectedHorse.temporaryImages = action.payload.temporaryImages;
    },
    addTemporaryImage: (
      state,
      action: PayloadAction<{ temporaryImage: string }>
    ) => {
      if (state.selectedHorse.temporaryImages) {
        state.selectedHorse.temporaryImages.push(action.payload.temporaryImage);
      } else {
        state.selectedHorse.temporaryImages = [action.payload.temporaryImage];
      }
    },
  },
});

export const {
  setSelectedHorse,
  patchSelectedHorse,
  setTemporaryImages,
  addTemporaryImage,
  setError,
} = appStateSlice.actions;

export default appStateSlice.reducer;
