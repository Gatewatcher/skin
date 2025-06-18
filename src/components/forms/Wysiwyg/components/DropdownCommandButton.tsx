import type { ReactNode } from 'react';

import { Button } from '@/skin/actions';
import type { IconName } from '@/skin/displays';

export type DropdownCommandButtonProps = {
  children: ReactNode;
  icon?: IconName;
};

export const DropdownCommandButton = ({
  children,
  icon,
}: DropdownCommandButtonProps) => {
  return (
    <Button endIcon="ChevronDown" startIcon={icon} variant="ghosted">
      {children}
    </Button>
  );
};
