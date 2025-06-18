import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DPDay } from '@rehookify/datepicker';
import dayjs from 'dayjs';

import { Button } from '@/skin/actions';
import { Grid } from '@/skin/layout';
import { InternalText } from '@/skin/typography/Text';

import { useDatepickerContext } from '../context';

import styles from '../styles.module.scss';

export type DatepickerCalendarDaysProps = {
  days: DPDay[];
};

const CalendarDays = ({ days }: DatepickerCalendarDaysProps) => {
  const { propGetters, data } = useDatepickerContext();
  const { weekDays } = data;
  const { dayButton } = propGetters;
  const today = dayjs().format('YYYY-MMMM-DD');

  return (
    <>
      {weekDays.map((day, index) => (
        <Grid
          key={day}
          alignItems="center"
          justifyContent="center"
          isContainer
          isItem
        >
          <InternalText className={styles.weekDay}>
            {dayjs()
              .day(index + 1)
              .format('dd')}
          </InternalText>
        </Grid>
      ))}
      {days.map(day => (
        <Button
          key={day.$date.toString()}
          className={classNames(styles.Day, {
            [styles.DayNotInMonth]: !day.inCurrentMonth,
            [styles.DayDisabled]: day.disabled && day.inCurrentMonth,
            [styles.DayRangeBounds]:
              (day.selected ||
                day.range === 'range-start range-end' ||
                day.range === 'will-be-range-end' ||
                day.range === 'will-be-range-start') &&
              day.inCurrentMonth,
            [styles.DayInRange]:
              (day.range === 'in-range' || day.range === 'will-be-in-range') &&
              day.inCurrentMonth,
            [styles.DayRangeStart]:
              (day.range === 'range-start' ||
                day.range === 'will-be-range-start') &&
              day.inCurrentMonth,
            [styles.DayRangeEnd]:
              (day.range === 'range-end' ||
                day.range === 'will-be-range-end') &&
              day.inCurrentMonth,
            [styles.DayToday]:
              dayjs(day.$date).format('YYYY-MMMM-DD') === today,
          })}
          data-testid={dayjs(day.$date).format('DD-MM')}
          variant="bared"
          {...dayButton(day)}
        >
          {day.inCurrentMonth ? day.day : <></>}
        </Button>
      ))}
    </>
  );
};

export default CalendarDays;
