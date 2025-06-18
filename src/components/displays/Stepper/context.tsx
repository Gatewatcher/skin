import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

export type StepperContextType = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  stepsCount: { current: number };
};

export const StepperContext = createContext<StepperContextType>({
  currentStep: 0,
  setCurrentStep: () => {},
  stepsCount: { current: 0 },
});

export const useStepperContext = () => useContext(StepperContext);
