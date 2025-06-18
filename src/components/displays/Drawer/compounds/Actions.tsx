import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type DrawerActionsProps = DataTestId & {
  children: ReactNode;
};

const Actions = ({
  children,
  'data-testid': testId = 'drawer-action',
}: DrawerActionsProps) => {
  return (
    <Stack data-testid={testId} gap={7} justifyContent="center">
      {children}
    </Stack>
  );
};

export default Actions;
