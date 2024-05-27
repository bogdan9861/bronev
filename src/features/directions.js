import { createSlice } from "@reduxjs/toolkit";
import { DictionaryApi } from "../app/service/dictionary";

const initialState = {
  data: [],
  total: 0,
  loading: true,
  error: false,
};

const DirectionSlice = createSlice({
  name: "directions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      DictionaryApi.endpoints.getDirections.matchPending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      DictionaryApi.endpoints.getDirections.matchFulfilled,
      (state, action) => {
        state.data = action.payload["hydra:member"];
        state.total = action.payload["hydra:totalItems"];
        state.loading = false;
      }
    );
    builder.addMatcher(
      DictionaryApi.endpoints.getDirections.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default DirectionSlice.reducer;

export const selectDirections = (state) => state.directions;
