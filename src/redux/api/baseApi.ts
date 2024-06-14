import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { setCredentials } from "../auth/authSlice";
import { Horse, User } from "../types";
import { Mutex } from "async-mutex";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.API_HOST}/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Access-Control-Allow-Credentials", "true");

    // @ts-ignore
    const token = getState().auth.tokens?.access?.token;
    console.log("line:900", token);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const mutex = new Mutex();
const useBaseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const release = await mutex.acquire();
  release();
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    // @ts-ignore
    result.error.data.message === "jwt expired"
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      // try to get a new token
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-tokens",
          method: "POST",
          body: {
            refreshToken: api.getState().auth.tokens.refresh.token,
          },
        },
        api,
        extraOptions
      );
      if (refreshResult.data) {
        // store the new token
        // @ts-ignore
        api.dispatch(setCredentials({ tokens: refreshResult.data }));
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch({ type: "RESET_STATE" });
        api.dispatch(setCredentials({
          user: undefined, tokens: undefined,
          // horses: []
        }));

        // api.dispatch(loggedOut());
      }
      release();
    } else {
      await mutex.waitForUnlock();
    }
  }
  return result;
};

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: useBaseQueryWithReauth,
  tagTypes: ["User", "Horse"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});
