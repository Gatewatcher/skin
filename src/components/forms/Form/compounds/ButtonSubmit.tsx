import type { ButtonAsyncProps } from '@/skin/actions';
import { ButtonAsync } from '@/skin/actions';

export type FormButtonSubmitProps = Omit<ButtonAsyncProps, 'behavior'>;

const FormButtonSubmit = ({
  children,
  'data-testid': testId = 'button-submit',
  ...rest
}: FormButtonSubmitProps) => {
  return (
    <ButtonAsync behavior="submit" data-testid={testId} {...rest}>
      {children}
    </ButtonAsync>
  );
};

export default FormButtonSubmit;
