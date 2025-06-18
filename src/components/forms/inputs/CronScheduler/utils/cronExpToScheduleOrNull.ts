import type { Schedule } from '../types';

const DAYS_REGEXP =
  /^(?<minutes>\d{1,2}) (?<hours>\d{1,2}) \* \* (?<days>\*|\d(?:,\d)*)$/;

const HOURS_REGEXP = /^0 \*\/(?<every>\d{1,2}) \* \* (?<days>\*|\d(?:,\d)*)$/;

const MINUTES_REGEXP =
  /^\*\/(?<every>\d{1,2}) \* \* \* (?<days>\*|\d(?:,\d)*)$/;

const EVERY_MINUTE_REGEXP = /^\* \* \* \* (?<days>\*|\d(?:,\d)*)$/;

export const cronExpToScheduleOrNull = (cronExp: string): Schedule | null => {
  const daysRegexpMatch = cronExp.match(DAYS_REGEXP);
  if (daysRegexpMatch?.groups) {
    return daysCronExpGroupsToSchedule(daysRegexpMatch.groups);
  }

  const hoursRegexpMatch = cronExp.match(HOURS_REGEXP);
  if (hoursRegexpMatch?.groups) {
    return hoursCronExpGroupsToSchedule(hoursRegexpMatch.groups);
  }

  const minutesRegexpMatch = cronExp.match(MINUTES_REGEXP);
  if (minutesRegexpMatch?.groups) {
    return cronExpToMinutesSchedule(minutesRegexpMatch.groups);
  }

  const everyMinuteRegexpMatch = cronExp.match(EVERY_MINUTE_REGEXP);
  if (everyMinuteRegexpMatch?.groups) {
    return cronExpToEveryMinuteSchedule(everyMinuteRegexpMatch.groups);
  }

  return null;
};

const daysCronExpGroupsToSchedule = (
  groups: Record<string, string>,
): Schedule => {
  return {
    period: 'days',
    hours: parseInt(groups.hours, 10),
    minutes: parseInt(groups.minutes, 10),
    days: convertDayListToArrayOfNumbers(groups.days),
  };
};

const hoursCronExpGroupsToSchedule = (
  groups: Record<string, string>,
): Schedule => {
  return {
    period: 'hours',
    every: parseInt(groups.every, 10),
    days: convertDayListToArrayOfNumbers(groups.days),
  };
};

const cronExpToMinutesSchedule = (groups: Record<string, string>): Schedule => {
  return {
    period: 'minutes',
    every: parseInt(groups.every, 10),
    days: convertDayListToArrayOfNumbers(groups.days),
  };
};

const cronExpToEveryMinuteSchedule = (
  groups: Record<string, string>,
): Schedule => {
  return {
    period: 'minutes',
    every: 1,
    days: convertDayListToArrayOfNumbers(groups.days),
  };
};

const convertDayListToArrayOfNumbers = (days: string): Schedule['days'] => {
  if (days === '*') return;
  return days.split(',').map(n => parseInt(n, 10));
};
