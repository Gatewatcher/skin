import type {
  DateInput,
  Mode as DateMode,
} from '@gatewatcher/bistoury/utils-date';
import {
  formatAbsoluteDate,
  formatRelativeDate,
} from '@gatewatcher/bistoury/utils-date';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import type { NeutralTextProps, TextProps } from '@/skin/typography';
import { NeutralText } from '@/skin/typography';
import { InternalText } from '@/skin/typography/Text';

import Tooltip from '../../floating/Tooltip';
import { DEFAULT_DATE_MODE, DEFAULT_LOCALE } from './constants';

import styles from './styles.module.scss';

export type DateTimeBaseProps = {
  date: DateInput;
  format?: string;
  locale?: string;
  mode?: DateMode;
  tooltipFormat?: string;
  withEllipsis?: boolean;
};

export type DateTimeProps = DataTestId &
  Omit<TextProps, 'children' | 'currentColor'> &
  Pick<NeutralTextProps, 'variant'> &
  DateTimeBaseProps;

export type InternalDateTimeProps = {
  className?: string;
};

export const InternalDateTime = ({
  className,
  'data-testid': testId = 'date-time',
  date,
  format,
  locale = DEFAULT_LOCALE,
  mode = DEFAULT_DATE_MODE,
  tooltipFormat,
  variant,
  withEllipsis = false,
  ...textProps
}: DateTimeProps & InternalDateTimeProps) => {
  const isAbsolute = mode === 'absolute';
  const absoluteDate = formatAbsoluteDate(date, format, { locale });
  const relativeDate = formatRelativeDate(date, { locale });
  const formattedDate = isAbsolute ? absoluteDate : relativeDate;

  if (tooltipFormat) {
    const content = formatAbsoluteDate(date, tooltipFormat);

    return (
      <Tooltip
        content={content}
        data-testid={testId}
        triggerClassName={withEllipsis ? styles.fullWidth : styles.DateTime}
        triggerOn="hover"
        withStopPropagation={false}
      >
        {variant ? (
          <NeutralText
            overflowHidden={withEllipsis}
            textEllipsis={withEllipsis}
            variant={variant}
            {...(withEllipsis && { whiteSpace: 'nowrap' })}
            {...textProps}
          >
            {formattedDate}
          </NeutralText>
        ) : (
          <InternalText
            className={className}
            overflowHidden={withEllipsis}
            textEllipsis={withEllipsis}
            {...(withEllipsis && { whiteSpace: 'nowrap' })}
            {...textProps}
          >
            {formattedDate}
          </InternalText>
        )}
      </Tooltip>
    );
  }

  return variant ? (
    <NeutralText
      overflowHidden={withEllipsis}
      textEllipsis={withEllipsis}
      variant={variant}
      {...(withEllipsis && { whiteSpace: 'nowrap' })}
      {...textProps}
    >
      {formattedDate}
    </NeutralText>
  ) : (
    <InternalText
      className={className}
      data-testid={testId}
      overflowHidden={withEllipsis}
      textEllipsis={withEllipsis}
      {...(withEllipsis && { whiteSpace: 'nowrap' })}
      {...textProps}
    >
      {formattedDate}
    </InternalText>
  );
};

const DateTime = (props: DateTimeProps) => <InternalDateTime {...props} />;

export default DateTime;
