import { Children, type ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import { VerticalDivider } from '../components/VerticalDivider';

export type QuickActionsProps = {
  children?: ReactNode;
};

export const QuickActions = ({ children }: QuickActionsProps) => {
  return (
    !!Children.count(children) && (
      <Stack alignItems="center" gap={6} margin={{ left: 6 }}>
        <VerticalDivider />
        <Stack alignItems="center" gap={4}>
          {children}
        </Stack>
      </Stack>
    )
  );
};
