import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type CommentsActionsProps = DataTestId & {
  children: ReactNode;
};

const Actions = ({
  children,
  'data-testid': testId = 'comments-actions',
}: CommentsActionsProps) => {
  return (
    <Stack data-testid={testId} gap={2}>
      {children}
    </Stack>
  );
};

export default Actions;
