import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Title as SkinTitle } from '@/skin/typography';

export type PopoverTitleProps = DataTestId & {
  children: ReactNode;
};

export const Title = ({
  children,
  'data-testid': testId = 'popover-title',
}: PopoverTitleProps) => {
  return (
    <SkinTitle as="h3" data-testid={testId}>
      {children}
    </SkinTitle>
  );
};

export default Title;
