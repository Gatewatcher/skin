import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type DatepickerActionsProps = DataTestId & {
  children: ReactNode;
};

const Actions = ({
  children,
  'data-testid': testId = 'datepicker-actions',
}: DatepickerActionsProps) => {
  return (
    <Stack data-testid={testId} gap={4}>
      {children}
    </Stack>
  );
};

export default Actions;
