import { Person, StarWarsPagination, StarWarsPersonsData } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StarWarsProcesses = "get_persons";

export interface StarWarsState {
  persons: Person[];
  pagination: StarWarsPagination | null;
}

const starWarsState: StarWarsState = {
  persons: [],
  pagination: null,
};

export const starWarsSlice = createSlice({
  name: "starWarsSlice",
  initialState: starWarsState,
  reducers: {
    setPersons(state, action: PayloadAction<StarWarsPersonsData>) {
      const { results, count, next, previous } = action.payload;
      return {
        ...state,
        persons: results,
        pagination: {
          count,
          next,
          previous,
        },
      };
    },
  },
});

export const { setPersons } = starWarsSlice.actions;
