export type CustomNodeType = "heroNode" | "filmNode" | "starshipNode";

export interface Starship {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  films: number[];
  hyperdrive_rating: string;
  id: number;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: number[];
  starship_class: string;
  url: string;
}
export interface Film {
  characters: number[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  id: number;
  opening_crawl: string;
  planets: number[];
  producer: string;
  release_date: string;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  popupData?: any;
  queue?: number;
}

export interface StarWarsPersonsData extends StarWarsPagination {
  results: Person[];
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
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
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
