import { Grid } from '@/skin/layout';

import type { CalendarType } from '../../RangeDatepicker/type';
import { useDatepickerContext } from '../context';
import CalendarDays from './CalendarDays';

import styles from '../styles.module.scss';

export type CalendarProps = {
  type?: CalendarType;
};

const Calendar = ({ type }: CalendarProps) => {
  const { data } = useDatepickerContext();

  const { calendars } = data;
  const calendar = type === 'from' ? calendars[1] : calendars[0];
  const { days } = calendar;

  return (
    <Grid className={styles.Calendar} columns={7} gap={0} isContainer>
      <CalendarDays days={days} />
    </Grid>
  );
};

export default Calendar;
