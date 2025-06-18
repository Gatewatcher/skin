import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Button } from '@/skin/actions';
import { useFloatingContext } from '@/skin/displays/floating/Floating/context';

export type DatepickerCloseProps = DataTestId & {
  children?: ReactNode;
};

const Close = ({
  children = 'Close',
  'data-testid': testId = 'datepicker-close',
}: DatepickerCloseProps) => {
  const { close } = useFloatingContext();

  return (
    <Button data-testid={testId} onClick={close} variant="outlined">
      {children}
    </Button>
  );
};

export default Close;
