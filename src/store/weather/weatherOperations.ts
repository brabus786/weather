import { Dispatch } from "redux";
import { setCurrentWeather } from "./weatherSlice";
import { toast } from "react-toastify";
import {
  addProcess,
  removeProcess,
} from "../runningProcesses/runningProcessesSlice";
import { getWeatherByCity } from "@/api/weather";

export const getWeatherByCoordsOperation =
  (city: string, callback?: () => void) => async (dispatch: Dispatch) => {
    try {
      dispatch(addProcess("get_current_weather"));
      const weather = await getWeatherByCity(city);
      if (weather) {
        dispatch(setCurrentWeather(weather));
        callback?.();
      }
      dispatch(removeProcess("get_current_weather"));
    } catch {
      toast.error(
        `Failed to fetch weather data for ${city}. Please try again.`
      );
      dispatch(removeProcess("get_current_weather"));
    }
  };
