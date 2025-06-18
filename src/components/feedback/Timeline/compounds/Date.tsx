import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { InternalDateTime } from '@/skin/displays/date/DateTime';

import styles from '../styles.module.scss';

export type DateProps = DataTestId & {
  date: string | number | Date;
};

const Date = ({ 'data-testid': testId = 'timeline-date', date }: DateProps) => {
  return (
    <InternalDateTime
      className={styles.Date}
      data-testid={testId}
      date={date}
      format="lll"
      size="small"
      weight="medium"
    />
  );
};

export default Date;
