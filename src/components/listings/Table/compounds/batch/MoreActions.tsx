import type { ReactNode } from 'react';

import { Button } from '@/skin/actions';
import { Dropdown } from '@/skin/displays';

export type BatchMoreActionsProps = {
  actions: ReactNode;
  children?: ReactNode;
};

export const BatchMoreActions = ({
  actions,
  children = 'More',
}: BatchMoreActionsProps) => {
  return (
    <Dropdown content={actions} placement="top-start" triggerOn="click">
      <Button
        size="small"
        startIcon="OverflowMenuHorizontal"
        variant="transparent"
      >
        {children}
      </Button>
    </Dropdown>
  );
};
