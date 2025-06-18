import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type CommentsHeaderProps = DataTestId & {
  children: ReactNode;
};

const Header = ({
  children,
  'data-testid': testId = 'comments-header',
}: CommentsHeaderProps) => {
  return (
    <Stack
      alignItems="center"
      data-testid={testId}
      gap={7}
      justifyContent="space-between"
    >
      {children}
    </Stack>
  );
};

export default Header;
