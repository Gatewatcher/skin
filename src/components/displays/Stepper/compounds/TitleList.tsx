import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement } from 'react';
import { cloneElement, useCallback } from 'react';

import { Grid } from '@/skin/layout';

import { useStepperContext } from '../context';
import type { StepperTitleInternalProps, StepperTitleProps } from './Title';

import styles from '../styles.module.scss';

export type StepperTitleListProps = DataTestId & {
  children: ReactElement<StepperTitleProps & StepperTitleInternalProps>[];
};

const StepperTitleList = ({
  children,
  'data-testid': testId = 'stepper-title-list',
}: StepperTitleListProps) => {
  const { currentStep, setCurrentStep } = useStepperContext();

  const handleSetCurrentStep = useCallback(
    (index: number) => {
      if (index < currentStep) {
        setCurrentStep(index);
      }
    },
    [setCurrentStep, currentStep],
  );

  return (
    <Grid
      as="ul"
      className={styles.TitleList}
      columns={children.length}
      data-testid={testId}
      gap={0}
      isContainer
    >
      {children.map((item, index) =>
        cloneElement(item, {
          key: index,
          onClick: handleSetCurrentStep,
          index,
        }),
      )}
    </Grid>
  );
};

export default StepperTitleList;
