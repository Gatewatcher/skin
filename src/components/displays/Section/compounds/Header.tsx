import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type SectionHeaderProps = DataTestId & {
  children: ReactNode;
};

const Header = ({
  children,
  'data-testid': testId = 'section-header',
}: SectionHeaderProps) => {
  return (
    <Stack
      alignItems="center"
      as="header"
      data-testid={testId}
      justifyContent="space-between"
      margin={{ bottom: 9 }}
    >
      {children}
    </Stack>
  );
};

export default Header;
