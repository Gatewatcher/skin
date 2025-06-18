import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type CardFooterProps = DataTestId & {
  children: ReactNode;
};

export const Footer = ({
  children,
  'data-testid': testId = 'card-footer',
}: CardFooterProps) => {
  return (
    <Stack
      data-testid={testId}
      flexGrow={1}
      gap={9}
      justifyContent="space-between"
      padding={{ top: 9, bottom: 0 }}
    >
      {children}
    </Stack>
  );
};
