import type { ReactNode } from 'react';

import { CircularLoader } from '@/skin/feedback';
import { Stack } from '@/skin/layout';

import PanelPlaceholder from '../compounds/PanelPlaceholder';

export type EmptyElementProps = {
  children: ReactNode;
};

export const EmptyElement = ({ children }: EmptyElementProps) => {
  return (
    <Stack>
      <PanelPlaceholder>{children}</PanelPlaceholder>
    </Stack>
  );
};

export const FirstLoader = () => {
  return (
    <Stack justifyContent="center" padding={{ y: 7 }}>
      <CircularLoader />
    </Stack>
  );
};
