import dayjs from 'dayjs';

import type { DatepickerPreset } from './Preset';
import Preset from './Preset';

export type DatepickerPresetYesterday = Partial<
  Omit<DatepickerPreset, 'startDate' | 'endDate'>
>;

export const PresetYesterday = ({
  children = 'Yesterday',
}: DatepickerPresetYesterday) => {
  const yesdaterday = dayjs().subtract(1, 'd').toDate();

  return <Preset startDate={yesdaterday}>{children}</Preset>;
};

export default PresetYesterday;
