import type { ButtonIconProps } from '@/skin/actions';
import { ButtonIcon as SkinButtonIcon } from '@/skin/actions';

export type CardButtonIconProps = Omit<ButtonIconProps, 'size' | 'variant'>;

const ButtonIcon = ({
  'data-testid': testId = 'card-button-icon',
  ...rest
}: CardButtonIconProps) => {
  return <SkinButtonIcon data-testid={testId} variant="ghosted" {...rest} />;
};

export default ButtonIcon;
