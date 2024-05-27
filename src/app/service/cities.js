import { api } from "./api";

export const CitiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.mutation({
      query: () => ({
        url: `https://svida.routeam.ru/api/cities`,
        method: "GET",
        mode: "no-cors",
        headers: {
          Connection: "keep-alive",
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetCitiesMutation } = CitiesApi;
