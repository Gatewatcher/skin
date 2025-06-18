import type { ButtonProps } from '@/skin/actions';
import { Button as SkinButton } from '@/skin/actions';

export type CardButtonProps = Omit<ButtonProps, 'size' | 'variant'>;

const Button = ({
  'data-testid': testId = 'card-button',
  ...rest
}: CardButtonProps) => {
  return (
    <SkinButton data-testid={testId} size="small" variant="ghosted" {...rest} />
  );
};

export default Button;
