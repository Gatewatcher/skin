import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type NavigationItemLinksProps = DataTestId & {
  children: ReactNode;
};

const Links = ({
  children,
  'data-testid': testId = 'navigation-item-links',
}: NavigationItemLinksProps) => {
  return (
    <Stack data-testid={testId} direction="column" gap={4}>
      {children}
    </Stack>
  );
};

export default Links;
