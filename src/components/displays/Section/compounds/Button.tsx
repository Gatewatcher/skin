import type { ButtonProps } from '@/skin/actions';
import { Button as SKinButton } from '@/skin/actions';

export type SectionButtonProps = Omit<ButtonProps, 'size' | 'variant'>;

const Button = ({
  'data-testid': testId = 'section-button',
  ...rest
}: SectionButtonProps) => {
  return (
    <SKinButton data-testid={testId} size="small" variant="ghosted" {...rest} />
  );
};

export default Button;
