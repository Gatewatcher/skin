import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Title as SkinTitle } from '@/skin/typography';

export type PlaceholderTitleProps = DataTestId & {
  children: ReactNode;
};

export const Title = ({
  children,
  'data-testid': testId = 'placeholder-title',
}: PlaceholderTitleProps) => {
  return (
    <SkinTitle as="h4" data-testid={testId}>
      {children}
    </SkinTitle>
  );
};
