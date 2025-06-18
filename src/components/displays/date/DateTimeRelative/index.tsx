import type { DateTimeBaseProps, DateTimeProps } from '../DateTime';
import DateTime from '../DateTime';
import { DATE_LONG_FORMAT } from '../DateTime/constants';

export type DateTimeRelativeProps = Omit<
  DateTimeProps,
  Exclude<keyof DateTimeBaseProps, 'date'>
>;

const DateTimeRelative = ({
  'data-testid': testId = 'date-time-relative',
  date,
  ...rest
}: DateTimeRelativeProps) => {
  return (
    <DateTime
      data-testid={testId}
      date={date}
      mode="relative"
      tooltipFormat={DATE_LONG_FORMAT}
      {...rest}
    />
  );
};

export default DateTimeRelative;
