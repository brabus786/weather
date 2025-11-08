import { useAppSelector } from "@/store/hooks";
import { ProcessType } from "@/store/runningProcesses/runningProcessesSlice";
import { useMemo } from "react";

export const useProcessWatcher = (processName: ProcessType) => {
  const { processes } = useAppSelector((state) => state.runningProcesses);
  const isProcess = useMemo(
    () => processes.includes(processName),
    [processes, processName]
  );
  return isProcess;
};
