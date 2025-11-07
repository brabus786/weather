import { ThunkAction, Action, configureStore } from "@reduxjs/toolkit";
import { weatherSlice } from "./weather/weatherSlice";
import { runningProcessesSlice } from "./runningProcesses/runningProcessesSlice";
import { starWarsSlice } from "./starWars/starWarsSlice";
import { popupsSlice } from "./popups/popupsSlice";

export const store = configureStore({
  reducer: {
    [weatherSlice.name]: weatherSlice.reducer,
    [runningProcessesSlice.name]: runningProcessesSlice.reducer,
    [starWarsSlice.name]: starWarsSlice.reducer,
    [popupsSlice.name]: popupsSlice.reducer,
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
