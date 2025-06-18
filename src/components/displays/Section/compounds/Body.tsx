import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

export type SectionBodyProps = DataTestId & {
  children: ReactNode;
};

const Body = ({
  children,
  'data-testid': testId = 'section-body',
}: SectionBodyProps) => {
  return <div data-testid={testId}>{children}</div>;
};

export default Body;
