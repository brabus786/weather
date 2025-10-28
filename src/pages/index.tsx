import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getWeatherByCoordsOperation } from "@/store/weather/weatherOperations";
import WeatherTemplate from "@/Templates/WeatherTemplate";
import { Weather } from "@/types/type";
import { createContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";


export interface CityForm {
  coord: {
    lat: number;
    lon: number;
  };
}

interface WeatherContextProps {
  currentWeather: Weather | null;
  getWeatherHandler: (formData: CityForm) => void;
}

export const WeatherContext = createContext<WeatherContextProps | null>(null);


const WeatherPage = () => {

  const { currentWeather } = useAppSelector(state => state.weatherSlice);

  const dispatch = useAppDispatch();

  const cityFormMethods = useForm<CityForm>()

  const getWeatherHandler = (formData: CityForm) => {
    dispatch(getWeatherByCoordsOperation(formData.coord.lat, formData.coord.lon));
  }

  const form = cityFormMethods.watch();
  console.log(form);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude)
        dispatch(getWeatherByCoordsOperation(position.coords.latitude, position.coords.longitude));
      },
      (error) => {
        console.error(error)
      }
    )
  }, [dispatch])

  const value = useMemo(() => ({ currentWeather, getWeatherHandler }), [currentWeather]);

  return (
    <WeatherContext.Provider value={value}>
      <FormProvider {...cityFormMethods}>
        <WeatherTemplate />
      </FormProvider>
    </WeatherContext.Provider>
  );
}

export default WeatherPage;
