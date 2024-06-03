import { baseApi } from "./baseApi";
import { User } from "../types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User", "Horse"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User", "Horse"],
    }),
    getUser: builder.query<User, string>({
      query: (userId) => `/users/${userId}`,
      // transformResponse(baseQueryReturnValue, meta, arg) {
      //   console.log(baseQueryReturnValue, meta);
      // },
    }),
    updateUser: builder.mutation({
      query: (options) => {
        return {
          url: `/users/${options.userId}`,
          method: "PATCH",
          body: options.patch,
        };
      },
      invalidatesTags: ["User"],
      onCacheEntryAdded: (
        // arg: QueryArg,
        // api: MutationCacheLifecycleApi<
        //   QueryArg,
        //   BaseQuery,
        //   ResultType,
        //   ReducerPath>
        arg,
        api
      ) => {
        console.log("on cache entry added", arg, api);
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useLoginMutation,
  useRegisterMutation,
} = userApi;
