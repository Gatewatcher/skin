import dayjs from 'dayjs';

import type { DatepickerPreset } from './Preset';
import Preset from './Preset';

export type DatepickerPresetLastTwoDays = Partial<
  Omit<DatepickerPreset, 'startDate' | 'endDate'>
>;

export const PresetLastTwoDays = ({
  children = 'Last two days',
}: DatepickerPresetLastTwoDays) => {
  const yesterday = dayjs().subtract(1, 'd').toDate();
  const today = dayjs().toDate();

  return (
    <Preset endDate={today} startDate={yesterday}>
      {children}
    </Preset>
  );
};

export default PresetLastTwoDays;
