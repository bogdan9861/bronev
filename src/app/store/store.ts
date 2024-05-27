import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { api } from "../service/api";

import user from "../../features/user";
import drivers from "../../features/drivers";
import directions from "../../features/directions";
import people from "../../features/people";
import cities from "../../features/city";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    drivers,
    directions,
    people,
    cities,
    user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
