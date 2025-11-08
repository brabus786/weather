import { getPersons } from "@/api";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import {
  addProcess,
  removeProcess,
} from "../runningProcesses/runningProcessesSlice";
import { setPersons } from "./starWarsSlice";

export const getPersonsOperation =
  (page: number, callback?: () => void) => async (dispatch: Dispatch) => {
    try {
      dispatch(addProcess("get_persons"));
      const personsData = await getPersons(page);
      if (personsData) {
        dispatch(setPersons(personsData));
        callback?.();
      }
      dispatch(removeProcess("get_persons"));
    } catch {
      toast.error(`Failed to fetch persons data. Please try again.`);
      dispatch(removeProcess("get_persons"));
    }
  };
