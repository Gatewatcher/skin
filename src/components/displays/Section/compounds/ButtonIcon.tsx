import type { ButtonIconProps } from '@/skin/actions';
import { ButtonIcon as SKinButtonIcon } from '@/skin/actions';

export type SectionButtonProps = Omit<ButtonIconProps, 'size' | 'variant'>;

const ButtonIcon = ({
  'data-testid': testId = 'section-button-icon',
  ...rest
}: SectionButtonProps) => {
  return (
    <SKinButtonIcon
      data-testid={testId}
      size="small"
      variant="ghosted"
      {...rest}
    />
  );
};

export default ButtonIcon;
