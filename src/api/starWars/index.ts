import { Film, Person, Starship, StarWarsPersonsData } from "@/types/type";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { toast } from "react-toastify";

// API for Star Wars data fetching

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_SW_API_BASE_URL || "https://sw-api.starnavi.io/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getFilmByIds = async (
  ids: string
): Promise<StarWarsPersonsData<Film[]> | null> => {
  try {
    const { data } = await api.get(`/films/?id__in=${ids}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`Failed to fetch films with ids: ${ids}`);
    }
    return null;
  }
};

export const getStarshipByIds = async (
  ids: string
): Promise<StarWarsPersonsData<Starship[]> | null> => {
  try {
    const { data } = await api.get(`/starships/?id__in=${ids}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`Failed to fetch starship with ids ${ids}`);
    }
    return null;
  }
};

export const getPersons = async (
  page: number
): Promise<StarWarsPersonsData<Person[]> | null> => {
  try {
    const { data } = await api.get(`/people/?page=${page}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`Failed to fetch persons on page ${page}`);
    }
    return null;
  }
};
