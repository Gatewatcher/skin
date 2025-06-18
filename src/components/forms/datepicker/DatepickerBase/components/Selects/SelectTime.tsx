import { formatAbsoluteDate } from '@gatewatcher/bistoury/utils-date';
import { insertIf } from '@gatewatcher/bistoury/utils-lang';
import type { UnitType } from 'dayjs';
import dayjs from 'dayjs';

import type { InputSelectProps } from '@/skin/forms';
import { Input } from '@/skin/forms';
import type { NewSingleValue } from '@/skin/forms/inputs/select/SelectBase/types';

import { useSelectedDate } from '../../../RangeDatepicker/hooks';
import type { CalendarType } from '../../../RangeDatepicker/type';
import { FORMATS_BY_UNIT } from '../../constants';
import { useDatepickerContext } from '../../context';

import styles from '../../styles.module.scss';

export type SelectTimeProps = InputSelectProps<number> & {
  type: CalendarType;
};

export type SelectTimeInternalProps = {
  unit: UnitType;
};

const SelectTime = ({
  type,
  unit,
  ...rest
}: SelectTimeProps & SelectTimeInternalProps) => {
  const { setSelectedDates } = useDatepickerContext();

  const date = useSelectedDate(type);

  const handleChange = (newValue: NewSingleValue<number>) => {
    const newDate = dayjs(date).set(unit, newValue?.value ?? 0);
    setSelectedDates(prev => {
      return type === 'from'
        ? [newDate.toDate(), ...insertIf(!!prev[1], prev[1])]
        : [...insertIf(!!prev[0], prev[0]), newDate.toDate()];
    });
  };

  return (
    <Input.Select
      {...rest}
      className={styles.TimeSelect}
      disabled={!date}
      isClearable={false}
      onChange={handleChange}
      value={Number(formatAbsoluteDate(date, FORMATS_BY_UNIT[unit]))}
    />
  );
};

export default SelectTime;
