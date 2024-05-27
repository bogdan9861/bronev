import { createSlice } from "@reduxjs/toolkit";
import { DictionaryApi } from "../app/service/dictionary";

const initialState = {
  data: [],
  total: 0,
  loading: false,
  error: false,
};

const PeopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      DictionaryApi.endpoints.getPeople.matchPending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      DictionaryApi.endpoints.getPeople.matchFulfilled,
      (state, action) => {
        state.data = action.payload["hydra:member"];
        state.total = action.payload["hydra:totalItems"];
        state.loading = false;
      }
    );
    builder.addMatcher(
      DictionaryApi.endpoints.getPeople.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default PeopleSlice.reducer;

export const selectPeople = (state) => state.people;
