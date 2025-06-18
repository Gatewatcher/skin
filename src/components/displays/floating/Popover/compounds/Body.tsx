import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

export type PopoverBodyProps = DataTestId & {
  children: ReactNode;
};

const Body = ({
  children,
  'data-testid': testId = 'popover-body',
}: PopoverBodyProps) => {
  return <div data-testid={testId}>{children}</div>;
};

export default Body;
