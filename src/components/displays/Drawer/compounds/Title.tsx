import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Title as SkinTitle } from '@/skin/typography';

export type DrawerTitleProps = DataTestId & {
  children: ReactNode;
};

const Title = ({
  children,
  'data-testid': testId = 'drawer-title',
}: DrawerTitleProps) => {
  return (
    <SkinTitle
      as="h1"
      data-testid={testId}
      whiteSpace="nowrap"
      overflowHidden
      textEllipsis
    >
      {children}
    </SkinTitle>
  );
};

export default Title;
