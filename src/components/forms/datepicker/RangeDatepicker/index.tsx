import { usePrevious } from '@gatewatcher/bistoury/hooks';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';

import type { DatepickerBaseProps } from '../DatepickerBase';
import DatepickerBase from '../DatepickerBase';
import Actions from '../DatepickerBase/compounds/Actions';
import Apply from '../DatepickerBase/compounds/Apply';
import Clear from '../DatepickerBase/compounds/Clear';
import Close from '../DatepickerBase/compounds/Close';
import Footer from '../DatepickerBase/compounds/Footer';
import Main from '../DatepickerBase/compounds/Main';
import Presets from '../DatepickerBase/compounds/Presets';
import PresetCustomRange from '../DatepickerBase/compounds/presets/CustomRange';
import PresetLastTwoDays from '../DatepickerBase/compounds/presets/LastTwoDays';
import PresetLastTwoWeeks from '../DatepickerBase/compounds/presets/LastTwoWeeks';
import Preset from '../DatepickerBase/compounds/presets/Preset';
import PresetToday from '../DatepickerBase/compounds/presets/Today';
import PresetYesterday from '../DatepickerBase/compounds/presets/Yesterday';
import Calendars from './compounds/Calendars';
import { DEFAULT_SELECTED_DATES } from './constants';

export type RangeDatepickerProps = DatepickerBaseProps<'range'>;

const RangeDatepicker = ({
  'data-testid': testId = 'range-datepicker',
  initialValue = DEFAULT_SELECTED_DATES,
  ...rest
}: RangeDatepickerProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>(initialValue);
  const previousDates = usePrevious(selectedDates);

  useEffect(() => {
    if (selectedDates.length !== 2) return;

    const from = dayjs(selectedDates[0]);
    const to = dayjs(selectedDates[1]);

    if (from.isAfter(to)) {
      setSelectedDates([to.toDate(), from.toDate()]);
    }
  }, [selectedDates]);

  useEffect(() => {
    if (previousDates?.length === 1 && selectedDates.length === 2) {
      setSelectedDates(prev => {
        const endDate = dayjs(prev[1]).endOf('d').toDate();
        return [prev[0], endDate];
      });
    }
  }, [selectedDates, previousDates]);

  return (
    <DatepickerBase
      data-testid={testId}
      initialValue={initialValue}
      mode="range"
      onSelectedDatesChange={setSelectedDates}
      selectedDates={selectedDates}
      {...rest}
    />
  );
};

RangeDatepicker.Actions = memo(Actions);
RangeDatepicker.Apply = memo(Apply);
RangeDatepicker.Calendars = memo(Calendars);
RangeDatepicker.Clear = memo(Clear);
RangeDatepicker.Close = memo(Close);
RangeDatepicker.Footer = memo(Footer);
RangeDatepicker.Main = memo(Main);
RangeDatepicker.Preset = memo(Preset);
RangeDatepicker.PresetCustomRange = memo(PresetCustomRange);
RangeDatepicker.PresetLastTwoDays = memo(PresetLastTwoDays);
RangeDatepicker.PresetLastTwoWeeks = memo(PresetLastTwoWeeks);
RangeDatepicker.PresetToday = memo(PresetToday);
RangeDatepicker.PresetYesterday = memo(PresetYesterday);
RangeDatepicker.Presets = memo(Presets);

export default RangeDatepicker;
