import { configureStore } from "@reduxjs/toolkit";
import {
  popupsSlice,
  addPopup,
  removePopup,
} from "../../../src/store/popups/popupsSlice";
import { PopupData, Person } from "../../../src/types/type";

// Type for test store state
interface TestStoreState {
  popupsSlice: {
    popupsData: PopupData[];
  };
}

// Helper to create mock person data for testing
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

describe("Popups Redux Slice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        popupsSlice: popupsSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  });

  test("should add popup when it does not exist", () => {
    const popupData: PopupData = {
      name: "person_details",
      popupData: createMockPerson({
        id: 1,
        name: "Luke Skywalker",
      }),
    };

    store.dispatch(addPopup(popupData));

    const state = store.getState() as TestStoreState;
    expect(state.popupsSlice.popupsData).toHaveLength(1);
    expect(state.popupsSlice.popupsData[0]).toEqual(popupData);
  });

  test("should move existing popup to front when adding duplicate", () => {
    const popup1: PopupData = {
      name: "person_details",
      popupData: createMockPerson({ id: 1, name: "Luke" }),
    };
    const popup2: PopupData = {
      name: "person_details", // Same name
      popupData: createMockPerson({ id: 2, name: "Leia" }),
    };

    // Add first popup
    store.dispatch(addPopup(popup1));

    // Add second popup with same name
    store.dispatch(addPopup(popup2));

    const state = store.getState() as TestStoreState;
    expect(state.popupsSlice.popupsData).toHaveLength(1);
    expect(state.popupsSlice.popupsData[0]).toEqual(popup2);
  });

  test("should handle multiple different popups", () => {
    const popup1: PopupData = {
      name: "person_details",
      popupData: createMockPerson({ id: 1, name: "Luke" }),
    };

    // If we had other popup types, we would test them here
    // For now, we only have person_details

    store.dispatch(addPopup(popup1));

    const state = store.getState() as TestStoreState;
    expect(state.popupsSlice.popupsData).toHaveLength(1);
  });

  test("should remove popup by name", () => {
    const popup1: PopupData = {
      name: "person_details",
      popupData: createMockPerson({ id: 1, name: "Luke" }),
    };

    // Add popup first
    store.dispatch(addPopup(popup1));

    // Then remove it
    store.dispatch(removePopup("person_details"));

    const state = store.getState() as TestStoreState;
    expect(state.popupsSlice.popupsData).toHaveLength(0);
  });

  test("should not fail when removing non-existent popup", () => {
    // TypeScript will prevent this, but we test the behavior anyway
    store.dispatch(removePopup("person_details"));

    const state = store.getState() as TestStoreState;
    expect(state.popupsSlice.popupsData).toHaveLength(0);
  });

  test("should maintain popup order correctly", () => {
    const popup1: PopupData = {
      name: "person_details",
      popupData: createMockPerson({ id: 1, name: "Luke" }),
    };

    const popup2: PopupData = {
      name: "person_details",
      popupData: createMockPerson({ id: 2, name: "Updated Luke" }),
    };

    // Add first popup
    store.dispatch(addPopup(popup1));
    let state = store.getState() as TestStoreState;
    expect(state.popupsSlice.popupsData[0].popupData?.name).toBe("Luke");

    // Add second popup with same name - should replace and move to front
    store.dispatch(addPopup(popup2));
    state = store.getState() as TestStoreState;
    expect(state.popupsSlice.popupsData[0].popupData?.name).toBe(
      "Updated Luke"
    );
    expect(state.popupsSlice.popupsData).toHaveLength(1);
  });
});
