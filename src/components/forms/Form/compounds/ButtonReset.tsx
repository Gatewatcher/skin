import type { ButtonProps } from '@/skin/actions';
import { Button } from '@/skin/actions';

export type FormButtonResetProps = Omit<ButtonProps, 'behavior'>;

const FormButtonReset = ({
  children,
  'data-testid': testId = 'button-reset',
  ...rest
}: FormButtonResetProps) => {
  return (
    <Button behavior="reset" data-testid={testId} variant="outlined" {...rest}>
      {children}
    </Button>
  );
};

export default FormButtonReset;
