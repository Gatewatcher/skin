import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import { useFloatingActionsContext } from '../context';

export type FloatingActionsActionsProps = DataTestId & {
  children: ReactNode;
};

const Actions = ({
  children,
  'data-testid': testId = 'floating-actions-actions',
}: FloatingActionsActionsProps) => {
  const { onlyOneAction } = useFloatingActionsContext();
  onlyOneAction.current = !Array.isArray(children);

  return (
    <Stack alignItems="center" data-testid={testId} gap={4}>
      {children}
    </Stack>
  );
};

export default Actions;
