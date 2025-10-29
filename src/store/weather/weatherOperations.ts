import { getWeatherByCity } from "@/api";
import { Dispatch } from "redux";
import { setCurrentWeather } from "./weatherSlice";
import { toast } from "react-toastify";
import { addProcess, removeProcess } from "../runningProcesses/runningProcessesSlice";

export const getWeatherByCoordsOperation = (city: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(addProcess('get_current_weather'));
    const weather = await getWeatherByCity(city);
    if (weather) {
      dispatch(setCurrentWeather(weather));
    }
    dispatch(removeProcess('get_current_weather'));
  } catch {
    toast.error(`Failed to fetch weather data for ${city}. Please try again.`);
    dispatch(removeProcess('get_current_weather'));
  }
}
