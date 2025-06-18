import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { ReactNode } from 'react';

import type { Spacings } from '@/hocs';
import { withSpacing } from '@/hocs';
import { Stack } from '@/skin/layout';

import { useStepper } from '../hook';

import styles from '../styles.module.scss';

export type StepperNavigationRenderProps = {
  prev: ReactNode;
  next: ReactNode;
  submit: ReactNode;
};

export type StepperNavigationRenderFn = (
  props: StepperNavigationRenderProps,
) => ReactNode;

export type StepperNavigationProps = Spacings & {
  children?: StepperNavigationRenderFn;
  next: ReactNode;
  prev: ReactNode;
  submit?: ReactNode;
};

const StepperNavigation = ({
  children,
  next,
  prev,
  submit,
  margin = { top: 6 },
  padding,
}: StepperNavigationProps) => {
  const { isFirstStep, isLastStep } = useStepper();

  const prevElement = !isFirstStep && prev;
  const nextElement = !isLastStep && next;
  const submitElement = isLastStep && submit;

  if (children) {
    return children({
      prev: prevElement,
      next: nextElement,
      submit: submitElement,
    });
  }

  return withSpacing(
    <Stack
      className={classNames(
        styles.Navigation,
        isFirstStep && styles.NavigationFirstStep,
      )}
      data-testid="stepper-navigation"
      justifyContent="space-between"
    >
      {prevElement}
      {nextElement}
      {submitElement}
    </Stack>,
    { margin, padding },
  );
};

export default StepperNavigation;
