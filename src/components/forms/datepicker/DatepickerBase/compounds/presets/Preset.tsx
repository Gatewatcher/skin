import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';

import { Button } from '@/skin/actions';

import { useDatepickerContext } from '../../../DatepickerBase/context';

import styles from '../../styles.module.scss';

export type DatepickerPreset = DataTestId & {
  children: ReactNode;
  endDate?: Date;
  startDate: Date;
};

export const Preset = ({
  children,
  'data-testid': testId = 'datepicker-preset',
  startDate,
  endDate = startDate,
}: DatepickerPreset) => {
  const { selectedDates, setSelectedDates, setOffset } = useDatepickerContext();

  const handleClick = () => {
    setSelectedDates([
      dayjs(startDate).startOf('day').toDate(),
      dayjs(endDate).endOf('day').toDate(),
    ]);

    setOffset(endDate);
  };

  const isActive =
    selectedDates.length > 1 &&
    dayjs(selectedDates[0]).isSame(dayjs(startDate), 'day') &&
    dayjs(selectedDates[1]).isSame(dayjs(endDate), 'day');

  return (
    <Button
      className={classNames(isActive && styles.PresetActive)}
      data-testid={testId}
      onClick={handleClick}
      variant="bared"
    >
      {children}
    </Button>
  );
};

export default Preset;
