import type { Schedule } from '@/skin/forms/inputs/CronScheduler/types';

export const scheduleToCronExpression = (schedule: Schedule): string => {
  const days = convertArrayOfNumbersToDayList(schedule?.days ?? []);

  switch (schedule.period) {
    case 'days':
      return `${schedule.minutes} ${schedule.hours} * * ${days}`;
    case 'hours':
      return `0 */${schedule.every} * * ${days}`;
    case 'minutes':
      return `*/${schedule.every} * * * ${days}`;
    default:
      return '';
  }
};

const convertArrayOfNumbersToDayList = (dayNumbers: number[]) => {
  if (dayNumbers.length > 0 && dayNumbers.length < 7) {
    return dayNumbers.join(',');
  }
  return '*';
};
