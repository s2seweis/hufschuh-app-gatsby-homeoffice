import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import appStateReducer from "./appState/appStateSlice";
import authReducer from "./auth/authSlice";
import LocalStorage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { useDispatch } from "react-redux";

const authPersistConfig = {
  key: "auth",
  storage: LocalStorage,
  version: 1,
  // blacklist
};

const appStatePersistConfig = {
  key: "appState",
  storage: LocalStorage,
  version: 1,
  // blacklist
};

const baseApiPersistConfig = {
  key: "api",
  storage: LocalStorage,
  version: 1,
  // blacklist
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: persistReducer(
    baseApiPersistConfig,
    (state: any, action: AnyAction) => {
      if (action.type === "RESET_STATE") {
        LocalStorage.removeItem("persist:api");
        return baseApi.reducer(undefined, action);
      }
      return baseApi.reducer(state, action);
    }
  ),
  appState: persistReducer(
    appStatePersistConfig,
    (state: any, action: AnyAction) => {
      if (action.type === "RESET_STATE") {
        LocalStorage.removeItem("persist:appState");
        return appStateReducer(undefined, action);
      }
      return appStateReducer(state, action);
    }
  ),
  auth: persistReducer(authPersistConfig, (state: any, action: AnyAction) => {
    if (action.type === "RESET_STATE") {
      LocalStorage.removeItem("persist:auth");
      return authReducer(undefined, action);
    }
    return authReducer(state, action);
  }),
});

const store = configureStore({
  reducer: (state, action) => rootReducer(state, action),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
