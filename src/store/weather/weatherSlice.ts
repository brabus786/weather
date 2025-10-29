import { Weather } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WeatherProcesses = 'get_current_weather';
export interface WeatherState {
  currentWeather: null | Weather;
}


const weatherState: WeatherState = {
  currentWeather: null,
};

export const weatherSlice = createSlice({
  name: "weatherSlice",
  initialState: weatherState,
  reducers: {
    setCurrentWeather(state, action: PayloadAction<Weather>) {
      return { ...state, currentWeather: action.payload };
    },
  },
});

export const {
  setCurrentWeather,
} = weatherSlice.actions;
