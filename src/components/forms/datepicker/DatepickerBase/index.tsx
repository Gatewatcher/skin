import { useDidMountEffect } from '@gatewatcher/bistoury/hooks';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { DPDatesMode } from '@rehookify/datepicker';
import { useDatePicker } from '@rehookify/datepicker';
import dayjs from 'dayjs';
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import { useMemo, useRef, useState } from 'react';

import type { DropdownProps } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import Floating from './components/Floating';
import { CONFIGS_BY_MODE, ON_CLOSE_CONTEXT_DEFAULT_VALUE } from './constants';
import type { DatepickerContextType, PresetsContextType } from './context';
import { DatepickerContext } from './context';

export type Values<TMode extends DPDatesMode = 'range'> = TMode extends 'single'
  ? Date
  : Date[];

export type DatepickerBaseInternalProps<TMode extends DPDatesMode = 'range'> = {
  mode: TMode;
  selectedDates?: Date[];
  onSelectedDatesChange?: Dispatch<SetStateAction<Date[]>>;
};

export type FloatingProps = Pick<
  DropdownProps,
  'placement' | 'offset' | 'onOpen' | 'onClose' | 'triggerOn'
> & {
  trigger: ReactElement;
};

export type DatepickerBaseProps<TMode extends DPDatesMode = 'range'> =
  DataTestId & {
    children: ReactNode;
    floating?: FloatingProps;
    onChange?: (values: Values<TMode>) => void;
    initialValue?: Values<TMode>;
    max?: Date;
    min?: Date;
  };

const DatepickerBase = <TMode extends DPDatesMode = 'range'>({
  children,
  'data-testid': testId = 'datepicker-base',
  floating,
  initialValue,
  max,
  min,
  mode,
  onChange,
  onSelectedDatesChange,
  selectedDates: selectedDatesProps,
}: DatepickerBaseProps<TMode> & DatepickerBaseInternalProps<TMode>) => {
  const [selectedDatesTemp, setSelectedDatesTemp] = useState<Date[]>(
    initialValue
      ? Array.isArray(initialValue)
        ? initialValue
        : [initialValue]
      : [],
  );

  const closeFloatingRef = useRef(() => {});

  const selectedDates = selectedDatesProps || selectedDatesTemp;
  const setSelectedDates = onSelectedDatesChange || setSelectedDatesTemp;

  const [offsetDate, setOffsetDate] = useState(dayjs().toDate());
  const [presets, setPresets] = useState<PresetsContextType>({});

  const { dates, ...config } = CONFIGS_BY_MODE[mode];

  const { trigger, ...floatingProps } = floating || {};

  const { data, propGetters } = useDatePicker({
    offsetDate,
    onDatesChange: setSelectedDates,
    onOffsetChange: setOffsetDate,
    selectedDates,
    locale: { day: 'numeric' },
    dates: { ...dates, minDate: min, maxDate: max },
    ...config,
  });

  const contextValue = useMemo<DatepickerContextType>(
    () => ({
      data,
      mode,
      offset: offsetDate,
      presets,
      propGetters,
      selectedDates,
      setOffset: setOffsetDate,
      setPresets,
      setSelectedDates,
      closeOn: ON_CLOSE_CONTEXT_DEFAULT_VALUE,
    }),
    [
      presets,
      data,
      mode,
      propGetters,
      selectedDates,
      setSelectedDates,
      offsetDate,
      setPresets,
      setOffsetDate,
    ],
  );

  useDidMountEffect(() => {
    const value = (
      mode === 'single' ? selectedDates[0] : selectedDates
    ) as Values<TMode>;
    onChange?.(value);
    if (contextValue?.closeOn?.current === 'change' && mode === 'single') {
      closeFloatingRef?.current?.();
    }
  }, [selectedDates, onChange]);

  const content = <Stack data-testid={testId}>{children}</Stack>;

  return (
    <DatepickerContext.Provider value={contextValue}>
      {trigger ? (
        <Floating
          content={({ close }) => {
            closeFloatingRef.current = close;
            return content;
          }}
          {...floatingProps}
        >
          {trigger}
        </Floating>
      ) : (
        content
      )}
    </DatepickerContext.Provider>
  );
};

export default DatepickerBase;
