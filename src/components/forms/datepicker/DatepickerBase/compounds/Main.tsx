import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type DatepickerMainProps = DataTestId & {
  children: ReactNode;
};

const Main = ({
  'data-testid': testId = 'datepicker-main',
  children,
}: DatepickerMainProps) => {
  return (
    <Stack data-testid={testId} direction="column" gap={9}>
      {children}
    </Stack>
  );
};

export default Main;
