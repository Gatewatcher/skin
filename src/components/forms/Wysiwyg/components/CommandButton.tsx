import type { ButtonIconProps } from '@/skin/actions';
import { ButtonIcon } from '@/skin/actions';
import type { IconName } from '@/skin/displays';

export type CommandButtonProps = Partial<
  Pick<ButtonIconProps, 'onClick' | 'disabled'>
> & {
  isActive?: boolean;
  name: IconName;
};

export const CommandButton = ({
  disabled = false,
  isActive = false,
  name,
  onClick,
}: CommandButtonProps) => {
  return (
    <ButtonIcon
      disabled={disabled}
      icon={name}
      onClick={onClick}
      type={isActive ? 'primary' : 'neutral'}
      variant="ghosted"
    />
  );
};
