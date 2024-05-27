import { createSlice } from "@reduxjs/toolkit";
import { CitiesApi } from "../app/service/cities";

const initialState = {
  data: [],
  total: 0,
  loading: true,
  error: false,
};

const CitiesSlicie = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      CitiesApi.endpoints.getCities.matchPending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      CitiesApi.endpoints.getCities.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
        state.loading = false;
      }
    );
    builder.addMatcher(
      CitiesApi.endpoints.getCities.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default CitiesSlicie.reducer;

export const selectCities = (state) => state.cities;
