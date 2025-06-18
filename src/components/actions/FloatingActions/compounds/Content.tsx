import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type FloatingActionsContentProps = DataTestId & {
  children: ReactNode;
};

const Content = ({
  children,
  'data-testid': testId = 'floating-actions-content',
}: FloatingActionsContentProps) => {
  return (
    <Stack data-testid={testId} direction="column" gap={4}>
      {children}
    </Stack>
  );
};

export default Content;
