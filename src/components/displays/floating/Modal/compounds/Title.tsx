import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Title as SkinTitle } from '@/skin/typography';

export type ModalTitleProps = DataTestId & {
  children: ReactNode;
};

const Title = ({
  children,
  'data-testid': testId = 'modal-title',
}: ModalTitleProps) => {
  return (
    <SkinTitle as="h3" data-testid={testId}>
      {children}
    </SkinTitle>
  );
};

export default Title;
