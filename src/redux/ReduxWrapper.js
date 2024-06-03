import { Provider } from "react-redux";
import store from "./store";
import React from "react";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

/*
 *  Wraps the redux provider around children
 */
export default function ReduxWrapper({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
