import type { RequiredAtLeastOne } from '@gatewatcher/bistoury/utils-types';

import type { ButtonIconProps, ButtonProps } from '@/skin/actions';
import { Button, ButtonIcon } from '@/skin/actions';

export type SectionActionButton = (ButtonProps | ButtonIconProps) &
  RequiredAtLeastOne<ButtonProps & ButtonIconProps, 'children' | 'icon'>;

const ActionButton = ({
  icon,
  children,
  'data-testid': testId = 'section-action-button',
  ...rest
}: SectionActionButton) => {
  if (icon) {
    return (
      <ButtonIcon
        data-testid={testId}
        icon={icon}
        size="small"
        variant="ghosted"
        {...rest}
      />
    );
  }

  return (
    <Button data-testid={testId} {...rest} size="small" variant="ghosted">
      {children}
    </Button>
  );
};

export default ActionButton;
