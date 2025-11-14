import { createContext } from "react";

export interface StarWarsQueryParams {
  page?: string;
}

interface StarWarsContextProps {
  paginationHandler: (page: number) => void;
  query: StarWarsQueryParams;
}

// Context to share Star Wars data and handlers
export const StarWarsContext = createContext<StarWarsContextProps | null>(null);
