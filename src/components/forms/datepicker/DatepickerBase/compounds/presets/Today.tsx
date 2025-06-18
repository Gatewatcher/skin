import dayjs from 'dayjs';

import type { DatepickerPreset } from './Preset';
import Preset from './Preset';

export type DatepickerPresetToday = Partial<
  Omit<DatepickerPreset, 'startDate' | 'endDate'>
>;

export const PresetToday = ({ children = 'Today' }: DatepickerPresetToday) => {
  const today = dayjs().toDate();

  return <Preset startDate={today}>{children}</Preset>;
};

export default PresetToday;
