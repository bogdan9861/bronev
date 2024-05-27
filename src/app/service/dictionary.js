import { api } from "./api";

export const DictionaryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDirections: builder.mutation({
      query: ({ name = "", page }) => ({
        url: `https://core.dev.bronew.ru/api/dictionary/directions/?name=${name}&page=${page}`,
        method: "GET",
        headers: {
          Accept: "application/ld+json",
          "Content-Type": "application/json",
        },
      }),
    }),
    getDrivers: builder.mutation({
      query: ({
        firstName = "",
        lastname = "",
        patronymic = "",
        show_all = "",
        page = "1",
      }) => ({
        url: `https://core.dev.bronew.ru/api/dictionary/drivers/?firstname=${firstName}&lastname=${lastname}&patronymic=${patronymic}&=${
          show_all === true ? "show_all" : ""
        }&page=${page}`,
        method: "GET",
        headers: {
          Accept: "application/ld+json",
          "Content-Type": "application/json",
        },
      }),
    }),
    getPeople: builder.mutation({
      query: ({ page, FIO, document, phone }) => ({
        url: `https://core.dev.bronew.ru/api/people/people/smart-search/?page=${page}&FIO=${FIO}&document=${document}&phone=${phone}`,
        method: "GET",
        headers: {
          Accept: "application/ld+json",
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetDirectionsMutation,
  useGetDriversMutation,
  useGetPeopleMutation,
} = DictionaryApi;
