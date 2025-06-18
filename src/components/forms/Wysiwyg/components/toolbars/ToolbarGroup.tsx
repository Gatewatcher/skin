import type { ReactNode } from 'react';

import { Divider } from '@/skin/displays';
import { Stack } from '@/skin/layout';

export type ToolbarGroupProps = {
  children: ReactNode;
  withDivider?: boolean;
};

export const ToolbarGroup = ({
  children,
  withDivider = true,
}: ToolbarGroupProps) => {
  return (
    <Stack gap={1}>
      <Stack.Item alignSelf="center">{children}</Stack.Item>
      {withDivider && (
        <Stack.Item flexGrow={1} margin={{ x: 7 }}>
          <Divider direction="vertical" />
        </Stack.Item>
      )}
    </Stack>
  );
};
