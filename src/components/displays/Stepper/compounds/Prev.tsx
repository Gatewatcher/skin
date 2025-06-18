import type { ButtonProps } from '@/skin/actions';
import { Button } from '@/skin/actions';

import { useStepper } from '../hook';

export type StepperPrevProps = Omit<ButtonProps, 'onClick'>;

const StepperPrev = ({
  children,
  variant = 'outlined',
  startIcon = 'ChevronLeft',
  ...rest
}: StepperPrevProps) => {
  const { goPrev } = useStepper();

  return (
    <Button
      data-testid="stepper-prev"
      onClick={goPrev}
      startIcon={startIcon}
      variant={variant}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default StepperPrev;
