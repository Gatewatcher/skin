import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

export type DatepickerFooterProps = DataTestId & {
  children: ReactNode;
};

const Footer = ({
  'data-testid': testId = 'datepicker-footer',
  children,
}: DatepickerFooterProps) => {
  return (
    <Stack
      alignItems="center"
      data-testid={testId}
      justifyContent="space-between"
    >
      {children}
    </Stack>
  );
};

export default Footer;
