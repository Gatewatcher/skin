import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Button } from '@/skin/actions';
import { useFloatingContext } from '@/skin/displays/floating/Floating/context';

import { useDatepickerContext } from '../../DatepickerBase/context';

export type DatepickerApplyProps = DataTestId & {
  children?: ReactNode;
  onApply: (dates: Date[]) => void;
  withCloseOnApply?: boolean;
};

const Apply = ({
  children = 'Apply',
  'data-testid': testId = 'datepicker-apply',
  onApply,
  withCloseOnApply = true,
}: DatepickerApplyProps) => {
  const { close } = useFloatingContext();
  const { selectedDates, closeOn, mode } = useDatepickerContext();

  closeOn.current = 'apply';

  const handleApply = () => {
    onApply(selectedDates);
    withCloseOnApply && close();
  };

  const minRequiredDates = mode === 'range' ? 2 : 1;

  return (
    <Button
      data-testid={testId}
      disabled={selectedDates.length !== minRequiredDates}
      onClick={handleApply}
    >
      {children}
    </Button>
  );
};

export default Apply;
