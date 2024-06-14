import { baseApi } from "./baseApi";
import { Horse, ListResultBase } from "../types";

export const horseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    horse: builder.query({
      query: ({ userId, horseId }: { userId: string; horseId: string }) => {
        return {
          url: `/users/${userId}/horses/${horseId}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        return [{ type: "Horse", id: result?.id }];
      },
    }),
    // ### - would like to use this route?
    horses: builder.query<ListResultBase & { results: Horse[] }, string>({      
      query: (userId) => {
        return {
          url: `/users/${userId}/horses`,
          method: "GET",
        };
      },
      providesTags: () => {
        return [{ type: "Horse", id: "LIST" }];
      },
    }),

    updateHorse: builder.mutation<
      Partial<Horse>,
      {
        userId: string;
        horseId: string;
        data: Partial<Horse>;
      }
    >({
      query: (options) => {
        console.log("OPT", options);
        return {
          url: `/users/${options.userId}/horses/${options.horseId}`,
          method: "PATCH",
          body: options.data,
        };
      },
      invalidatesTags: (result) => [
        // @ts-ignore
        { type: "Horse", id: result.id },
        { type: "Horse", id: "LIST" },
      ],
    }),
    createHorse: builder.mutation({
      query: (options) => {
        return {
          url: `/users/${options.userId}/horses`,
          method: "POST",
          body: options.data,
        };
      },
      invalidatesTags: [{ type: "Horse", id: "LIST" }],
    }),
    deleteHorse: builder.mutation({
      query: (options) => {
        return {
          url: `/users/${options.userId}/horses/${options.horseId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Horse", id: "LIST" }],
    }),
    uploadImage: builder.mutation<
      {
        url: string;
      },
      any
    >({
      query: (options: {
        userId: string;
        horseId: string;
        data: {
          image: string;
        };
      }) => {
        return {
          url: `/users/${options.userId}/horses/${options.horseId}/images`,
          method: "POST",
          body: options.data,
        };
      },
      invalidatesTags: (result) => [
        // @ts-ignore
        { type: "Horse", id: result.id },
        { type: "Horse", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useHorsesQuery,
  useHorseQuery,
  useCreateHorseMutation,
  useUpdateHorseMutation,
  useDeleteHorseMutation,
  useUploadImageMutation,
} = horseApi;

export const masterApi = horseApi;
