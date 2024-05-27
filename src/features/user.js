import { createSlice } from "@reduxjs/toolkit";
import { UserApi } from "../app/service/user";

const initialState = {
  username: "",
};

const UserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      UserApi.endpoints.getCurrentUset.matchFulfilled,
      (state, action) => {
        state.username = action.payload.username;
      }
    );
  },
});

export default UserSlice.reducer;

export const selectUser = (state) => state.user;

export const { logout } = UserSlice.actions;
