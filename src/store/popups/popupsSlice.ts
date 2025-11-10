import { PopupData } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";

interface PopupsState {
  popupsData: PopupData[];
}

const initialState: PopupsState = {
  popupsData: [],
};

export const popupsSlice = createSlice({
  name: "popupsSlice",
  initialState,
  reducers: {
    addPopup(state, action: { payload: PopupData }) {
      const exists = state.popupsData.find(
        (popup) => popup.name === action.payload.name
      );
      if (!exists) {
        return {
          ...state,
          popupsData: [...state.popupsData, action.payload],
        };
      }
      const filteredPopups = state.popupsData.filter(
        (popup) => popup.name !== action.payload.name
      );
      return {
        ...state,
        popupsData: [action.payload, ...filteredPopups],
      };
    },
    removePopup(state, action: { payload: string }) {
      return {
        ...state,
        popupsData: state.popupsData.filter(
          (popup) => popup.name !== action.payload
        ),
      };
    },
  },
});

export const { addPopup, removePopup } = popupsSlice.actions;
