import type { Mark } from './types';

export const isMark = (sliderMark: unknown): sliderMark is Mark => {
  return (sliderMark as Mark).label !== undefined;
};
