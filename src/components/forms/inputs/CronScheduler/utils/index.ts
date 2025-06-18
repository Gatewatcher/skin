import { isNumber } from '@gatewatcher/bistoury/utils-lang';

import type { DaysSchedule, EverySchedule, Schedule } from '../types';

export const isDaySchedule = (schedule: Schedule): schedule is DaysSchedule => {
  return schedule.period === 'days';
};

export const isEverySchedule = (
  schedule: Schedule,
): schedule is EverySchedule => {
  return schedule.period === 'hours' || schedule.period === 'minutes';
};

export const isScheduleValid = (
  schedule: Schedule,
): schedule is Required<Schedule> => {
  switch (schedule.period) {
    case 'days':
      return (
        isNumber(schedule.hours) &&
        !isNaN(schedule.hours) &&
        isNumber(schedule.minutes) &&
        !isNaN(schedule.minutes)
      );
    case 'hours':
    case 'minutes':
      return isNumber(schedule.every) && !isNaN(schedule.every);
    default:
      return false;
  }
};

export { cronExpToScheduleOrNull } from './cronExpToScheduleOrNull';
export { scheduleToCronExpression } from './scheduleToCronExpression';
