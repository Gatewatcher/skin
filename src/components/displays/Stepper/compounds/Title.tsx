import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { Stack } from '@/skin/layout';

import { useStepperContext } from '../context';

import styles from '../styles.module.scss';

export type StepperTitleProps = DataTestId & {
  children: ReactNode;
};

export type StepperTitleInternalProps = {
  index: number;
  onClick: (index: number) => void;
};

const StepperTitle = ({
  children,
  'data-testid': testId = 'stepper-title',
  ...internalArgs
}: StepperTitleProps) => {
  const { currentStep } = useStepperContext();

  const { index, onClick } = internalArgs as StepperTitleInternalProps;

  const handleSetcurrentStep = () => {
    onClick(index);
  };

  const isCurrentStep = useMemo(
    () => index === currentStep,
    [currentStep, index],
  );

  const isDone = useMemo(() => index < currentStep, [currentStep, index]);

  return (
    <Stack
      as="li"
      className={styles.TitleListItem}
      data-testid={isCurrentStep ? suffixTestId(testId, 'active') : testId}
    >
      <Stack
        className={classNames(
          styles.Title,
          isCurrentStep && styles.TitleActive,
          isDone && styles.TitleDone,
        )}
        alignItems="center"
        direction="column"
      >
        <span className={styles.TitlePoint} onClick={handleSetcurrentStep} />
        <span className={styles.TitleText} onClick={handleSetcurrentStep}>
          {children}
        </span>
      </Stack>
    </Stack>
  );
};

export default StepperTitle;
