import { Weather } from "@/types/type";
import axios from "axios"

export const getWeatherByCoords = async (lat: number, lon: number): Promise<Weather> => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ac6325d92a6b6a397cf44f2882e9118a&units=metric`);
    return data;
};
