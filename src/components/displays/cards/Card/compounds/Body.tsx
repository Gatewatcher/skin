import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type CardBodyProps = DataTestId & {
  children: ReactNode;
};

const Body = ({
  children,
  'data-testid': testId = 'card-body',
}: CardBodyProps) => {
  return (
    <Stack
      data-testid={testId}
      direction="column"
      flexGrow={1}
      padding={{ y: 7, x: 8 }}
    >
      {children}
    </Stack>
  );
};

export default Body;
