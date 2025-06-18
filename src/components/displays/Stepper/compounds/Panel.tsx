import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { useStepperContext } from '../context';

import styles from '../styles.module.scss';

export type StepperPanelProps = DataTestId & {
  children: ReactNode;
};

export type StepperPanelInternalProps = {
  index: number;
};

const StepperPanel = ({
  children,
  'data-testid': testId = 'stepper-panel',
  ...internalArgs
}: StepperPanelProps) => {
  const { index } = internalArgs as StepperPanelInternalProps;
  const { currentStep } = useStepperContext();
  const isCurrentStep = index === currentStep;

  return (
    <li
      className={classNames(
        styles.StepperPanel,
        isCurrentStep && styles.Active,
      )}
      data-testid={isCurrentStep ? suffixTestId(testId, 'active') : testId}
    >
      {children}
    </li>
  );
};

export default StepperPanel;
