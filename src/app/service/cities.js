import { api } from "./api";

export const CitiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.mutation({
      query: ({ name, okato, oktmo, shortName, page }) => ({
        url: `https://svida.routeam.ru/api/cities/?name=${name}&okato=${okato}&oktmo=${oktmo}&page=${page}${
          shortName ? `&shortName=${shortName}` : ""
        }`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCitiesMutation } = CitiesApi;
