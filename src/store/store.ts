import { ThunkAction, Action, configureStore } from "@reduxjs/toolkit";
import { weatherSlice } from "./weather/weatherSlice";

export const store = configureStore({
  reducer: {
    [weatherSlice.name]: weatherSlice.reducer,
  },
  devTools: true,
});

export const initStore = () => store;

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
