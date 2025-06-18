import { useDatepickerContext } from '../DatepickerBase/context';
import type { CalendarType } from './type';

export const useSelectedDate = (type: CalendarType) => {
  const { selectedDates } = useDatepickerContext();

  if (!selectedDates.length) return '';

  if (type === 'from') {
    return selectedDates[0];
  }

  return selectedDates[1] || '';
};
