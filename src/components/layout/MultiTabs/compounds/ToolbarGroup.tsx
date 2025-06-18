import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';
import type { Gap } from '@/skin/layout/Grid/types';
import { DEFAULT_TOOLBAR_GROUP_GAP } from '@/skin/layout/MultiTabs/constants';

export type ToolbarGroupProps = {
  children?: ReactNode;
  gap?: Gap;
};

export const ToolbarGroup = ({
  children,
  gap = DEFAULT_TOOLBAR_GROUP_GAP,
}: ToolbarGroupProps) => {
  return (
    <Stack.Item flexShrink={0}>
      <Stack gap={gap}>{children}</Stack>
    </Stack.Item>
  );
};
