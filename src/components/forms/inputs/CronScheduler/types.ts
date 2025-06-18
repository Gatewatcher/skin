import type { Options } from './lib/cronstrue';

export type Period = 'minutes' | 'hours' | 'days';

export type DaysSchedule = {
  period?: 'days';
  hours?: number;
  minutes?: number;
  days?: number[];
};

export type EverySchedule = {
  period?: 'hours' | 'minutes';
  every?: number;
  days?: number[];
};

export type Schedule = DaysSchedule | EverySchedule;

export type CronExpDescriptionOptions = Pick<Options, 'locale' | 'verbose'>;

export type WeekDays = [number, string][];
