import { createSlice } from "@reduxjs/toolkit";
import { WeatherProcesses } from "../weather/weatherSlice";


export type ProcessType = WeatherProcesses;

interface RunningProcesses {
  processes: ProcessType[];
}

const initialState: RunningProcesses = {
  processes: [],
};

export const runningProcessesSlice = createSlice({
  name: "runningProcesses",
  initialState,
  reducers: {
    addProcess(state, action: { payload: ProcessType }) {
      if (!state.processes.includes(action.payload)) {
        state.processes.push(action.payload);
      }
    },
    removeProcess(state, action: { payload: ProcessType }) {
      state.processes = state.processes.filter(
        (process) => process !== action.payload,
      );
    },
    clearProcesses(state) {
      state.processes = [];
    },
  },
});

export const { addProcess, removeProcess, clearProcesses } =
  runningProcessesSlice.actions;
