import { useDidMountEffect } from '@gatewatcher/bistoury/hooks';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { memo, useRef, useState } from 'react';

import StepperNavigation from './compounds/Navigation';
import StepperNext from './compounds/Next';
import StepperPanel from './compounds/Panel';
import StepperPanelList from './compounds/PanelList';
import StepperPrev from './compounds/Prev';
import StepperTitle from './compounds/Title';
import StepperTitleList from './compounds/TitleList';
import type { StepperContextType } from './context';
import { StepperContext } from './context';

import styles from './styles.module.scss';

export type StepperProps = DataTestId & {
  children: ReactNode;
  onStepChange?: (step: number) => void;
};

const Stepper = ({
  children,
  'data-testid': testId = 'stepper',
  onStepChange,
}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const contextValue: StepperContextType = {
    currentStep,
    setCurrentStep,
    stepsCount: useRef(0),
  };

  useDidMountEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep]);

  return (
    <StepperContext.Provider value={contextValue}>
      <div className={styles.Stepper} data-testid={testId}>
        {children}
      </div>
    </StepperContext.Provider>
  );
};

Stepper.Navigation = memo(StepperNavigation);
Stepper.Next = memo(StepperNext);
Stepper.Panel = memo(StepperPanel);
Stepper.PanelList = memo(StepperPanelList);
Stepper.Prev = memo(StepperPrev);
Stepper.Title = memo(StepperTitle);
Stepper.TitleList = memo(StepperTitleList);

export default Stepper;
