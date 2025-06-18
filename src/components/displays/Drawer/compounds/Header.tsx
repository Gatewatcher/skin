import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type DrawerHeaderProps = DataTestId & {
  children: ReactNode;
};

const Header = ({
  children,
  'data-testid': testId = 'drawer-header',
}: DrawerHeaderProps) => {
  return (
    <Stack
      alignItems="baseline"
      data-testid={testId}
      gap={4}
      justifyContent="space-between"
      margin={{ y: 9 }}
    >
      {children}
    </Stack>
  );
};

export default Header;
