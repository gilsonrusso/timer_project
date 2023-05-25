import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducers } from "../reducers/cycles/reducer";

interface ICreateCycleData {
  task: string | undefined;
  minuteAmount: number
}

export interface ICyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: ICreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
  children: ReactNode;
}


export const CyclesContext = createContext({} as ICyclesContextType);

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducers,
    {
      cycles: [],
      activeCycleId: null
    }, (initialState) => {
      const storageStateAsJson = localStorage.getItem('@timer-project:cycles-state-1.0.0');
      if (storageStateAsJson) {
        return JSON.parse(storageStateAsJson)
      }
      return initialState;
    });
  const { cycles, activeCycleId } = cyclesState;
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState);
    localStorage.setItem('@timer-project:cycles-state-1.0.0', stateJson)
  }, [cyclesState])

  function setSecondsPassed(seconds: number): void {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle(data: ICreateCycleData): void {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minuteAmount: data.minuteAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }

  function markCurrentCycleAsFinished(): void {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function interruptCurrentCycle(): void {
    dispatch(interruptCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        markCurrentCycleAsFinished,
        interruptCurrentCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
