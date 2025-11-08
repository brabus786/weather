import { Film, Starship, StarWarsPersonsData, Weather } from "@/types/type";
import axios from "axios";
import { toast } from "react-toastify";

// test task for Star Wars API

export const getFilmById = async (id: number): Promise<Film | null> => {
  try {
    const { data } = await axios.get(`https://sw-api.starnavi.io/films/${id}/`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`Failed to fetch film with id ${id}`);
    }
    return null;
  }
};

export const getStarshipById = async (id: number): Promise<Starship | null> => {
  try {
    const { data } = await axios.get(
      `https://sw-api.starnavi.io/starships/${id}/`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`Failed to fetch starship with id ${id}`);
    }
    return null;
  }
};

export const getPersons = async (
  page: number
): Promise<StarWarsPersonsData | null> => {
  try {
    const { data } = await axios.get(
      `https://sw-api.starnavi.io/people/?page=${page}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`Failed to fetch persons on page ${page}`);
    }
    return null;
  }
};

// test task for Weather API with caching

const weatherCache = new Map<string, { data: Weather; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000;

export const getWeatherByCity = async (city: string): Promise<Weather> => {
  const cacheKey = city.toLowerCase().trim();
  const now = Date.now();
  const cached = weatherCache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    console.log(`🗄️ Returning cached weather for ${city}`);
    return cached.data;
  }
  console.log(`🌐 Fetching weather for ${city}`);
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHERAPI}&units=metric`
  );

  weatherCache.set(cacheKey, { data, timestamp: now });

  return data;
};
