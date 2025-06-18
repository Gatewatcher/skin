import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type PlaceholderActionsProps = DataTestId & {
  children: ReactNode;
};

export const Actions = ({
  children,
  'data-testid': testId = 'placeholder-actions',
}: PlaceholderActionsProps) => {
  return (
    <Stack data-testid={testId} gap={6} margin={{ top: 9 }}>
      {children}
    </Stack>
  );
};
