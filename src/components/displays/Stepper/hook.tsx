import { useCallback } from 'react';

import { useStepperContext } from './context';

export const useStepper = () => {
  const { currentStep, setCurrentStep, stepsCount } = useStepperContext();

  const goNext = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, stepsCount.current - 1));
  }, [setCurrentStep, stepsCount]);

  const goPrev = useCallback(() => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  }, [setCurrentStep]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentStep(index);
    },
    [setCurrentStep],
  );

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === stepsCount.current - 1;

  return { goNext, goPrev, goTo, isFirstStep, isLastStep, currentStep };
};
