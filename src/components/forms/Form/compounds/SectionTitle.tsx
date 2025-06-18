import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Title } from '@/skin/typography';

export type FormSectionTitleProps = DataTestId & {
  children: ReactNode;
};

const FormSectionTitle = ({
  children,
  'data-testid': testId = 'form-section-title',
}: FormSectionTitleProps) => {
  return (
    <Title as="h3" data-testid={testId}>
      {children}
    </Title>
  );
};

export default FormSectionTitle;
