import { getThemeSpacing } from '@/utils';

export const calcOffset = (depth: number) => {
  return depth * Number(getThemeSpacing(7, 'px'));
};
