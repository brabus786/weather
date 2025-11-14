import { Weather } from "@/types/type";
import axios from "axios";

// test task for Weather API with caching

const weatherCache = new Map<string, { data: Weather; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEATHERAPI_BASE_URL,
});

export const getWeatherByCity = async (city: string): Promise<Weather> => {
  const cacheKey = city.toLowerCase().trim();
  const now = Date.now();
  const cached = weatherCache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    console.log(`🗄️ Returning cached weather for ${city}`);
    return cached.data;
  }
  console.log(`🌐 Fetching weather for ${city}`);
  const { data } = await api.get(
    `/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHERAPI}&units=metric`
  );

  weatherCache.set(cacheKey, { data, timestamp: now });

  return data;
};
