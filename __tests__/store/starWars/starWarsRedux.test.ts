import { configureStore } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getPersonsOperation } from "../../../src/store/starWars/starWarsOperations";
import { starWarsSlice } from "../../../src/store/starWars/starWarsSlice";
import { runningProcessesSlice } from "../../../src/store/runningProcesses/runningProcessesSlice";
import * as starWarsApi from "../../../src/api/starWars";
import { Person } from "../../../src/types/type";

// Type for test store state
interface TestStoreState {
  starWarsSlice: {
    persons: Person[];
    pagination: {
      count: number;
      next: string | null;
      previous: string | null;
    } | null;
  };
  runningProcesses: {
    processes: string[];
  };
}

// Helper to create mock person data
const createMockPerson = (overrides: Partial<Person>): Person => ({
  id: 1,
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hairColor: "blond",
  skinColor: "fair",
  eyeColor: "blue",
  birthYear: "19BBY",
  gender: "male",
  homeworld: 1,
  films: [1, 2, 3],
  species: [],
  vehicles: [14, 30],
  starships: [12, 22],
  created: new Date("2014-12-09T13:50:51.644000Z"),
  edited: new Date("2014-12-20T21:17:56.891000Z"),
  url: "https://sw-api.starnavi.io/api/people/1/",
  ...overrides,
});

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("../../../src/api/starWars", () => ({
  getPersons: jest.fn(),
}));

const mockedApi = starWarsApi as jest.Mocked<typeof starWarsApi>;

describe("Star Wars Redux", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = configureStore({
      reducer: {
        starWarsSlice: starWarsSlice.reducer,
        runningProcesses: runningProcessesSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  });

  describe("starWarsSlice", () => {
    test("should set persons data correctly", () => {
      const personsData = {
        results: [
          createMockPerson({ id: 1, name: "Luke Skywalker" }),
          createMockPerson({ id: 2, name: "C-3PO" }),
        ],
        count: 82,
        next: "https://sw-api.starnavi.io/api/people/?page=2",
        previous: null,
      };

      store.dispatch(starWarsSlice.actions.setPersons(personsData));

      const state = store.getState() as TestStoreState;
      expect(state.starWarsSlice.persons).toEqual(personsData.results);
      expect(state.starWarsSlice.pagination).toEqual({
        count: 82,
        next: "https://sw-api.starnavi.io/api/people/?page=2",
        previous: null,
      });
    });

    test("should handle empty results", () => {
      const emptyData = {
        results: [],
        count: 0,
        next: null,
        previous: null,
      };

      store.dispatch(starWarsSlice.actions.setPersons(emptyData));

      const state = store.getState() as TestStoreState;
      expect(state.starWarsSlice.persons).toEqual([]);
      expect(state.starWarsSlice.pagination?.count).toBe(0);
    });
  });

  describe("getPersonsOperation", () => {
    test("should dispatch correct actions on successful API call", async () => {
      const mockPersonsData = {
        results: [createMockPerson({ id: 1, name: "Luke Skywalker" })],
        count: 82,
        next: null,
        previous: null,
      };

      mockedApi.getPersons.mockResolvedValue(mockPersonsData);
      const mockCallback = jest.fn();

      // Cast to unknown first, then to function to avoid TypeScript issues
      await (store.dispatch as (action: unknown) => Promise<unknown>)(
        getPersonsOperation(1, mockCallback)
      );

      const state = store.getState() as TestStoreState;
      expect(state.starWarsSlice.persons).toEqual(mockPersonsData.results);
      expect(mockCallback).toHaveBeenCalled();
      expect(state.runningProcesses.processes).not.toContain("get_persons");
    });

    test("should handle API failure gracefully", async () => {
      mockedApi.getPersons.mockRejectedValue(new Error("API Error"));

      await (store.dispatch as (action: unknown) => Promise<unknown>)(
        getPersonsOperation(1)
      );

      expect(toast.error).toHaveBeenCalledWith(
        "Failed to fetch persons data. Please try again."
      );
      const state = store.getState() as TestStoreState;
      expect(state.runningProcesses.processes).not.toContain("get_persons");
    });

    test("should handle null API response", async () => {
      mockedApi.getPersons.mockResolvedValue(null);

      await (store.dispatch as (action: unknown) => Promise<unknown>)(
        getPersonsOperation(1)
      );

      const state = store.getState() as TestStoreState;
      expect(state.starWarsSlice.persons).toEqual([]);
      expect(state.runningProcesses.processes).not.toContain("get_persons");
    });
  });

  describe("Environment Variables", () => {
    test("should have Star Wars API base URL configured", () => {
      expect(process.env.NEXT_PUBLIC_SW_API_BASE_URL).toBe(
        "https://sw-api.starnavi.io/api"
      );
    });

    test("should have weather API configuration", () => {
      expect(process.env.NEXT_PUBLIC_WEATHERAPI_BASE_URL).toBe(
        "https://api.openweathermap.org/data/2.5"
      );
      expect(process.env.NEXT_PUBLIC_WEATHERAPI).toBe("test-weather-api-key");
    });

    test("should have Google Maps API key configured", () => {
      expect(process.env.NEXT_PUBLIC_MAP).toBe("test-google-maps-api-key");
    });
  });
});
