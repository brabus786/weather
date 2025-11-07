'use client';

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getWeatherByCoordsOperation } from "@/store/weather/weatherOperations";
import WeatherTemplate from "@/Templates/WeatherTemplate";
import { Weather } from "@/types/type";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface CityForm {
    city: string;
}

interface WeatherContextProps {
    currentWeather: Weather | null;
    getWeatherHandler: (formData: CityForm) => void;
    today: Date;
}

export const WeatherContext = createContext<WeatherContextProps | null>(null);


const WeatherPage = () => {

    const [today, setToday] = useState<Date>(new Date());

    const { currentWeather } = useAppSelector(state => state.weatherSlice);

    const dispatch = useAppDispatch();

    const defaultCity = 'Kyiv';

    const cityFormMethods = useForm<CityForm>({
        defaultValues: { city: defaultCity }
    })

    const getWeatherHandler = useCallback((formData: CityForm) => {
        dispatch(getWeatherByCoordsOperation(formData.city, () => {
            setToday(new Date());
        }));
    }, [dispatch]);

    useEffect(() => {
        getWeatherHandler({ city: defaultCity });
    }, [getWeatherHandler])

    const value = useMemo(() => ({
        currentWeather, getWeatherHandler, today
    }), [currentWeather, getWeatherHandler, today]);

    return (
        <WeatherContext.Provider value={value}>
            <FormProvider {...cityFormMethods}>
                <WeatherTemplate />
            </FormProvider>
        </WeatherContext.Provider>
    );
}

export default WeatherPage;
