import type { ButtonProps } from '@/skin/actions';
import { Button } from '@/skin/actions';

import { useStepper } from '../hook';

export type StepperNextProps = Omit<ButtonProps, 'onClick'>;

const StepperNext = ({
  children,
  endIcon = 'ChevronRight',
  ...rest
}: StepperNextProps) => {
  const { goNext } = useStepper();

  return (
    <Button
      data-testid="stepper-next"
      endIcon={endIcon}
      onClick={goNext}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default StepperNext;
