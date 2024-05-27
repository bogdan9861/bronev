import { api } from "./api";

export const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUset: builder.query({
      query: () => ({
        url: `https://core.dev.bronew.ru/api/users/current `,
        method: "GET",
        headers: {
          Accept: "application/ld+json",
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetCurrentUsetQuery } = UserApi;
