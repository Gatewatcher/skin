import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import Body from './compounds/Body';
import Header from './compounds/Header';
import Subheader from './compounds/Subheader';

export type RouteContainerProps = DataTestId & {
  children: ReactNode;
};

const RouteContainer = ({
  'data-testid': testId = 'route-container',
  children,
}: RouteContainerProps) => {
  return (
    <Stack data-testid={testId} direction="column">
      {children}
    </Stack>
  );
};

RouteContainer.Body = Body;
RouteContainer.Header = Header;
RouteContainer.Subheader = Subheader;
export default RouteContainer;
