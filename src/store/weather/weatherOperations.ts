import { getWeatherByCoords } from "@/api";
import { Dispatch } from "redux";
import { setCurrentWeather } from "./weatherSlice";

export const getWeatherByCoordsOperation = (lat: number, lon: number) => async (dispatch: Dispatch) => {
  try {
    const weather = await getWeatherByCoords(lat, lon);

    if (weather) {
      dispatch(setCurrentWeather(weather));
    }
    console.log(weather);

  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
}
