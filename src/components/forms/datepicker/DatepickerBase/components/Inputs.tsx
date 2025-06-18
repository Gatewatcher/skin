import '@gatewatcher/bistoury/utils-date';
import { insertIf } from '@gatewatcher/bistoury/utils-lang';
import dayjs from 'dayjs';
import type { ChangeEvent } from 'react';

import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';
import { InternalText } from '@/skin/typography/Text';

import type { CalendarType } from '../../RangeDatepicker/type';
import { useDatepickerContext } from '../context';
import HourSelect from './Selects/HourSelect';
import MinuteSelect from './Selects/MinuteSelect';
import SecondSelect from './Selects/SecondSelect';

import styles from '../styles.module.scss';

export type InputsProps = {
  label: string;
  type: CalendarType;
};

const Inputs = ({ label, type }: InputsProps) => {
  const { selectedDates, setSelectedDates } = useDatepickerContext();

  const selectedDate = type === 'from' ? selectedDates[0] : selectedDates[1];

  const inputDateValue = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : '';

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newDate = dayjs(value);

    if (newDate.isValid()) {
      setSelectedDates(prev => {
        return type === 'from'
          ? [newDate.toDate(), ...insertIf(!!prev[1], prev[1])]
          : [...insertIf(!!prev[0], prev[0]), newDate.toDate()];
      });
    }
  };

  return (
    <Stack className={styles.Inputs} gap={7} margin={{ bottom: 4 }}>
      <Stack alignItems="center" gap={3}>
        <InternalText style={{ width: '5ch' }} weight="medium">
          {label}
        </InternalText>
        <Input.Date
          onChange={handleInputChange}
          value={inputDateValue}
          withCalendar={false}
        />
      </Stack>

      <Stack alignItems="center" gap={2}>
        <HourSelect type={type} />
        <Text>:</Text>
        <MinuteSelect type={type} />
        <Text>:</Text>
        <SecondSelect type={type} />
      </Stack>
    </Stack>
  );
};

export default Inputs;
