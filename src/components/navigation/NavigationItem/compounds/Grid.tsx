import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Grid as SkinGrid } from '@/skin/layout';

export type NavigationItemGridProps = DataTestId & {
  children: ReactNode | ReactNode[];
};

const Grid = ({
  children,
  'data-testid': testId = 'navigation-item-grid',
}: NavigationItemGridProps) => {
  const columnsCount = Array.isArray(children)
    ? Math.min(children.length, 3)
    : 1;

  return (
    <SkinGrid columns={columnsCount} data-testid={testId} isContainer>
      {children}
    </SkinGrid>
  );
};

export default Grid;
