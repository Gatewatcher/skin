import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId, TestId } from '@gatewatcher/bistoury/utils-types';
import dayjs from 'dayjs';

import type { ExtraElementProps } from '../InputBase';
import InputBase from '../InputBase';
import type { InputBaseRenderProps } from '../InputBaseLabel';
import InputBaseLabel from '../InputBaseLabel';
import type { InputSharedProps } from '../types';
import { DEFAULT_WITH_CALENDAR } from './constants';

import styles from './styles.module.scss';

export const TEST_ID: TestId = 'input-date';

export type DateProps = DataTestId &
  Omit<InputSharedProps, 'max' | 'min'> &
  ExtraElementProps & {
    max?: string | Date;
    min?: string | Date;
    withCalendar?: boolean;
  };

const Date = ({
  'data-testid': testId = TEST_ID,
  max,
  min,
  preventAutocomplete,
  role = 'textbox',
  withCalendar = DEFAULT_WITH_CALENDAR,
  ...props
}: DateProps) => {
  const minDate = isDefined(min) ? dayjs(min).format('YYYY-MM-DD') : undefined;
  const maxDate = isDefined(max) ? dayjs(max).format('YYYY-MM-DD') : undefined;

  return (
    <InputBaseLabel
      data-testid={testId}
      {...props}
      max={maxDate}
      min={minDate}
      preventAutocomplete={preventAutocomplete}
    >
      {(renderProps: InputBaseRenderProps) => (
        <InputBase {...renderProps}>
          {({ className, ...inputProps }) => (
            <input
              className={classNames(
                className,
                !withCalendar && styles.withoutCalendar,
              )}
              type="date"
              {...inputProps}
              role={role}
            />
          )}
        </InputBase>
      )}
    </InputBaseLabel>
  );
};

export default Date;
