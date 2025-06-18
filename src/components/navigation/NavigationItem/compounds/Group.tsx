import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type NavigationItemGroupProps = DataTestId & {
  children: ReactNode;
};

const Group = ({
  children,
  'data-testid': testId = 'navigation-item-group',
}: NavigationItemGroupProps) => {
  return (
    <Stack data-testid={testId} direction="column" padding={8}>
      {children}
    </Stack>
  );
};

export default Group;
