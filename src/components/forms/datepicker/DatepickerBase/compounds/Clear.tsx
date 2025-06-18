import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Button } from '@/skin/actions';

import { useDatepickerContext } from '../../DatepickerBase/context';

export type DatepickerClearProps = DataTestId & {
  children?: ReactNode;
};

const Clear = ({
  children = 'Clear',
  'data-testid': testId = 'datepicker-clear',
}: DatepickerClearProps) => {
  const { setSelectedDates } = useDatepickerContext();

  const handleClear = () => {
    setSelectedDates([]);
  };

  return (
    <Button data-testid={testId} onClick={handleClear} variant="ghosted">
      {children}
    </Button>
  );
};

export default Clear;
