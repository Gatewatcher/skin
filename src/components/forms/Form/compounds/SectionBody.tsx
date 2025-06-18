import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type FormSectionBodyProps = DataTestId & {
  children: ReactNode;
};

const FormSectionBody = ({
  children,
  'data-testid': testId = 'form-section-body',
}: FormSectionBodyProps) => {
  return (
    <Stack data-testid={testId} direction="column" gap={7}>
      {children}
    </Stack>
  );
};

export default FormSectionBody;
