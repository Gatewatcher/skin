import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

export type RouteContainerBodyProps = DataTestId & {
  children: ReactNode;
};

const Body = ({
  'data-testid': testId = 'route-container-body',
  children,
}: RouteContainerBodyProps) => {
  return <div data-testid={testId}>{children}</div>;
};

export default Body;
