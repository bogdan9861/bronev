import { createSlice } from "@reduxjs/toolkit";
import { DictionaryApi } from "../app/service/dictionary";

const initialState = {
  data: [],
  total: 0,
  loading: false,
  error: false,
};

const DriversSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      DictionaryApi.endpoints.getDrivers.matchPending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      DictionaryApi.endpoints.getDrivers.matchFulfilled,
      (state, action) => {
        state.data = action.payload["hydra:member"];
        state.total = action.payload["hydra:totalItems"];
        state.loading = false;
      }
    );
    builder.addMatcher(
      DictionaryApi.endpoints.getDrivers.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default DriversSlice.reducer;

export const selectDrivers = (state) => state.drivers;
