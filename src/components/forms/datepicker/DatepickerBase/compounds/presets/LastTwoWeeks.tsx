import dayjs from 'dayjs';

import type { DatepickerPreset } from './Preset';
import Preset from './Preset';

export type DatepickerPresetLastTwoWeeks = Partial<
  Omit<DatepickerPreset, 'startDate' | 'endDate'>
>;

export const PresetLastTwoWeeks = ({
  children = 'Last two weeks',
}: DatepickerPresetLastTwoWeeks) => {
  const start = dayjs().subtract(14, 'd').toDate();
  const today = dayjs().toDate();

  return (
    <Preset endDate={today} startDate={start}>
      {children}
    </Preset>
  );
};

export default PresetLastTwoWeeks;
