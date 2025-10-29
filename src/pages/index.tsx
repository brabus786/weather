import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getWeatherByCoordsOperation } from "@/store/weather/weatherOperations";
import WeatherTemplate from "@/Templates/WeatherTemplate";
import { Weather } from "@/types/type";
import { createContext, useCallback, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";


export interface CityForm {
  city: string;
}

interface WeatherContextProps {
  currentWeather: Weather | null;
  getWeatherHandler: (formData: CityForm) => void;
}

export const WeatherContext = createContext<WeatherContextProps | null>(null);


const WeatherPage = () => {

  const { currentWeather } = useAppSelector(state => state.weatherSlice);

  const dispatch = useAppDispatch();

  const defaultCity = 'Kyiv';

  const cityFormMethods = useForm<CityForm>({
    defaultValues: { city: defaultCity }
  })

  const getWeatherHandler = useCallback((formData: CityForm) => {
    dispatch(getWeatherByCoordsOperation(formData.city));
  }, [dispatch]);


  useEffect(() => {
    getWeatherHandler({ city: defaultCity });
  }, [getWeatherHandler])

  const value = useMemo(() => ({ currentWeather, getWeatherHandler }), [currentWeather, getWeatherHandler]);

  return (
    <WeatherContext.Provider value={value}>
      <FormProvider {...cityFormMethods}>
        <WeatherTemplate />
      </FormProvider>
    </WeatherContext.Provider>
  );
}

export default WeatherPage;
