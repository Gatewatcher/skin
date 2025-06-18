import type { DateTimeBaseProps, DateTimeProps } from '../DateTime';
import DateTime from '../DateTime';
import { DEFAULT_FORMAT, FORMATS_CORRESPONDANCES } from './constants';
import type { Format } from './types';

export type DateTimeAbsoluteProps = Omit<
  DateTimeProps,
  Exclude<keyof DateTimeBaseProps, 'date' | 'withEllipsis'>
> & {
  format?: Format;
};

const DateTimeAbsolute = ({
  'data-testid': testId = 'date-time-absolute',
  date,
  format = DEFAULT_FORMAT,
  ...rest
}: DateTimeAbsoluteProps) => {
  const formats = FORMATS_CORRESPONDANCES[format];

  return (
    <DateTime
      data-testid={testId}
      date={date}
      format={formats.text}
      mode="absolute"
      tooltipFormat={formats.tooltip}
      {...rest}
    />
  );
};

export default DateTimeAbsolute;
