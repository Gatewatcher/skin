import type { CronExpDescriptionOptions } from '../types';
import cronstrue from './cronstrue';

export const getCronExpDescription = (
  cronExp: string,
  options?: CronExpDescriptionOptions,
): { description?: string; isValid: boolean } => {
  if (!validateEveryDayOfTheWeekCronExp(cronExp)) {
    return { isValid: false };
  }

  try {
    return {
      description: cronstrue.toString(cronExp, options),
      isValid: true,
    };
  } catch (e) {
    return { isValid: false };
  }
};

const EVERY_DAYS_OF_WEEK_REGEXP = /^(?:\S +){4}\*\/(\d+)/;

const validateEveryDayOfTheWeekCronExp = (cronExp: string) => {
  const everyDayOfTheWeekMatch = cronExp.match(EVERY_DAYS_OF_WEEK_REGEXP);

  if (!everyDayOfTheWeekMatch) {
    return true;
  }

  const value = parseInt(everyDayOfTheWeekMatch[1], 10);

  return value >= 1 && value <= 7;
};

export const importCronSchedulerHelperLocale = (
  locale: 'fr' | 'en',
): Promise<Record<string, unknown>> =>
  // Vite requires the file extension for dynamic imports.
  import(`./cronstrue/locales/${locale}.ts`);
