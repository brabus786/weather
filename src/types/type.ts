export type CustomNodeType = "heroNode" | "filmNode" | "starshipNode";

export interface Starship {
  MGLT: string;
  cargoCapacity: string;
  consumables: string;
  costInCredits: string;
  created: string;
  crew: string;
  edited: string;
  films: number[];
  hyperdriveRating: string;
  id: number;
  length: string;
  manufacturer: string;
  maxAtmospheringSpeed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: number[];
  starshipClass: string;
  url: string;
}
export interface Film {
  characters: number[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  id: number;
  openingCrawl: string;
  planets: number[];
  producer: string;
  releaseDate: string;
  species: number[];
  starships: number[];
  title: string;
  url: string;
  vehicles: number[];
}

export interface GraphNode {
  id: string;
  position: { x: number; y: number };
  data: Person | { film: Film; isStarship: boolean } | Starship;
  type: CustomNodeType;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export type PopupType = "person_details";

export interface PopupData {
  name: PopupType;
  popupData?: Person;
  queue?: number;
}

export interface StarWarsPersonsData<T> extends StarWarsPagination {
  results: T;
}

export interface StarWarsPagination {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface Person {
  id: number;
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  homeworld: number;
  films: number[];
  species: number[];
  vehicles: number[];
  starships: number[];
  created: Date;
  edited: Date;
  url: string;
}

export interface Task {
  title: string;
  description: string;
  finishedAt: string;
  url: string;
}

export interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
}
